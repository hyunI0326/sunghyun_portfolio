import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { profile } from '../content';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [active, setActive] = useState('#top');
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = () => { if (media.matches) dialog.current?.close(); };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    dialog.current?.close();
  }

  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <>
      <header className="floating-header">
        <a className="brand" href="/#top" aria-label={`${profile.name}, home`}>
          <span className="brand-mark" aria-hidden="true">s<span>.</span></span>
          <span className="brand-name">Sunghyun<span className="text-muted"> Kim</span></span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.slice(0, 3).map(link => (
            <a key={link.href} href={link.href} className="nav-link" aria-current={active === link.href ? 'location' : undefined}>{link.label}</a>
          ))}
        </nav>
        <a className="button button-small header-cta" href="#contact">Let’s talk <ArrowUpRightIcon size={16} /></a>
        <button className={`menu-toggle md:hidden ${open ? 'menu-open' : ''}`} ref={toggle} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={openMenu}>
          <span /><span />
        </button>
      </header>
      <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label="Navigation menu" onKeyDown={keepFocusInMenu} onClose={() => { setOpen(false); toggle.current?.focus(); }}>
        <div className="flex items-center justify-between">
          <a href="/#top" className="brand" onClick={closeMenu}><span className="brand-mark" aria-hidden="true">s<span>.</span></span><span>Sunghyun Kim</span></a>
          <button className={`menu-toggle ${open ? 'menu-open' : ''}`} aria-label="Close menu" onClick={closeMenu} autoFocus><span /><span /></button>
        </div>
        <nav className="mobile-links" aria-label="Mobile navigation">
          {links.map((link, index) => <a href={link.href} key={link.href} onClick={closeMenu} aria-current={active === link.href ? 'location' : undefined}><span className="text-sm text-muted">0{index + 1}</span>{link.label}<ArrowUpRightIcon size={32} /></a>)}
        </nav>
        <div className="mt-auto flex flex-col gap-4 text-sm text-muted"><span>Based in Seoul, South Korea</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
      </dialog>
    </>
  );
}
