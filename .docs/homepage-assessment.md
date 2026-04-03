# Homepage Assessment — A Meal For A Meal

**Date:** 2026-04-03
**URL:** https://amealforameal.dev1.maruvalabs.com/
**Lighthouse Version:** 13.0.2 | Chrome 146

---

## Lighthouse Scores

| Category | Score | Grade |
|----------|-------|-------|
| Performance | 66 | Needs Work |
| Accessibility | 95 | Good |
| Best Practices | 96 | Good |
| SEO | 92 | Good |

### Core Web Vitals

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Largest Contentful Paint (LCP) | **4.7 s** | < 2.5 s | Failed |
| First Contentful Paint (FCP) | **1.8 s** | < 1.8 s | Borderline |
| Total Blocking Time (TBT) | **0 ms** | < 200 ms | Passed |
| Cumulative Layout Shift (CLS) | **0.018** | < 0.1 | Passed |
| Speed Index | **2.4 s** | < 1.6 s | Failed |
| Time to Interactive | **4.7 s** | < 3.8 s | Failed |
| Server Response (TTFB) | **274 ms** | < 800 ms | Passed |

**Root cause:** LCP, Speed Index, and TTI all converge at 4.7 s — the hero image (`SOS-Malta-162.jpg` at 3.0 MB) is the single biggest bottleneck.

---

## Performance Issues

### P0 — Hero image is 3.0 MB (LCP blocker)

The hero background image accounts for most of the 4.7 s LCP. Lighthouse estimates **1.9 s improvement** from image optimization alone.

| Image | Size | Potential Savings |
|-------|------|-------------------|
| SOS-Malta-162.jpg (hero) | 3,072 KB | 2,200 KB |
| our-story.jpg | 498 KB | 466 KB |
| children-queuing-with-cups.jpeg | 249 KB | 239 KB |
| child-drinking-closeup.jpeg | 185 KB | 178 KB |
| students-eating-lunch.jpeg | 126 KB | 116 KB |
| logo-white-amfam.png | 85 KB | 82 KB |
| **Total** | **~4.2 MB** | **~3.3 MB** |

**Fix:**
- Convert to WebP/AVIF (60-80% smaller than JPEG)
- Resize hero to max 1920px wide
- Add `<link rel="preload" as="image">` for hero
- Use `srcSet` and `sizes` for responsive delivery

### P1 — Fonts block rendering for 840 ms

Montserrat loads 5 weights (400, 500, 600, 700, 800) from fonts.bunny.net without `font-display: swap`. Text is invisible until fonts download.

Additionally, fonts are loaded **twice** — once in `app.blade.php` and again in `public-site-layout.tsx`.

| Font Request | Blocking Time |
|-------------|---------------|
| Montserrat 400 | 835 ms |
| Montserrat 800 | 755 ms |
| Montserrat 500 | 680 ms |

**Fix:**
- Add `&display=swap` to the Bunny Fonts URL
- Remove duplicate font loading from `public-site-layout.tsx`
- Reduce Montserrat to 3 weights: 400, 600, 700

### P2 — No responsive images

Every device downloads full-resolution images. No `srcSet`, `<picture>`, or modern format fallbacks exist anywhere on the page.

### P3 — 100% of CSS unused on homepage

`app-CGL9EUOL.css` (101 KB) — Lighthouse flags 100% as unused. This is typical for Tailwind (utility classes for all pages bundled together), but worth noting: 19 KB potential savings.

---

## What's Working Well (Performance)

- **TBT: 0 ms** — No long tasks blocking the main thread
- **CLS: 0.018** — Minimal layout shift
- **TTFB: 274 ms** — Fast server response
- **Code splitting** — Inertia lazy-loads page bundles (173 KB main JS)
- **Below-fold lazy loading** — All non-hero images use `loading="lazy"`
- **React Compiler** — Enabled for runtime optimization
- **DOM size: 143 elements** — Light and efficient

---

## Copywriting Assessment

### Overall Impression

The homepage tells a clear story with a memorable core message ("1 Meal Sold = 1 Meal Given") and an effective real-time meal counter. However, the copy leans institutional — it describes what the organization *is* rather than pulling visitors into the mission and giving them a reason to act.

### Section-by-Section Review

#### Hero Section

**Current:** Logo + "The Romy Foods global food programme" + SDG subtitle.
**Problem:** No headline. Visitors see a dark image and a logo for 2+ seconds before understanding what the site is about. The subtitles are vague and corporate.

**Suggested improvement:**
- Add a clear, emotional headline: *"Every Meal We Sell Feeds a Child Who Goes Without"*
- Move "The Romy Foods global food programme" to a smaller byline
- Drop the SDG subtitle from the hero entirely (it's not a hook)

#### Mission Strip (Gold Bar)

**Current:** "1 Meal Sold = 1 Meal Given | to those who need it most"
**Assessment:** This is the strongest line on the page. The meal counter beside it provides live proof. Could be even more direct.

**Alternative:** *"Buy a meal. Give a meal. It's that simple."*

#### Our Story Section

**Current:** "A Meal for A Meal was launched in 2016 with the aim of helping defeat global hunger. Our story started when Rickard Gillblad, Romy Foods CEO and founder came across a map showing how much food is wasted in Europe and the level of famine in Africa."

**Problem:** Opens with a date and a corporate name. The emotional hook (waste vs. famine contrast) is buried in the second sentence.

**Suggested lead:** *"Half the world wastes food. The other half goes hungry. When Romy Foods founder Rickard Gillblad saw this reality side by side on a map, he decided to do something about it."*

#### Romy Foods Section

**Current:** Corporate description of Romy Foods' business operations (frozen meals, Torus Pak technology, international clients).

**Problem:** Reads like a B2B pitch. A visitor on a social impact site doesn't care about "the whole value chain in the provision of quality ready-made meals."

**Suggested reframe:** Connect the business to the mission. *"Romy Foods delivers millions of meals across the world. For every one sold, another goes to a child in need. That's not a side project — it's built into how the business works."*

#### Projects Section

**Current:** "Launched in June 2016 in collaboration with SOS Malta, our first project is currently providing 2,000 daily meals to children attending primary schools in Jinja, in the Buikwe District of Uganda."

**Problem:** Corporate tone. Leads with a date and partnership credit instead of impact.

**Suggested lead:** *"2,000 children in Uganda eat lunch at school every day — because of this programme."* Then follow with details about Jinja, SOS Malta, etc.

#### Partners Section

**Current:** Duplicates the "launched in June 2016 in collaboration with SOS Malta" intro from Projects.

**Problem:** Repetitive. Should focus on *why* partnerships matter, not restate when they started.

**Suggested reframe:** *"Defeating hunger takes more than one organization. These partners make A Meal for A Meal possible."*

#### Founder Quote Section

**Current:** 4-sentence philosophical quote about sustainability, corporate responsibility, and future generations.

**Problem:** Too long. The strength is diluted across four sentences.

**Suggested trim:** Keep only the strongest line:
> *"We have only borrowed this planet from our children."*
> — Rickard Gillblad, Founder & CEO, Romy Foods

### Structural Issues

| Issue | Detail |
|-------|--------|
| **No primary CTA** | What should a visitor *do*? Buy products? Partner? Donate? Share? There is no clear next action |
| **No "How It Works"** | The buy-one-give-one mechanism deserves a visual 3-step explainer |
| **No urgency** | How many children still go hungry? What's the gap between current impact and the goal? |
| **No social proof** | Testimonials from beneficiaries, partners, or press coverage would build trust |
| **Page title is "Home"** | Should be: *"A Meal For A Meal — Every Meal Sold Feeds a Child in Need"* |
| **No meta description** | Missing opportunity for search engine click-through |

### Brand Voice Notes

The current voice is professional and institutional. For a social impact site, consider shifting toward:
- **Direct** over corporate ("We feed children" vs. "provision of quality ready-made meals")
- **Specific** over abstract ("2,000 lunches every school day" vs. "helping defeat global hunger")
- **Human** over organizational (children's stories vs. launch dates and partnership credits)

---

## Recommended Priorities — Status

### Completed

| # | Item | Date |
|---|------|------|
| 1 | Compress and convert all images to WebP (47 files, hero 2972KB→545KB) | 2026-04-03 |
| 2 | Add `&display=swap` to font URL | 2026-04-03 |
| 3 | Remove duplicate font loading from `public-site-layout.tsx` | 2026-04-03 |
| 4 | Add H1 headline to hero section | 2026-04-03 |
| 5 | Update `<Head title>` + meta description on all pages | 2026-04-03 |
| 7 | Reduce Montserrat weights (5→3) | 2026-04-03 |
| 11 | WebP conversion (one-time batch) | 2026-04-03 |
| 13 | Preload hero image | 2026-04-03 |
| — | Add proper H1 tags to all pages (Home, Our Story, Goals, Partners, News) | 2026-04-03 |
| — | Add meta descriptions to all pages | 2026-04-03 |
| — | Add dynamic XML sitemap (`/sitemap.xml`) | 2026-04-03 |
| — | Update `robots.txt` with sitemap reference + block admin routes | 2026-04-03 |
| — | Add `theme-color` meta tag | 2026-04-03 |
| — | Add Inertia `prefetch` to navbar links | 2026-04-03 |
| — | Convert footer `<a>` tags to Inertia `<Link>` | 2026-04-03 |
| — | Partners copy rewritten (removed duplicate intro) | 2026-04-03 |

| — | Rewrote Our Story copy (lead with impact, not dates) | 2026-04-03 |
| — | Rewrote Projects copy (lead with children, not launch date) | 2026-04-03 |
| — | Rewrote Romy Foods copy (connected business to mission) | 2026-04-03 |
| — | Rewrote Partners copy (removed duplicate intro) | 2026-04-03 |
| — | Added "How It Works" 3-step section (Sold > Matched > Child Eats) | 2026-04-03 |
| — | Added final CTA section with "Visit Romy Foods" + "Learn More" | 2026-04-03 |
| — | Added "Voices from the Field" social proof (Claudia Taylor East + Rickard Gillblad quotes) | 2026-04-03 |
| — | Trimmed founder quote (4 sentences → 2) | 2026-04-03 |
| 6 | Generated responsive image variants (640w, 1024w) + updated srcSet | 2026-04-03 |
| 14 | Self-hosted fonts (removed fonts.bunny.net dependency) | 2026-04-03 |

### All items resolved.
