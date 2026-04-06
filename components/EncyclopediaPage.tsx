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
      
      // 1. Top tabs
      const tab = target.closest('.top-tab, .tab') as HTMLElement;
      if (tab && container.contains(tab)) {
        e.preventDefault(); // Stop anchor jump
        container.querySelectorAll('.top-tab, .tab').forEach(x => x.classList.remove('active'));
        tab.classList.add('active');
        
        const targetId = tab.dataset.t;
        container.querySelectorAll('.tech-section, .tech, .ts').forEach(x => x.classList.remove('active'));
        
        if (targetId) {
          const sectionTarget = container.querySelector(`#ts-${targetId}`) || container.querySelector(`#${targetId}`);
          if (sectionTarget) {
            sectionTarget.classList.add('active');
            const firstSubNav = sectionTarget.querySelector('.snav.active, .sn.active') as HTMLElement;
            if (firstSubNav) firstSubNav.click(); // This will trigger delegation below recursively or directly
          }
        }
      }

      // 2. Nav buttons (main nav)
      const navBtn = target.closest('.nav-btn:not(.tab):not(.top-tab)') as HTMLElement;
      if (navBtn && container.contains(navBtn)) {
        e.preventDefault();
        container.querySelectorAll('.nav-btn').forEach(x => x.classList.remove('active'));
        container.querySelectorAll('.section').forEach(x => x.classList.remove('active'));
        navBtn.classList.add('active');
        const sTarget = container.querySelector(`#${navBtn.dataset.s}`);
        if (sTarget) sTarget.classList.add('active');
        const nav = navBtn.closest('.nav, .sub-nav') as HTMLElement;
        if (nav) window.scrollTo({ top: nav.offsetTop, behavior: 'smooth' });
      }

      // 3. Sub Nav
      const subNav = target.closest('.snav, .sn') as HTMLElement;
      if (subNav && container.contains(subNav)) {
        e.preventDefault();
        const navContainer = subNav.closest('.sub-nav, nav');
        if (navContainer) {
          navContainer.querySelectorAll('.snav, .sn').forEach(x => x.classList.remove('active'));
        }
        subNav.classList.add('active');
        
        const sectionId = subNav.dataset.s;
        if (sectionId) {
          const parent = subNav.closest('.tech-section, .ts') || container;
          parent.querySelectorAll('.sc, .section').forEach((x: Element) => {
            if (x.id && x.closest('.tech-section, .ts') === subNav.closest('.tech-section, .ts')) {
              x.classList.remove('active');
            }
          });
          const targetSection = parent.querySelector(`#${sectionId}`);
          if (targetSection) targetSection.classList.add('active');
        }
        const nav = subNav.closest('.nav, .sub-nav') as HTMLElement;
        if (nav) window.scrollTo({ top: nav.offsetTop, behavior: 'smooth' });
      }

      // 4. Q&A toggle
      const qaH = target.closest('.qa-h, .qh') as HTMLElement;
      if (qaH && container.contains(qaH)) {
        const qa = qaH.closest('.qa');
        if (qa) qa.classList.toggle('open');
      }

      // 5. Filters
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
    container.querySelectorAll('.counter, .ct').forEach((el) => {
      const section = el.closest('.section, .sc, .tech, .ts, .tech-section') || container;
      const total = section.querySelectorAll('.qa').length;
      const b = el.querySelector('b');
      if (b && total > 0) b.textContent = String(total);
    });

    // Auto trigger tab
    let tabTargetId = null;
    if (scopeId === 'system-design') tabTargetId = 't-fsd';
    else if (scopeId === 'ui-ux') tabTargetId = 't-ux';
    else if (scopeId === 'html-css') tabTargetId = 't-html';
    
    if (tabTargetId) {
       setTimeout(() => { // slight delay for paint guarantees
           const tabEl = container.querySelector(`.tab[data-t="${tabTargetId}"], .top-tab[data-t="${tabTargetId}"]`) as HTMLElement;
           if (tabEl && !tabEl.classList.contains('active')) {
             tabEl.click();
           }
       }, 50);
    }

    const scrollableNavs = container.querySelectorAll(
      ".nav, .nav-inner, .sub-nav, .sub-nav-inner, .sni, .top-tabs, .tabs"
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
