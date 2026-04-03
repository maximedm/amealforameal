# Docker Service Addons

When asked to add Redis, workers, scheduler, Reverb, SSR, or Octane to the Docker stack, follow the relevant section below. Each addon builds on the minimal setup from `docker-deployment.md`.

All addons use the same Docker image with `CONTAINER_ROLE` differentiation. See `.docs/dokploy-deployment.md` for full documentation.

---

## Adding Redis

**When**: Project needs async queues, Redis cache, or Reverb.

### docker-compose.yml — add service + update app

```yaml
redis:
  image: redis:7-alpine
  command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
  volumes: [redis-data:/data]
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 5s
    retries: 3
  networks: [internal]
  restart: unless-stopped
```

Add `redis-data:` to the `volumes:` block.

Add to the `app` service `depends_on`:
```yaml
redis: { condition: service_healthy }
```

### Shared env block (`&app-env`) — add:

```yaml
REDIS_HOST: "${REDIS_HOST:-redis}"
REDIS_PORT: "${REDIS_PORT:-6379}"
REDIS_PASSWORD: "${REDIS_PASSWORD:-}"
```

### Update env values

- `CACHE_STORE`: change default from `database` to `redis`
- `QUEUE_CONNECTION`: change default from `sync` to `redis` (if also adding workers)

### .env.example — add:

```env
REDIS_HOST=127.0.0.1        # Production: redis (compose service)
REDIS_PORT=6379
REDIS_PASSWORD=null
```

### No Laravel config changes needed

`config/cache.php` and `config/queue.php` already have Redis connections. The env var switch handles it.

---

## Adding Workers

**When**: Project dispatches background jobs. **Requires**: Redis addon.

### docker-compose.yml — add service

```yaml
worker:
  <<: *app-base
  environment:
    <<: *app-env
    CONTAINER_ROLE: worker
  depends_on:
    app: { condition: service_healthy }
  networks: [internal]
```

### docker/entrypoint.sh — add role

```bash
worker)
  echo "Running as: worker"
  exec php artisan queue:work \
    --sleep=3 \
    --tries=3 \
    --max-time=3600 \
    --max-jobs=1000
  ;;
```

### Env changes

Set `QUEUE_CONNECTION` default to `redis` in compose `&app-env`.

### Scaling

```bash
docker compose up -d --scale worker=3
```

> `deploy.replicas` is Swarm-only — use `--scale` for standard Compose.

### Dedicated queue priorities

```yaml
worker-high:
  <<: *app-base
  environment:
    <<: *app-env
    CONTAINER_ROLE: worker
  command: ["php", "artisan", "queue:work", "--queue=high,default", "--max-time=3600"]
```

---

## Adding Scheduler

**When**: Project has scheduled commands in `routes/console.php`.

### docker-compose.yml — add service

```yaml
scheduler:
  <<: *app-base
  environment:
    <<: *app-env
    CONTAINER_ROLE: scheduler
  depends_on:
    app: { condition: service_healthy }
  networks: [internal]
```

### docker/entrypoint.sh — add role

```bash
scheduler)
  echo "Running as: scheduler"
  exec php artisan schedule:work
  ;;
```

Uses `schedule:work` (Laravel's built-in daemon), NOT a shell `while/sleep` loop.

The scheduler dispatches jobs — if those jobs should run async, also add Redis + Worker.

---

## Adding Reverb (WebSockets)

**When**: Project needs real-time broadcasting. **Requires**: Redis addon (for scaling later).

### docker-compose.yml — add service

```yaml
reverb:
  <<: *app-base
  environment:
    <<: *app-env
    CONTAINER_ROLE: reverb
  expose: ["8080"]
  depends_on:
    {project}-db: { condition: service_healthy }
    redis: { condition: service_healthy }
  healthcheck:
    test: ["CMD", "php", "-r", "exit(@fsockopen('127.0.0.1', 8080) ? 0 : 1);"]
    interval: 30s
    timeout: 5s
    retries: 3
    start_period: 10s
  networks: [internal]
```

### docker/entrypoint.sh — add role

```bash
reverb)
  echo "Running as: reverb"
  exec php artisan reverb:start \
    --host=0.0.0.0 \
    --port=8080 \
    --no-interaction
  ;;
```

### docker/nginx.conf — add WebSocket proxy block

Add BEFORE the `/` location block:

```nginx
location /app {
    proxy_pass http://reverb:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $forwarded_proto;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
}
```

### Shared env block (`&app-env`) — add:

```yaml
BROADCAST_CONNECTION: "${BROADCAST_CONNECTION:-reverb}"
REVERB_APP_ID: "${REVERB_APP_ID:-1001}"
REVERB_APP_KEY: "${REVERB_APP_KEY:-my-reverb-key}"
REVERB_APP_SECRET: "${REVERB_APP_SECRET:-my-reverb-secret}"
REVERB_HOST: "${REVERB_HOST:-reverb}"
REVERB_PORT: "${REVERB_PORT:-8080}"
REVERB_SCHEME: "${REVERB_SCHEME:-http}"
REVERB_INTERNAL_HOST: "${REVERB_INTERNAL_HOST:-reverb}"
REVERB_INTERNAL_PORT: "${REVERB_INTERNAL_PORT:-8080}"
REVERB_INTERNAL_SCHEME: "${REVERB_INTERNAL_SCHEME:-http}"
```

### config/broadcasting.php — CRITICAL CHANGE

The reverb connection options MUST use internal host for PHP-to-Reverb communication:

```php
'options' => [
    'host' => env('REVERB_INTERNAL_HOST', env('REVERB_HOST')),
    'port' => env('REVERB_INTERNAL_PORT', env('REVERB_PORT', 443)),
    'scheme' => env('REVERB_INTERNAL_SCHEME', env('REVERB_SCHEME', 'https')),
    'useTLS' => env('REVERB_INTERNAL_SCHEME', env('REVERB_SCHEME', 'https')) === 'https',
],
```

Without this, PHP tries to reach Reverb via the external domain instead of Docker DNS, and broadcasting silently fails.

### .env.example — add:

```env
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=1001
REVERB_APP_KEY=laravel-herd
REVERB_APP_SECRET=secret
REVERB_HOST=localhost                   # Production: your-domain.com
REVERB_PORT=8080                        # Production: 443
REVERB_SCHEME=http                      # Production: https
# REVERB_INTERNAL_HOST=                 # Production: reverb
# REVERB_INTERNAL_PORT=                 # Production: 8080
# REVERB_INTERNAL_SCHEME=               # Production: http

VITE_REVERB_APP_KEY=laravel-herd
VITE_REVERB_HOST=localhost              # Production: your-domain.com
VITE_REVERB_PORT=8080                   # Production: 443
VITE_REVERB_SCHEME=http                 # Production: https
```

### Reverb Host Split

- `REVERB_HOST/PORT/SCHEME` = **external** (your domain, 443, https) — for `config/reverb.php` client auth
- `REVERB_INTERNAL_HOST/PORT/SCHEME` = **internal** (Docker service `reverb`, 8080, http) — for `config/broadcasting.php` Guzzle calls
- Locally, `REVERB_INTERNAL_*` not set — falls back to `REVERB_*`

---

## Adding SSR

**When**: SEO matters, social media previews needed, or faster first paint.

### Option A: Co-located in app container

Add to `docker/supervisord.conf`:

```ini
[program:ssr]
command=php /app/artisan inertia:start-ssr
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
priority=30
```

Add to Dockerfile node-build stage:
```dockerfile
RUN npm run build && npm run build -- --ssr
```

Ensure `node_modules` is copied to production image.

**Tradeoff**: SSR crash can affect the app container. Inertia falls back to client-side rendering.

### Option B: Separate container

```yaml
ssr:
  <<: *app-base
  environment:
    <<: *app-env
    CONTAINER_ROLE: ssr
  expose: ["13714"]
  networks: [internal]
```

Add `INERTIA_SSR_URL=http://ssr:13714` to the app's environment.

Add `ssr` role to `docker/entrypoint.sh`:
```bash
ssr)
  echo "Running as: ssr"
  exec php artisan inertia:start-ssr
  ;;
```

---

## Adding Octane (Performance Upgrade)

**When**: App is stable, want 2-5x throughput. Replaces PHP-FPM with FrankenPHP.

### Dockerfile — change base image

Stage 3: `php:8.4-fpm-alpine` -> `dunglas/frankenphp:php8.4-alpine`

### docker/supervisord.conf — replace php-fpm

Replace:
```ini
[program:php-fpm]
command=php-fpm --nodaemonize
```

With:
```ini
[program:octane]
command=php /app/artisan octane:frankenphp --host=0.0.0.0 --port=8000 --max-requests=500
```

### docker/nginx.conf — change proxy target

Replace PHP-FPM socket/fastcgi with:
```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $forwarded_proto;
    proxy_set_header Connection "";
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
}
```

### Octane Gotchas

- **Singleton persistence**: Use `scoped()` not `singleton()` for request-specific bindings
- **Static state leaks**: Never append to static arrays — they persist across requests
- **Memory leaks**: `--max-requests=500` recycles workers to mitigate
- **Container injection**: Never inject request/container/config into singleton constructors — use closures
- **Third-party packages**: Some assume fresh process per request — test everything

### composer.json

```bash
composer require laravel/octane
```
