import { useEffect } from 'react';
import { ArrowUpIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import Hero from './components/Hero';
import Work from './components/Work';
import About, { Approach, Experience } from './components/About';
import Contact, { FAQ } from './components/Contact';
import Navigation from './components/Navigation';
import { Tagline } from './components/Reveal';
import { profile } from './content';

function Footer() {
  return <footer className="footer shell"><a href="/#top" className="footer-brand">Sunghyun Kim<span className="text-accent">.</span></a><span className="text-xs text-muted">© {new Date().getFullYear()} · Made with thought and a little curiosity.</span><nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs text-muted"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/#top" className="flex items-center gap-2">Back to top <ArrowUpIcon size={14} /></a></nav></footer>;
}

function InformationPage({ type }: { type: 'privacy' | 'terms' | '404' }) {
  const title = type === 'privacy' ? 'Your privacy matters.' : type === 'terms' ? 'A few simple terms.' : 'A little off the path.';
  useEffect(() => {
    document.title = `${type === '404' ? 'Page not found' : type === 'privacy' ? 'Privacy' : 'Terms'} | Sunghyun Kim`;
    if (type === '404') document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow');
  }, [type]);
  return <main id="main-content" className="info-page shell" tabIndex={-1}><a className="brand" href="/"><span className="brand-mark">s<span>.</span></span><span>Sunghyun Kim</span></a><div className="info-content"><p className="eyebrow mb-6">{type === '404' ? '404 / Page not found' : 'About this website'}</p><h1 className="text-4xl font-medium md:text-6xl">{title}</h1>{type === '404' ? <p className="mt-8 text-lg text-muted">That page isn’t here. There’s still plenty to explore back at the portfolio.</p> : type === 'privacy' ? <div className="legal-copy"><p>This personal portfolio does not use analytics, advertising trackers, tracking cookies, or browser storage.</p><h2>Contact form</h2><p>Your name, email address, and message stay in the current page until you choose “Let’s talk.” That action prepares a mailto link for your email app. The website does not transmit your form to a server or automatically send an email. Your email provider’s privacy terms apply if you send the draft.</p><h2>Public GitHub data</h2><p>The repository section requests public project information from api.github.com. GitHub receives standard network information, including your IP address. External links open services with their own privacy policies. Fonts and interface artwork are served with this website.</p><h2>Questions</h2><p>Contact <a href={`mailto:${profile.email}`}>{profile.email}</a> with questions about this website.</p></div> : <div className="legal-copy"><p>This website presents Sunghyun Kim’s personal projects, interests, and academic activities for informational purposes.</p><h2>Project information</h2><p>Project descriptions reflect the work represented in this portfolio. Interface illustrations use sample data and do not represent live usage or measured project results. Public repository information is provided by GitHub and may change.</p><h2>Code and third party services</h2><p>Each linked repository has its own licensing terms. Review its license before reusing code. GitHub, LinkedIn, and email providers operate independently of this website.</p><h2>Starting a conversation</h2><p>Sending an inquiry does not create a service agreement or guarantee availability. Any project scope, timeline, and terms must be agreed separately.</p><h2>Questions</h2><p>Email <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p></div>}<a href="/" className="button mt-8">Back to the portfolio <ArrowUpRightIcon size={20} /></a></div></main>;
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const isHome = pathname === '/' || pathname === '/index.html';
  return <><a className="skip-link" href="#main-content">Skip to content</a>{isHome ? <><Navigation /><main id="main-content" tabIndex={-1}><Hero /><Work /><Approach /><About /><Experience /><Tagline /><FAQ /><Contact /></main></> : <InformationPage type={pathname === '/privacy' ? 'privacy' : pathname === '/terms' ? 'terms' : '404'} />}<Footer /></>;
}
