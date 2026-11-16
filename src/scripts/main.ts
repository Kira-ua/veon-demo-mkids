// Page behaviour. Everything is progressive: without this script all content and links still work.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header: hairline after scroll.
const header = document.querySelector<HTMLElement>("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Disclosures (book buttons, mobile menu): close on Escape, outside click, and after choosing a link.
const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-book], [data-menu]"));
document.addEventListener("click", (e) => {
  const t = e.target as Node;
  for (const d of disclosures) if (d.open && !d.contains(t)) d.open = false;
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  for (const d of disclosures) {
    if (d.open) { d.open = false; d.querySelector("summary")?.focus(); }
  }
});
for (const d of disclosures) {
  d.addEventListener("toggle", () => {
    if (d.open) for (const o of disclosures) if (o !== d && o.open) o.open = false;
  });
  d.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { d.open = false; }));
}

// City tabs in #branches (effect 2): upgrade the list of anchors into tabs.
const tabsRoot = document.querySelector<HTMLElement>("[data-tabs]");
const selectCity = (id: string, focus = false) => {
  if (!tabsRoot) return;
  const tabs = Array.from(tabsRoot.querySelectorAll<HTMLAnchorElement>("[data-tab]"));
  const panels = Array.from(tabsRoot.querySelectorAll<HTMLElement>("[data-panel]"));
  const indicator = tabsRoot.querySelector<HTMLElement>("[data-indicator]");
  tabs.forEach((t) => {
    const on = t.dataset.tab === id;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    if (on) {
      if (focus) t.focus();
      if (indicator) {
        indicator.style.transform = `translateX(${t.offsetLeft}px) scaleX(${t.offsetWidth / 100})`;
      }
      const bar = t.closest<HTMLElement>(".tabs__bar");
      if (bar && bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: t.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
    }
  });
  panels.forEach((p) => {
    const on = p.dataset.panel === id;
    p.hidden = !on;
    p.classList.toggle("is-in", on);
  });
};
if (tabsRoot) {
  tabsRoot.classList.add("is-tabs");
  const list = tabsRoot.querySelector<HTMLElement>("[data-tablist]");
  list?.setAttribute("role", "tablist");
  const tabs = Array.from(tabsRoot.querySelectorAll<HTMLAnchorElement>("[data-tab]"));
  tabs.forEach((t) => {
    t.setAttribute("role", "tab");
    t.setAttribute("aria-controls", `city-${t.dataset.tab}`);
    t.id = `tab-${t.dataset.tab}`;
    t.parentElement?.setAttribute("role", "presentation");
    t.addEventListener("click", (e) => { e.preventDefault(); selectCity(t.dataset.tab!); });
    t.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(t);
      let n = -1;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = tabs.length - 1;
      if (n >= 0) { e.preventDefault(); selectCity(tabs[n].dataset.tab!, true); }
    });
  });
  tabsRoot.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
    p.setAttribute("role", "tabpanel");
    p.setAttribute("aria-labelledby", `tab-${p.dataset.panel}`);
    p.tabIndex = 0;
  });
  const cityFromHash = () => {
    const id = decodeURIComponent(location.hash).startsWith("#city-") ? decodeURIComponent(location.hash).slice(6) : "";
    return tabs.some((t) => t.dataset.tab === id) ? id : "";
  };
  const openFromHash = () => {
    const id = cityFromHash();
    if (!id) return false;
    selectCity(id);
    // panels above were hidden: bring the block back into view
    document.getElementById("branches")?.scrollIntoView({ behavior: "auto", block: "start" });
    return true;
  };
  if (!openFromHash()) selectCity(tabs[0].dataset.tab!);
  window.addEventListener("hashchange", openFromHash);
  window.addEventListener("load", () => { if (cityFromHash()) openFromHash(); });
  window.addEventListener("resize", () => {
    const cur = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    if (cur) selectCity(cur.dataset.tab!);
  });
}

// Route stops in the hero: open the city tab and go to #branches.
document.querySelectorAll<HTMLAnchorElement>("[data-route] a[data-city]").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (!tabsRoot) return;
    e.preventDefault();
    selectCity(a.dataset.city!);
    const target = document.getElementById("branches");
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#city-${a.dataset.city}`);
  });
});

// Mobile bar (R-106): shown once the hero is out of view.
const bar = document.querySelector<HTMLElement>("[data-mobile-bar]");
const hero = document.getElementById("hero");
if (bar && hero && "IntersectionObserver" in window) {
  bar.classList.add("is-hidden");
  bar.inert = true;
  new IntersectionObserver(([e]) => {
    const show = !e.isIntersecting;
    bar.classList.toggle("is-hidden", !show);
    bar.inert = !show;
  }, { threshold: 0 }).observe(hero);
}

// Effect 3: the age line fills once when it enters the screen.
const fills = document.querySelectorAll<HTMLElement>("[data-fill]");
if (reduce || !("IntersectionObserver" in window)) {
  fills.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -15% 0px", threshold: 0.3 });
  fills.forEach((el) => io.observe(el));
}
