import { useEffect, useRef, type ReactNode } from 'react';

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.08 });
    node.classList.add('reveal-ready');
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove('reveal-ready');
    };
  }, []);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Tagline() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const words = Array.from(node.querySelectorAll<HTMLElement>('[data-word]'));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let complete = false;
    const update = () => {
      frame = 0;
      if (complete) return;
      if (media.matches) {
        words.forEach(word => word.classList.add('word-visible'));
        complete = true;
        return;
      }
      const bounds = node.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const distance = Math.max(window.innerHeight * 0.4, bounds.height);
      const progress = Math.min(1, Math.max(0, (start - bounds.top) / distance));
      words.forEach((word, index) => {
        if (progress >= (index + 1) / words.length) word.classList.add('word-visible');
      });
      complete = progress >= 1;
    };
    const schedule = () => { if (!frame && !complete) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section ref={ref} className="tagline-section shell" aria-labelledby="tagline-title">
      <p className="eyebrow mb-8">The reason I build</p>
      <h2 id="tagline-title" className="tagline text-4xl md:text-6xl" aria-label="Good technology starts with people. And ends with something useful.">
        {['Good technology starts with people.', 'And ends with something useful.'].map(line => (
          <span className="tagline-line" key={line} aria-hidden="true">
            {line.split(' ').map((word, index) => <span data-word key={`${word}-${index}`}>{word}{' '}</span>)}
          </span>
        ))}
      </h2>
    </section>
  );
}
