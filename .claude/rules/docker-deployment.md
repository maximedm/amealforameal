# Docker Deployment on Dokploy

Reference for this project's Docker stack. This project runs the **full stack with Octane (FrankenPHP)**.

For the generic guide (PHP-FPM minimal, add services incrementally), see `.docs/dokploy-deployment.md`.

## This Project's Architecture

6 services sharing a single Docker image, differentiated by `CONTAINER_ROLE`:

```
Traefik (Dokploy) -> app:3000 (Nginx -> Octane:8000 / Reverb:8080 / static /build/)
                                  |
        +-------+--------+--------+--------+--------+
        |  db   | redis  | worker | sched  | reverb |
        +-------+--------+--------+--------+--------+
```

| Service | Role | Port | Network |
|---------|------|------|---------|
| `app` | Nginx + FrankenPHP/Octane + SSR (Supervisor) | 3000 exposed | internal + dokploy-network |
| `worker` | `php artisan queue:work` (scalable) | none | internal |
| `scheduler` | `php artisan schedule:work` | none | internal |
| `reverb` | `php artisan reverb:start` (WebSocket) | 8080 internal | internal |
| `maruva-emails-db` | PostgreSQL 17 | 5432 internal | internal |
| `redis` | Redis 7 (queue + cache) | 6379 internal | internal |

## File Structure

```
project-root/
  Dockerfile                    # 3-stage build: composer -> node -> FrankenPHP production
  docker-compose.yml            # 6 services, YAML anchors, ${VAR:-default} env interpolation
  .dockerignore                 # Excludes dev/build artifacts
  .env.example                  # Local dev template
  .env.maruva                   # Dokploy production template (copy to Dokploy UI)
  docker/
    entrypoint.sh               # Role-aware dispatcher (CONTAINER_ROLE)
    supervisord.conf            # App role: Nginx + Octane + SSR (3 programs)
    nginx.conf                  # Reverse proxy: static, Octane, WebSocket
    php.ini                     # OPcache, upload limits, memory
```

## Dockerfile Spec

3-stage build on Alpine. Single image used by all 6 services.

**Stage 1: composer-build** (`php:8.4-cli-alpine`)
- PHP extensions: `pdo_pgsql`, `intl`, `opcache`
- `composer install --no-dev --no-scripts --no-autoloader --prefer-dist`
- `composer dump-autoload --optimize`

**Stage 2: node-build** (FROM composer-build)
- `npm install` (not `npm ci` — fails in Alpine Docker builds)
- `VITE_REVERB_*` build args (APP_KEY, PORT=443, SCHEME=https). HOST is omitted — echo.ts falls back to `window.location.hostname`
- `npm run build && npm run build -- --ssr`

**Stage 3: production** (`dunglas/frankenphp:php8.4-alpine`)
- APK: `nginx`, `supervisor`, `nodejs`, `npm`, `curl`, `libpq-dev`, `icu-dev`, `postgresql-client`
- PHP extensions via `install-php-extensions`: `pdo_pgsql`, `intl`, `opcache`, `bcmath`, `pcntl`, `redis`
- Copy from stages: `vendor`, `public/build`, `bootstrap/ssr`, `node_modules`
- SSR REQUIRES `node_modules` (dynamic imports resolve from it at runtime)
- `ENV CONTAINER_ROLE=app`, `EXPOSE 3000`
- `HEALTHCHECK` using `curl -f http://localhost:3000/up`
- `ENTRYPOINT ["/entrypoint.sh"]`

## docker-compose.yml Spec

YAML anchors (`x-app-base` / `&app-base` / `&app-env`) share build and env across all services. Dokploy injects env vars via its UI panel — compose maps them with `${VAR:-default}`.

All env vars from `.env.maruva` must appear in the `&app-env` block with appropriate defaults.

Only `app` joins `dokploy-network`. Everything else is `internal` only. Never use `ports:` — only `expose:`.

DB service uses `maruva-emails-db` (not `postgres`) to avoid DNS conflict with Dokploy's own postgres.

Scale workers with `docker compose up -d --scale worker=N` (not `deploy.replicas` — that's Swarm-only).

## docker/entrypoint.sh Spec

Role-aware dispatcher. All roles wait for PostgreSQL via `pg_isready`.

```
CONTAINER_ROLE=app       -> config:cache, route:cache, view:cache, migrate --force, storage:link, then exec supervisord
CONTAINER_ROLE=worker    -> exec queue:work --sleep=3 --tries=3 --max-time=3600 --max-jobs=1000
CONTAINER_ROLE=scheduler -> exec schedule:work
CONTAINER_ROLE=reverb    -> exec reverb:start --host=0.0.0.0 --port=8080
```

Only `app` runs migrations and caching. Uses `exec` for proper signal handling.

## docker/supervisord.conf Spec

3 programs (app role only):

1. **nginx** — `nginx -g "daemon off;"` (priority 10)
2. **octane** — `php artisan octane:frankenphp --host=0.0.0.0 --port=8000 --max-requests=500` (priority 20)
3. **ssr** — `php artisan inertia:start-ssr` (priority 30)

All with `autorestart=true`, logs to `/dev/stdout` and `/dev/stderr`.

## docker/nginx.conf Spec

Listens on port 3000. Three location blocks:

1. `/build/` — Static assets served directly. 1-year cache, `Cache-Control: public, immutable`.
2. `/app` — WebSocket proxy to `reverb:8080` (Docker DNS). Must include `Upgrade` and `Connection "upgrade"` headers.
3. `/` — Proxy to Octane at `127.0.0.1:8000`. Buffer sizes: `proxy_buffer_size 128k`, `proxy_buffers 4 256k`, `proxy_busy_buffers_size 256k` (required for Inertia SSR headers or you get 502).

Must preserve `X-Forwarded-Proto` from Traefik to prevent mixed content.

## docker/php.ini Spec

```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
upload_max_filesize=50M
post_max_size=50M
memory_limit=256M
max_execution_time=60
```

## .dockerignore Spec

Exclude: `.git`, `.github`, `.claude`, `.docs`, `.env`, `.env.local`, `node_modules`, `vendor`, `public/build`, `public/hot`, `bootstrap/ssr`, `storage/logs/*`, `storage/framework/cache/*`, `storage/framework/sessions/*`, `storage/framework/views/*`, `tests`, `phpunit.xml`, `.editorconfig`, `.prettierrc`, `.npmrc`, `eslint.config.js`

## Reverb Host Split (CRITICAL)

- `REVERB_HOST` / `REVERB_PORT` / `REVERB_SCHEME` = **external** (your domain, 443, https) — for `config/reverb.php` client auth
- `REVERB_INTERNAL_HOST` / `REVERB_INTERNAL_PORT` / `REVERB_INTERNAL_SCHEME` = **internal** (Docker service `reverb`, 8080, http) — for `config/broadcasting.php` Guzzle calls

In `config/broadcasting.php`, the reverb connection options must be:
```php
'host' => env('REVERB_INTERNAL_HOST', env('REVERB_HOST')),
'port' => env('REVERB_INTERNAL_PORT', env('REVERB_PORT', 443)),
'scheme' => env('REVERB_INTERNAL_SCHEME', env('REVERB_SCHEME', 'https')),
'useTLS' => env('REVERB_INTERNAL_SCHEME', env('REVERB_SCHEME', 'https')) === 'https',
```

Locally, `REVERB_INTERNAL_*` not set — falls back to `REVERB_*`.

## Laravel Config Required

- `bootstrap/app.php` — MUST have `$middleware->trustProxies(at: '*')` or URLs generate as `http://` behind Traefik
- `config/broadcasting.php` — MUST use `REVERB_INTERNAL_HOST` fallback (see above)

## Environment Variables

Two env templates:
- `.env.example` — Local dev defaults (Herd). Copy to `.env` locally.
- `.env.maruva` — Dokploy production values. Copy to Dokploy UI panel. Fill in: `APP_KEY`, `APP_URL`, `DB_PASSWORD`, `REVERB_HOST` (your domain), OAuth credentials.

## Key Gotchas

1. **Trusted Proxies** — REQUIRED in `bootstrap/app.php` or all URLs are `http://`.
2. **DB service naming** — `maruva-emails-db`, never `postgres` (Dokploy DNS conflict).
3. **POSTGRES_PASSWORD persistence** — Only read on first volume init. `docker compose -p <name> down -v` to reset.
4. **SSR needs node_modules** — Copy from build stage into production image.
5. **Vite CSS entry** — Tailwind v4 Blade: `@vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])`
6. **Nginx buffer sizes** — Inertia SSR headers cause 502 with default buffers. Must set `proxy_buffer_size 128k`.
7. **Only app runs migrations** — Worker/scheduler/reverb depend on app being healthy first.
8. **npm install not npm ci** — `npm ci` fails in Alpine Docker builds.
9. **REVERB_HOST is external** — Set to your domain, not `reverb`. Internal communication uses `REVERB_INTERNAL_HOST`.
10. **Octane singleton gotchas** — Use `scoped()` not `singleton()` for request-specific bindings. Never append to static arrays. `--max-requests=500` recycles workers.

## Full Documentation

See `.docs/dokploy-deployment.md` for the generic deployment guide (PHP-FPM base, add Octane later) with CI/CD, troubleshooting, and recommendations.
