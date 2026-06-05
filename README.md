# Sreenivas Sadhu Prabhakara — Interactive Data Résumé

An interactive, data-visualisation résumé for a **Senior Director — API Centre of Excellence & Architecture Head** with 18 years across IT services and global technology consulting, delivering banking API platforms across four global markets.

🔗 **Live:** https://sreenivas-sadhu-prabhakara.github.io/resume/

## Highlights

- **Animated global-reach map** (D3 + Natural Earth) plotting delivery markets with great-circle arcs from a Bengaluru hub.
- **Interactive career timeline** — 18 years traced node by node.
- **Expertise radar** + animated proficiency bars.
- **Filterable banking-programme cards** by market.
- Animated counters, scroll-spy navigation, an ambient API-mesh canvas background, and a print-friendly fallback.

> All employers and client institutions are described by **sector, industry, and role** only — no organisation names are used.

## Built with

- Hand-authored **HTML / CSS / vanilla JS** — no build step.
- **[D3.js](https://d3js.org/)** and **TopoJSON** for the map and radar (vendored locally in `assets/vendor/`, zero runtime CDN dependency).
- Type: **Bricolage Grotesque** (display) · **JetBrains Mono** (data) · **IBM Plex Sans** (body).
- Fully responsive, keyboard-navigable, and `prefers-reduced-motion` aware.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

A static `index.html` — any web server (or GitHub Pages) will do.

## Structure

```
index.html          markup + metadata
styles.css          design system ("data observatory" theme)
app.js              data model + D3 visualisations + interactions
assets/
  vendor/           d3.v7.min.js, topojson-client.v3.min.js
  data/             countries-110m.json (Natural Earth, via world-atlas)
  img/              favicon
```

---

© 2026 Sreenivas Sadhu Prabhakara · Bengaluru, India
