# cloudeation.net

Marketing site for **Cloudeation Technologies** — a single scrolling page plus a
dedicated **Data Rover** product page. Plain static HTML/CSS/JS, no build step.

## Structure

```
index.html          Home (hero, services, why-us, stats, products, about, contact)
data-rover.html     Data Rover product page
404.html            Not-found page
assets/css/styles.css
assets/js/main.js    nav toggle, scroll reveal, stat count-up, contact form
assets/img/          logo, favicon, product logo, photos
CNAME                custom domain for GitHub Pages
legacy/              earlier draft — not published
```

## Local preview

```
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy — GitHub Pages

1. Push to `main`.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Custom domain: `cloudeation.net` (already in `CNAME`). Tick **Enforce HTTPS** once the cert is issued.
4. DNS at GoDaddy — replace the current Vercel records with:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | `konareddy.github.io.` |

## Contact form

`assets/js/main.js` → `FORMSPREE_ENDPOINT`. While empty, the form opens the
visitor's email client (mailto). To receive submissions in an inbox, create a
free form at <https://formspree.io> and paste its endpoint there.

## Things to review / update

- Founder name & title in `index.html` (About section) — currently "Rangesh Kona, Founder & CEO".
- Stat figures (12+ years, 300+ certs, 98% retention, 90% repeat) — set to real numbers.
- Client list (Arrow Electronics, Brenntag, Elevance Health, Sallie Mae, Triumph Bank, UST Global) — confirm these can be named publicly.
- Phone `+1 (972) 878-3496` and email `Hr@cloudeation.net` — carried over from the previous site.
