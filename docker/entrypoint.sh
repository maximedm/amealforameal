#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USERNAME" -q; do
    sleep 1
done
echo "PostgreSQL is ready."

cd /app

case "${CONTAINER_ROLE:-app}" in
  app)
    echo "Running as: app"
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan migrate --force --no-interaction
    php artisan storage:link --no-interaction 2>/dev/null || true
    exec /usr/bin/supervisord -c /etc/supervisord.conf
    ;;
  *)
    echo "Unknown CONTAINER_ROLE: ${CONTAINER_ROLE}"
    exit 1
    ;;
esac
