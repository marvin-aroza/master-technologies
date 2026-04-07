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
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Use Event Delegation for completely stable binding over injected HTML
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Navigation buttons (Supports .nav-btn, .snav, .sn, .tab, .top-tab)
      const navBtn = target.closest('.nav-btn, .snav, .sn, .tab, .top-tab') as HTMLElement;
      if (navBtn && container.contains(navBtn)) {
        if (!navBtn.dataset.s) return; // Only handle buttons that target a section
        e.preventDefault();

        // Deactivate all possible button class variants in this nav group
        const navGroup = navBtn.closest('.nav, .sub-nav, .tabs, .top-tabs') || container;
        navGroup.querySelectorAll('.nav-btn, .snav, .sn, .tab, .top-tab').forEach(x => x.classList.remove('active'));
        
        // Deactivate all possible section class variants in the scope
        const scope = navBtn.closest('.tech-section, .ts, .tech') || container;
        scope.querySelectorAll('.section, .sc, .tech, .ts').forEach(x => x.classList.remove('active'));
        
        navBtn.classList.add('active');
        const sTarget = container.querySelector(`#${navBtn.dataset.s}`);
        if (sTarget) {
          sTarget.classList.add('active');
          // Smooth scroll to target if it's the main nav
          if (navBtn.classList.contains('nav-btn') && !navBtn.classList.contains('sn')) {
             window.scrollTo({ top: sTarget.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
          }
        }
      }

      // 2. Q&A toggle (handled by .qh or .qa-h)
      const qaH = target.closest('.qa-h, .qh') as HTMLElement;
      if (qaH && container.contains(qaH)) {
        const qa = qaH.closest('.qa');
        if (qa) qa.classList.toggle('open');
      }

      // 3. Filters
      const fBtn = target.closest('.fbtn, .ft') as HTMLElement;
      if (fBtn && container.contains(fBtn)) {
        const filterBar = fBtn.closest('.fbar, .fb');
        if (filterBar) filterBar.querySelectorAll('.fbtn, .ft').forEach(x => x.classList.remove('active'));
        fBtn.classList.add('active');
        
        const f = fBtn.dataset.f;
        const section = fBtn.closest('.section, .sc, .tech, .ts, .tech-section') || container;
        
        section.querySelectorAll('.qa').forEach((q: Element) => {
          const el = q as HTMLElement;
          const level = el.dataset.l;
          el.style.display = (f === 'all' || level === f) ? '' : 'none';
        });

        // Update counts
        const visCount = section.querySelectorAll('.qa:not([style*="display: none"])').length;
        const countEl = section.querySelector('.counter, .ct');
        if (countEl) {
          const b = countEl.querySelector('b');
          if (b) b.textContent = String(visCount);
        }
      }
    };

    container.addEventListener('click', clickHandler);

    // Initialize counts on boot
    const initCounts = () => {
      container.querySelectorAll('.counter, .ct').forEach((el) => {
        const section = el.closest('.section, .sc, .tech, .ts, .tech-section') || container;
        const total = section.querySelectorAll('.qa').length;
        const b = el.querySelector('b');
        if (b && total > 0) b.textContent = String(total);
      });

      // Update the main hero subtitle if it has a count placeholder
      const totalQa = container.querySelectorAll('.qa').length;
      if (totalQa > 0) {
        const subHeader = container.querySelector('.hero .sub');
        if (subHeader && subHeader.textContent) {
          subHeader.textContent = subHeader.textContent.replace(
            /\d+\/800\+ interview questions/,
            `${totalQa}/800+ interview questions`
          );
        }
      }
    };
    initCounts();

    // Auto-activate first nav/section if none are active
    const activateFirst = () => {
      const hasActiveSection = container.querySelector('.section.active, .sc.active, .tech.active, .ts.active');
      if (!hasActiveSection) {
        const firstNav = container.querySelector('.nav-btn, .snav, .sn, .tab') as HTMLElement;
        if (firstNav) firstNav.click();
      }
    };
    setTimeout(activateFirst, 100);

    // Mouse wheel → horizontal scroll for navs
    const scrollableNavs = container.querySelectorAll(
      ".nav, .nav-inner, .sub-nav, .sub-nav-inner, .sni, .top-tabs, .tabs, .tab-bar"
    );
    const wheelHandlers: Array<[Element, EventListener]> = [];
    scrollableNavs.forEach((nav) => {
      const handler = (e: Event) => {
        const we = e as WheelEvent;
        if (Math.abs(we.deltaY) > Math.abs(we.deltaX)) {
          e.preventDefault();
          (nav as HTMLElement).scrollLeft += we.deltaY;
        }
      };
      nav.addEventListener("wheel", handler, { passive: false });
      wheelHandlers.push([nav, handler]);
    });

    return () => {
      container.removeEventListener('click', clickHandler);
      wheelHandlers.forEach(([nav, handler]) => {
        nav.removeEventListener("wheel", handler);
      });
    };
  }, [body, scopeId]);

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
