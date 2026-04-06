"use client";

import { useEffect, useRef } from "react";

interface EncyclopediaPageProps {
  css: string;
  body: string;
  scripts: string;
  /** Unique scope id to prevent CSS collisions between pages */
  scopeId: string;
}

export function EncyclopediaPage({
  css,
  body,
  scripts,
  scopeId,
}: EncyclopediaPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scripts) return;

    // Execute the original page scripts within the container context
    // We scope the queries to the container so multiple pages don't conflict
    const container = containerRef.current;

    // Nav buttons (for pages with .nav-btn or .snav or .sn)
    const navBtns = container.querySelectorAll(
      ".nav-btn, .snav, .sn"
    ) as NodeListOf<HTMLElement>;
    const sections = container.querySelectorAll(
      ".section, .sc"
    ) as NodeListOf<HTMLElement>;

    navBtns.forEach((b) => {
      b.addEventListener("click", () => {
        // Find the correct section group (which nav system)
        const isMainNav = b.classList.contains("nav-btn");
        const isSubNav =
          b.classList.contains("snav") || b.classList.contains("sn");

        if (isMainNav) {
          container
            .querySelectorAll(".nav-btn")
            .forEach((x) => x.classList.remove("active"));
          container
            .querySelectorAll(".section")
            .forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          const target = container.querySelector(
            `#${(b as HTMLButtonElement).dataset.s}`
          );
          if (target) target.classList.add("active");
        }

        if (isSubNav) {
          // Find the closest nav container
          const navContainer = b.closest(".sub-nav, nav");
          if (navContainer) {
            navContainer
              .querySelectorAll(".snav, .sn")
              .forEach((x) => x.classList.remove("active"));
          }
          b.classList.add("active");

          // Find the sections container (sibling)
          const sectionId = (b as HTMLButtonElement).dataset.s;
          if (sectionId) {
            // Find parent tech-section or main area
            const parent = b.closest(".tech-section, .ts") || container;
            parent
              .querySelectorAll(".sc, .section")
              .forEach((x: Element) => {
                if (
                  x.id &&
                  x.closest(".tech-section, .ts") === b.closest(".tech-section, .ts")
                ) {
                  x.classList.remove("active");
                }
              });
            const target = parent.querySelector(`#${sectionId}`);
            if (target) target.classList.add("active");
          }
        }

        // Scroll to nav
        const nav = b.closest(".nav, .sub-nav") as HTMLElement;
        if (nav) {
          window.scrollTo({
            top: nav.offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Top tabs (for multi-tech pages like frontend-bible)
    const topTabs = container.querySelectorAll(
      ".top-tab, .tab"
    ) as NodeListOf<HTMLElement>;
    topTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        container
          .querySelectorAll(".top-tab, .tab")
          .forEach((x) => x.classList.remove("active"));
        tab.classList.add("active");
        const targetId = (tab as HTMLButtonElement).dataset.t;
        container
          .querySelectorAll(".tech-section, .tech, .ts")
          .forEach((x) => x.classList.remove("active"));
        if (targetId) {
          const target =
            container.querySelector(`#ts-${targetId}`) ||
            container.querySelector(`#${targetId}`);
          if (target) {
            target.classList.add("active");
            // Activate first sub-nav section
            const firstSubNav = target.querySelector(
              ".snav.active, .sn.active"
            ) as HTMLElement;
            if (firstSubNav) firstSubNav.click();
          }
        }
      });
    });

    // Q&A toggle (multiple selectors for different HTML structures)
    container.querySelectorAll(".qa-h, .qh").forEach((h) => {
      h.addEventListener("click", () => {
        const qa = h.closest(".qa");
        if (qa) qa.classList.toggle("open");
      });
    });

    // Filter buttons
    const setupFilters = (
      filterSelector: string,
      qaSelector: string,
      countSelector: string
    ) => {
      container.querySelectorAll(filterSelector).forEach((btn) => {
        btn.addEventListener("click", () => {
          // Find filter container
          const filterBar = btn.closest(".fbar, .fb");
          if (filterBar) {
            filterBar
              .querySelectorAll(filterSelector)
              .forEach((x) => x.classList.remove("active"));
          }
          (btn as HTMLElement).classList.add("active");

          const f = (btn as HTMLButtonElement).dataset.f;
          // Find the closest section with QA items
          const section =
            btn.closest(".section, .sc, .tech, .ts, .tech-section") ||
            container;
          section.querySelectorAll(qaSelector).forEach((q: Element) => {
            const el = q as HTMLElement;
            const level = el.dataset.l;
            el.style.display =
              f === "all" || level === f ? "" : "none";
          });

          // Update count
          const visCount = section.querySelectorAll(
            `${qaSelector}:not([style*="display: none"])`
          ).length;
          const countEl = section.querySelector(countSelector);
          if (countEl) {
            const b = countEl.querySelector("b");
            if (b) b.textContent = String(visCount);
          }
        });
      });
    };

    setupFilters(".fbtn, .ft", ".qa", ".counter, .ct");

    // Initialize counts
    const initCounts = () => {
      container.querySelectorAll(".counter, .ct").forEach((el) => {
        const section =
          el.closest(".section, .sc, .tech, .ts, .tech-section") || container;
        const total = section.querySelectorAll(".qa").length;
        const b = el.querySelector("b");
        if (b && total > 0) b.textContent = String(total);
      });
    };
    initCounts();
  }, [scripts]);

  return (
    <div className="content-page" ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className="content-page-inner"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
