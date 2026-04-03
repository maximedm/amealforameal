# Stage 1: Install PHP dependencies
FROM php:8.4-cli-alpine AS composer-build

RUN apk add --no-cache libpq-dev icu-dev \
    && docker-php-ext-install pdo_pgsql intl opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
COPY . .
RUN composer dump-autoload --optimize

# Stage 2: Build frontend assets
FROM composer-build AS node-build

RUN apk add --no-cache nodejs npm
RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 3: Production image
FROM php:8.4-fpm-alpine AS production

RUN apk add --no-cache \
        nginx supervisor curl \
        libpq-dev icu-dev postgresql-client \
    && docker-php-ext-install pdo_pgsql intl opcache bcmath pcntl

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/php.ini "$PHP_INI_DIR/conf.d/99-app.ini"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf

WORKDIR /app

COPY --from=composer-build /app/vendor vendor
COPY --from=node-build /app/public/build public/build
COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

ENV CONTAINER_ROLE=app
EXPOSE 3000

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/up || exit 1

ENTRYPOINT ["/entrypoint.sh"]
