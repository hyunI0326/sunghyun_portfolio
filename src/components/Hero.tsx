import { ArrowDownIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { HeroVisual } from './ProjectVisuals';
import { Reveal } from './Reveal';
import { profile } from '../content';

export default function Hero() {
  return (
    <section id="top" className="hero shell" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <p className="eyebrow flex items-center gap-3"><span className="status-dot" />Backend · AI · Data</p>
        <h1 id="hero-title" className="hero-title">Thoughtful code.<br />Useful products<span className="hero-period">.</span></h1>
        <p className="hero-description text-base md:text-lg">I’m Sunghyun, a developer turning curiosity into software people can use. Connecting backend engineering, AI, and data, one practical idea at a time.</p>
        <div className="mt-8 flex items-center gap-6"><a href="#contact" className="button">Let’s talk <ArrowUpRightIcon size={20} /></a><span className="text-xs text-muted">A conversation is a good start.</span></div>
        <div className="hero-proof"><span className="proof-mark" aria-hidden="true">s<span>m</span>u</span><span>Human centered AI<br /><strong>Sangmyung University</strong></span></div>
      </Reveal>
      <Reveal className="hero-art"><HeroVisual /></Reveal>
      <div className="hero-footnote"><a href="#work" className="scroll-link"><ArrowDownIcon size={16} /><span>A selection of things I’ve built</span></a><a href={profile.github} target="_blank" rel="noreferrer" className="hero-github" aria-label="Sunghyun Kim on GitHub"><GithubLogoIcon size={18} /><span>Built with curiosity. Shared on GitHub.</span><ArrowUpRightIcon size={16} /></a></div>
    </section>
  );
}
