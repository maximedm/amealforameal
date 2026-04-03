# Separate Testing Database

Tests use a dedicated `good-news-testing` database configured in `phpunit.xml`. This prevents `RefreshDatabase` from wiping the development database.

- Never change `DB_DATABASE` in `phpunit.xml` to point at the development database (`good-news`).
- If a developer needs to set up the testing database, they can create it in PostgreSQL: `CREATE DATABASE good-news-testing;`
