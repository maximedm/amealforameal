# No `npm run build`

Do NOT run `npm run build`. The user runs `composer dev` (which starts Vite dev server + Wayfinder watch), and running `npm run build` conflicts with it.

If the user reports a missing frontend change or a Vite manifest error, ask them to restart `composer dev` or `npm run dev` instead of running a build yourself.
