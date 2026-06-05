/* ============================================================
   Sreenivas Sadhu Prabhakara — interactive data resume
   All employers & client institutions are described by
   sector / industry / role only — no organisation names.
   ============================================================ */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = { cyan: "#2ee6d6", sky: "#45b6f5", gold: "#f5b942", violet: "#9d8bf2", coral: "#ff7d8a" };

  /* ---------------- DATA ---------------- */

  const NUMBERS = [
    { value: 18, suffix: "", label: "Years experience" },
    { value: 9,  suffix: "+", label: "Tier-1 banks as API owner" },
    { value: 4,  suffix: "", label: "Global markets" },
    { value: 13, suffix: "", label: "Years overseas" },
    { value: 30, suffix: "", label: "GitHub repositories" },
    { value: 7,  suffix: "", label: "Languages spoken" },
    { value: 13, suffix: "+", label: "Cloud-partner-referred trainings" },
  ];

  const MARKETS = [
    { name: "India",          city: "Bengaluru",    code: "IN", lat: 12.97, lon: 77.59,  hub: true, color: C.cyan,   note: "Home hub — private-sector banking & securities API programmes" },
    { name: "United States",  city: "New Jersey",   code: "US", lat: 40.73, lon: -74.17,            color: C.sky,    note: "Global card & payments network — enterprise architecture" },
    { name: "Singapore",      city: "Singapore",    code: "SG", lat: 1.35,  lon: 103.82,            color: C.gold,   note: "Digital-native bank — end-to-end API delivery" },
    { name: "Philippines",    city: "Manila",       code: "PH", lat: 14.60, lon: 120.98,            color: C.violet, note: "Universal bank — platform setup & legacy migration" },
    { name: "Argentina",      city: "Buenos Aires", code: "AR", lat: -34.60, lon: -58.38,           color: C.coral,  note: "Early-career international delivery market" },
  ];
  // names as they appear in world-atlas 110m
  const MARKET_GEO = new Set(["India", "United States of America", "Singapore", "Philippines", "Argentina"]);

  // Most recent first (reverse-chronological)
  const CAREER = [
    { year: 2024, industry: "Global Technology Consulting",    role: "Senior Director — API CoE & Architecture Head", place: "Bengaluru, India", star: true },
    { year: 2020, industry: "Digital Engineering Consultancy", role: "Head of Engineering",                           place: "Global" },
    { year: 2018, industry: "API Platform Product · SaaS",     role: "Principal Architect",                           place: "India" },
    { year: 2014, industry: "IT Services & Consulting",        role: "API Architect",                                 place: "United States" },
    { year: 2011, industry: "IT Services & Consulting",        role: "Integration Lead · TIBCO",                      place: "New Jersey, USA" },
    { year: 2007, industry: "IT Services & Consulting",        role: "Java Developer",                                place: "India" },
  ];

  const SKILLS = [
    { label: "APIGEE · Open Banking · BIAN",        short: "API & Open Banking",  value: 95 },
    { label: "Java · Spring Boot · Microservices",  short: "Java · Microservices", value: 88 },
    { label: "GCP (Certified) · Terraform / IaC",   short: "Cloud · IaC",          value: 85 },
    { label: "AI Engineering",                      short: "AI Engineering",       value: 78 },
    { label: "AWS · Cloud Architecture",            short: "Cloud Arch.",          value: 75 },
  ];

  const PROGRAMMES = [
    { sector: "Universal Bank",               market: "Philippines", code: "PH", color: C.violet, role: "Head of API Engineering",   programme: "API platform setup & full legacy migration", tag: "Platform · Migration" },
    { sector: "Private-Sector Retail Bank",   market: "India",       code: "IN", color: C.cyan,   role: "Head of API Engineering",   programme: "API platform setup & full legacy migration", tag: "Platform · Migration" },
    { sector: "Digital-Native Bank",          market: "Singapore",   code: "SG", color: C.gold,   role: "Overall API Programme Lead", programme: "End-to-end digital-bank API delivery",       tag: "Digital Bank" },
    { sector: "Private-Sector Universal Bank", market: "India",      code: "IN", color: C.cyan,   role: "API Programme Principal",   programme: "API patterns & governance framework",        tag: "Governance" },
    { sector: "Securities & Brokerage",       market: "India",       code: "IN", color: C.cyan,   role: "API Principal · Lead Cloud", programme: "API programme + public-cloud landing zone",  tag: "Cloud · Landing Zone" },
    { sector: "Global Card & Payments Network", market: "USA",       code: "US", color: C.sky,    role: "Enterprise Architect",      programme: "Global client-acquisition API platform",     tag: "Enterprise" },
  ];

  const CREDENTIALS = [
    { title: "Professional Cloud Architect — Certified", org: "Leading public-cloud platform",  type: "Certification",      icon: "cloud" },
    { title: "API Management Platform — Certified Engineer", org: "Enterprise API gateway",      type: "Certification",      icon: "api" },
    { title: "Business Analytics — Executive Programme", org: "Premier Indian science institute", type: "Executive Ed.",     icon: "chart" },
    { title: "Master of International Business — ongoing", org: "International business school",   type: "Postgraduate",       icon: "globe" },
    { title: "ITIL V3 · ISTQB · Java SE · API Gateway",  org: "Industry frameworks & vendors",   type: "Professional",       icon: "badge" },
    { title: "B.E. Electronics & Communication",         org: "State technical university · 2007", type: "Degree",           icon: "cap" },
  ];

  const LANGUAGES = ["English", "French", "Spanish", "Hindi", "Kannada", "Telugu", "Tamil"];

  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function countUp(node, target, suffix, dur = 1600) {
    if (REDUCED) { node.textContent = target + suffix; return; }
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      node.textContent = Math.round(easeOutCubic(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // run a callback once when an element scrolls into view
  function onView(node, cb, threshold = 0.3) {
    if (REDUCED) { cb(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { cb(); io.disconnect(); } });
    }, { threshold });
    io.observe(node);
  }

  /* ---------------- animated API-mesh background ---------------- */
  function mountBackground() {
    const canvas = $("#mesh");
    if (!canvas || REDUCED) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, nodes, raf;
    const COUNT = () => Math.min(70, Math.floor(window.innerWidth / 22));

    function seed() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      nodes = Array.from({ length: COUNT() }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
        c: i % 9 === 0 ? C.gold : (i % 3 === 0 ? C.sky : C.cyan),
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const linkDist = 150 * dpr;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.globalAlpha = (1 - d / linkDist) * 0.16;
            ctx.strokeStyle = C.cyan; ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = a.c;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    seed(); frame();
    let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => { cancelAnimationFrame(raf); seed(); frame(); }, 200); });
  }

  /* ---------------- numbers strip ---------------- */
  function renderNumbers() {
    const wrap = $("#numbers");
    NUMBERS.forEach((n) => {
      const s = el("div", "stat");
      s.innerHTML = `<div class="stat__num"><span data-count="${n.value}" data-suffix="${n.suffix}">0</span></div>
                     <div class="stat__label">${n.label}</div>`;
      wrap.appendChild(s);
    });
  }

  function setupCounters() {
    document.querySelectorAll("[data-count]").forEach((node) => {
      const target = +node.getAttribute("data-count");
      const suffix = node.getAttribute("data-suffix") || "";
      onView(node, () => countUp(node, target, suffix), 0.6);
    });
  }

  /* ---------------- hero dial ---------------- */
  function setupDial() {
    const svg = $(".dial__ring");
    if (svg) {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.innerHTML = `<linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.cyan}"/><stop offset="0.6" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.violet}"/>
      </linearGradient>`;
      svg.prepend(defs);
    }
    const fill = $("#dialFill");
    if (fill) {
      const len = 2 * Math.PI * 108;
      fill.style.strokeDasharray = len;
      fill.style.strokeDashoffset = len;
      // sweep to ~88% — a near-complete career arc
      onView($(".dial"), () => { fill.style.strokeDashoffset = len * 0.12; }, 0.4);
    }
  }

  /* ---------------- timeline ---------------- */
  function renderTimeline() {
    const root = $("#timeline");
    const track = el("div", "timeline__track");
    const line = el("div", "tl-line", "<span></span>");
    const items = el("div", "tl-items");
    CAREER.forEach((c) => {
      const it = el("div", "tl-item" + (c.star ? " tl-item--star" : ""));
      it.innerHTML = `
        <div class="tl-item__node"></div>
        <div class="tl-year">${c.year}${c.star ? ' <span aria-hidden="true" style="font-size:.6em;color:var(--gold)">★</span>' : ""}</div>
        <div class="tl-company">${c.industry}</div>
        <div class="tl-role">${c.role}</div>
        <div class="tl-place">${c.place}</div>`;
      items.appendChild(it);
    });
    track.appendChild(line); track.appendChild(items);
    root.appendChild(track);

    onView(root, () => { line.querySelector("span").style.width = "100%"; line.querySelector("span").style.height = "100%"; }, 0.2);
    items.querySelectorAll(".tl-item").forEach((it, i) => {
      onView(it, () => setTimeout(() => it.classList.add("is-in"), i * 120), 0.2);
    });
  }

  /* ---------------- skills: bars + radar ---------------- */
  function renderSkills() {
    const bars = $("#skillBars");
    SKILLS.forEach((s) => {
      const row = el("div", "skill");
      row.innerHTML = `
        <div class="skill__top"><span class="skill__name">${s.label}</span><span class="skill__pct" data-pct="${s.value}">0%</span></div>
        <div class="skill__bar"><span class="skill__fill" data-fill="${s.value}"></span></div>`;
      bars.appendChild(row);
    });
    onView(bars, () => {
      bars.querySelectorAll(".skill__fill").forEach((f) => { f.style.width = f.getAttribute("data-fill") + "%"; });
      bars.querySelectorAll(".skill__pct").forEach((p) => { countUp(p, +p.getAttribute("data-pct"), "%", 1500); });
    }, 0.3);

    drawRadar();
  }

  function drawRadar() {
    const host = $("#radar");
    if (!host || !window.d3) return;
    const size = 360, cx = size / 2, cy = size / 2 + 4, R = 120;
    const svg = d3.select(host).append("svg")
      .attr("viewBox", `-66 -6 ${size + 132} ${size + 18}`)
      .attr("width", "100%").attr("preserveAspectRatio", "xMidYMid meet");
    const n = SKILLS.length;
    const ang = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

    // grid rings
    [0.25, 0.5, 0.75, 1].forEach((r) => {
      const pts = d3.range(n).map((i) => [cx + Math.cos(ang(i)) * R * r, cy + Math.sin(ang(i)) * R * r]);
      svg.append("polygon").attr("class", "r-grid").attr("points", pts.map((p) => p.join(",")).join(" "));
    });
    // axes + labels
    SKILLS.forEach((s, i) => {
      const x = cx + Math.cos(ang(i)) * R, y = cy + Math.sin(ang(i)) * R;
      svg.append("line").attr("class", "r-axis").attr("x1", cx).attr("y1", cy).attr("x2", x).attr("y2", y);
      const lx = cx + Math.cos(ang(i)) * (R + 22), ly = cy + Math.sin(ang(i)) * (R + 22);
      const anchor = Math.abs(Math.cos(ang(i))) < 0.3 ? "middle" : (Math.cos(ang(i)) > 0 ? "start" : "end");
      const t = svg.append("text").attr("class", "r-label").attr("x", lx).attr("y", ly).attr("text-anchor", anchor).attr("dy", "0.35em");
      t.append("tspan").attr("x", lx).text(s.short);
      t.append("tspan").attr("x", lx).attr("dy", "1.2em").attr("class", "r-tick").text(s.value + "%");
    });
    // data polygon (animated)
    const target = SKILLS.map((s, i) => [cx + Math.cos(ang(i)) * R * (s.value / 100), cy + Math.sin(ang(i)) * R * (s.value / 100)]);
    const center = SKILLS.map((_, i) => [cx, cy]);
    const poly = svg.append("polygon").attr("class", "r-area").attr("points", center.map((p) => p.join(",")).join(" "));
    const verts = SKILLS.map((s, i) => svg.append("circle").attr("class", "r-vertex").attr("r", 3.5).attr("cx", cx).attr("cy", cy));

    function place(points) {
      poly.attr("points", points.map((p) => p.join(",")).join(" "));
      verts.forEach((v, i) => v.attr("cx", points[i][0]).attr("cy", points[i][1]));
    }
    if (REDUCED) { place(target); return; }
    onView(host, () => {
      const dur = 1300, t0 = performance.now();
      (function anim(now) {
        const p = easeOutCubic(Math.min(1, (now - t0) / dur));
        place(target.map((tp, i) => [center[i][0] + (tp[0] - center[i][0]) * p, center[i][1] + (tp[1] - center[i][1]) * p]));
        if (p < 1) requestAnimationFrame(anim);
      })(t0);
    }, 0.4);
  }

  /* ---------------- world map ---------------- */
  function renderMap() {
    const host = $("#map");
    const legend = $("#mapLegend");

    // legend always renders (independent of D3/data fetch)
    MARKETS.forEach((m) => {
      const li = el("li");
      li.dataset.code = m.code;
      li.innerHTML = `<span class="lg-dot" style="background:${m.color}"></span>
        <span class="lg-name">${m.name}${m.hub ? ' <span style="color:var(--gold)">★ hub</span>' : ""}</span>
        <span class="lg-note">${m.note}</span>`;
      legend.appendChild(li);
    });

    if (!window.d3 || !window.topojson) return;
    const tip = el("div", "map-tip"); host.appendChild(tip);

    function build(world) {
      host.querySelectorAll("svg").forEach((s) => s.remove());
      const rect = host.getBoundingClientRect();
      const W = rect.width, H = Math.max(rect.height, 440);
      const svg = d3.select(host).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("width", "100%").attr("height", "100%");
      const land = topojson.feature(world, world.objects.countries);
      const proj = d3.geoNaturalEarth1().fitExtent([[10, 14], [W - 10, H - 10]], land);
      const path = d3.geoPath(proj);

      svg.append("path").datum(d3.geoGraticule10()).attr("class", "graticule").attr("d", path);
      svg.append("g").selectAll("path").data(land.features).join("path")
        .attr("class", (d) => "country" + (MARKET_GEO.has(d.properties.name) ? " is-market" : ""))
        .attr("d", path);

      // arcs from hub to each market
      const hub = MARKETS.find((m) => m.hub);
      const arcG = svg.append("g");
      MARKETS.filter((m) => !m.hub).forEach((m, i) => {
        const line = { type: "LineString", coordinates: [[hub.lon, hub.lat], [m.lon, m.lat]] };
        const p = arcG.append("path").attr("class", "arc").attr("stroke", m.color).attr("d", path(line));
        const len = p.node().getTotalLength();
        if (!REDUCED) {
          p.attr("stroke-dasharray", len).attr("stroke-dashoffset", len);
          onView(host, () => p.transition().delay(300 + i * 220).duration(1100).ease(d3.easeCubicOut).attr("stroke-dashoffset", 0), 0.25);
        }
      });

      // pins
      const pinG = svg.append("g");
      MARKETS.forEach((m) => {
        const [x, y] = proj([m.lon, m.lat]);
        const g = pinG.append("g").attr("transform", `translate(${x},${y})`).attr("class", "pin-dot").style("cursor", "pointer");
        const ring = g.append("circle").attr("r", 5).attr("fill", "none").attr("stroke", m.color).attr("stroke-width", 1).attr("opacity", 0.5);
        g.append("circle").attr("r", m.hub ? 5 : 4).attr("fill", m.color).attr("stroke", "#060912").attr("stroke-width", 1.4);
        if (m.hub) g.append("circle").attr("r", 8).attr("fill", "none").attr("stroke", C.gold).attr("stroke-width", 1.2).attr("opacity", 0.7);
        g.append("text").attr("class", "pin-label").attr("x", m.lon > 150 || m.code === "SG" ? -8 : 9)
          .attr("y", 3).attr("text-anchor", m.lon > 150 || m.code === "SG" ? "end" : "start").text(m.name);
        if (!REDUCED) (function pulse() { ring.attr("r", 5).attr("opacity", 0.6).transition().duration(2200).ease(d3.easeCubicOut).attr("r", 17).attr("opacity", 0).on("end", pulse); })();

        function show(ev) {
          tip.innerHTML = `<strong>${m.name} <span class="market-flag">${m.code}</span></strong>${m.city} · ${m.note}`;
          const hr = host.getBoundingClientRect();
          let lx = x + 14, ly = y - 10;
          if (lx > W - 170) lx = x - 164;
          tip.style.left = lx + "px"; tip.style.top = ly + "px";
          tip.classList.add("is-on");
          legend.querySelectorAll("li").forEach((li) => li.classList.toggle("is-hot", li.dataset.code === m.code));
        }
        function hide() { tip.classList.remove("is-on"); legend.querySelectorAll("li").forEach((li) => li.classList.remove("is-hot")); }
        g.on("mouseenter", show).on("mousemove", show).on("mouseleave", hide);
      });
    }

    d3.json("assets/data/countries-110m.json").then((world) => {
      build(world);
      let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => build(world), 220); });
    }).catch(() => { host.innerHTML = '<p style="padding:2rem;color:var(--ink-3);font-family:var(--mono);font-size:.85rem">Map data unavailable — see markets list.</p>'; });
  }

  /* ---------------- programmes ---------------- */
  function renderProgrammes() {
    const grid = $("#programmes-grid");
    const filters = $("#filters");
    const markets = [...new Set(PROGRAMMES.map((p) => p.market))];

    function chip(label, code, count, active) {
      const c = el("button", "filter-chip" + (active ? " is-active" : ""));
      c.setAttribute("role", "tab");
      c.innerHTML = `${label} <span class="count">${count}</span>`;
      c.dataset.market = code;
      return c;
    }
    filters.appendChild(chip("All markets", "ALL", PROGRAMMES.length, true));
    markets.forEach((m) => filters.appendChild(chip(m, m, PROGRAMMES.filter((p) => p.market === m).length, false)));

    PROGRAMMES.forEach((p, i) => {
      const card = el("div", "card");
      card.dataset.market = p.market;
      card.style.setProperty("--bx", i);
      card.innerHTML = `
        <div class="card__top">
          <div class="card__inst">${p.sector}</div>
          <span class="card__flag"><i style="background:${p.color}"></i>${p.code}</span>
        </div>
        <div class="card__role">${p.role}</div>
        <div class="card__prog">${p.programme}</div>
        <span class="card__tag">${p.tag}</span>`;
      grid.appendChild(card);
      onView(card, () => setTimeout(() => card.classList.add("is-in"), (i % 3) * 90), 0.15);
    });

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      filters.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      const m = btn.dataset.market;
      grid.querySelectorAll(".card").forEach((c) => {
        c.classList.toggle("is-dim", !(m === "ALL" || c.dataset.market === m));
      });
    });
  }

  /* ---------------- credentials + languages ---------------- */
  const ICONS = {
    cloud: '<path fill="currentColor" d="M6.5 19a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 17.7 9.3 4.5 4.5 0 0 1 17 19H6.5Z"/>',
    api: '<path fill="currentColor" d="M8 4 4 8l4 4-1.4 1.4L1 8l5.6-5.4L8 4Zm8 0 1.4-1.4L23 8l-5.6 5.4L16 12l4-4-4-4ZM13.6 3l1.9.5-4 17.5-1.9-.5 4-17.5Z"/>',
    chart: '<path fill="currentColor" d="M4 20V4h2v14h14v2H4Zm4-3 4-5 3 3 4-6 1.6 1.2L16 18l-3-3-3.5 4.5L8 17Z"/>',
    globe: '<path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3a15 15 0 0 0-1-4.6A8 8 0 0 1 18.9 11ZM12 4c.9 1.2 1.6 2.9 1.9 5H10.1C10.4 6.9 11.1 5.2 12 4ZM4.3 13h3a15 15 0 0 0 1 4.6A8 8 0 0 1 4.3 13Zm3-2h-3a8 8 0 0 1 4-4.6 15 15 0 0 0-1 4.6Zm4.7 9c-.9-1.2-1.6-2.9-1.9-5h3.8c-.3 2.1-1 3.8-1.9 5Zm2.7-.4a15 15 0 0 0 1-4.6h3a8 8 0 0 1-4 4.6Z"/>',
    badge: '<path fill="currentColor" d="m12 2 2.4 1.8 3 .1 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.6l.9-2.9-.9-2.9L5.6 8l1-2.8 3-.1L12 2Zm-1 12.5 5-5L14.6 8 11 11.6 9.4 10 8 11.4l3 3.1Z"/>',
    cap: '<path fill="currentColor" d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm0 13.3L4 12v3.5C4 17.4 7.6 19 12 19s8-1.6 8-3.5V12l-8 4.3Z"/>',
  };

  function renderCredentials() {
    const list = $("#credentials-list");
    CREDENTIALS.forEach((c, i) => {
      const row = el("div", "cred reveal");
      row.setAttribute("data-reveal", "");
      row.innerHTML = `
        <span class="cred__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c.icon] || ICONS.badge}</svg></span>
        <div class="cred__title">${c.title}</div>
        <span class="cred__type">${c.type}</span>
        <div class="cred__org">${c.org}</div>`;
      list.appendChild(row);
    });
  }

  function renderLanguages() {
    const wrap = $("#languages");
    LANGUAGES.forEach((l) => { const c = el("span", "lang-chip", `<i></i>${l}`); wrap.appendChild(c); });
  }

  /* ---------------- nav, scroll-spy, progress ---------------- */
  function setupNav() {
    const nav = $("#nav");
    const bar = $("#scrollbar");
    const links = [...document.querySelectorAll("[data-nav]")];
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);

    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle("is-stuck", y > 40);
      const doc = document.documentElement;
      const p = y / (doc.scrollHeight - doc.clientHeight || 1);
      if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
      let active = null;
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= 140) active = s.id; });
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + active));
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupReveal() {
    if (REDUCED) { document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add("is-in"), (i % 6) * 90); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  }

  /* ---------------- init ---------------- */
  function init() {
    const y = $("#year"); if (y) y.textContent = "2026";
    renderNumbers();
    renderTimeline();
    renderSkills();
    renderMap();
    renderProgrammes();
    renderCredentials();
    renderLanguages();
    setupCounters();
    setupDial();
    setupNav();
    mountBackground();
    // reveal after dynamic nodes exist
    requestAnimationFrame(setupReveal);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
