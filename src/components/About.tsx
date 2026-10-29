import { ArrowDownRightIcon, ArrowUpRightIcon, BracketsCurlyIcon, ChartLineUpIcon, CubeIcon } from '@phosphor-icons/react';
import { experience, profile } from '../content';
import { Reveal } from './Reveal';

const benefits = [
  { icon: CubeIcon, title: 'Built for the everyday.', description: 'Useful software starts with a real friction point. I like small tools that make the next task a little easier.' },
  { icon: ChartLineUpIcon, title: 'Grounded in the data.', description: 'Explore first, make assumptions visible, and let evidence guide the next technical decision.' },
  { icon: BracketsCurlyIcon, title: 'Clear enough to build on.', description: 'Readable code and shared understanding matter as much as getting the first version working.' },
];

export function Approach() {
  return (
    <section id="approach" className="section approach-section shell" aria-labelledby="approach-title">
      <Reveal className="approach-intro"><p className="eyebrow mb-4">The way I work</p><h2 id="approach-title" className="section-title">Technology is the tool.<br />People are the point.</h2><p className="mt-6 max-w-xl text-base text-muted">There’s a gap between a promising idea and something useful. I enjoy working through the details that close it.</p></Reveal>
      <div className="benefits-grid">{benefits.map(({ icon: Icon, title, description }) => <Reveal key={title}><article className="benefit"><Icon size={28} weight="light" className="text-accent" /><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-4 text-sm text-muted">{description}</p></article></Reveal>)}</div>
      <Reveal className="process"><p className="eyebrow">From question to something useful</p><ol className="process-grid">{[
        ['01', 'Understand the problem', 'Ask who it’s for, what gets in the way, and what a useful first version would look like.'],
        ['02', 'Build the smallest useful thing', 'Connect the right tools and get an idea into a form that can be tried and discussed.'],
        ['03', 'Check, learn, improve', 'Test the behavior, look at the evidence, and make the next version better.'],
      ].map(([number, title, description]) => <li key={number}><span className="process-number">{number}<ArrowDownRightIcon size={20} /></span><h3 className="mt-4 text-lg font-medium">{title}</h3><p className="mt-3 text-sm text-muted">{description}</p></li>)}</ol></Reveal>
    </section>
  );
}

export default function About() {
  return (
    <section id="about" className="section about-section shell" aria-labelledby="about-title">
      <Reveal className="about-layout">
        <div className="about-identity"><p className="eyebrow mb-8">02 / A little about me</p><div className="profile-art"><img className="profile-photo" src="/sunghyun-beach.jpeg" alt="Sunghyun Kim standing on a beach by the sea" width={768} height={1024} loading="lazy" decoding="async" /><span className="profile-art-label">Curiosity is a good place to start.</span><span className="profile-art-footer"><span className="status-dot" />Seoul, South Korea <span>37.56° N</span></span></div></div>
        <div className="about-copy"><h2 id="about-title" className="section-title">A curious mind.<br />A builder at heart.</h2><p className="mt-6 text-base text-muted">I’m Sunghyun Kim, studying Human Centered Artificial Intelligence at Sangmyung University. I’m drawn to the space where understanding a problem turns into building a solution.</p><p className="mt-4 text-base text-muted">My work spans machine learning, data analysis, backend development, and native developer tools. Outside the editor, I organize academic activities and mentor students in algorithms. Building with people keeps me learning.</p><div className="about-facts"><div><span className="text-3xl font-medium tabular-nums">4.28<span className="text-base text-muted"> / 4.5</span></span><span className="mt-2 text-xs text-muted">Cumulative GPA</span></div><div><span className="text-3xl font-medium">AI + CS</span><span className="mt-2 text-xs text-muted">Learning through building</span></div></div><a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-link mt-8">Connect on LinkedIn <ArrowUpRightIcon size={18} /></a></div>
      </Reveal>
      <Reveal className="stack-section"><div><p className="eyebrow mb-3">Tools of the trade</p><h3 className="text-2xl font-medium">A practical stack.<br />Always room to learn.</h3></div><div className="stack-groups"><div className="stack-row"><span className="text-xs text-muted">Languages</span><div>{['Python', 'Java', 'C', 'SQL'].map(skill => <span className="stack-tag" key={skill}>{skill}</span>)}</div></div><div className="stack-row"><span className="text-xs text-muted">Applied work</span><div>{['Machine learning', 'Pandas', 'SwiftUI', 'Backend', 'Git & GitHub'].map(skill => <span className="stack-tag" key={skill}>{skill}</span>)}</div></div><div className="stack-row"><span className="text-xs text-muted">Learning</span><div>{['SQLD · 2025', 'ADsP · 2026', 'NHN Cloud training', 'LG Aimers 9th'].map(skill => <span className="stack-tag" key={skill}>{skill}</span>)}</div></div></div></Reveal>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience-section shell" aria-labelledby="experience-title"><Reveal className="experience-intro"><p className="eyebrow mb-4">03 / Experience & community</p><h2 id="experience-title" className="section-title">Better, together.</h2><p className="mt-6 max-w-sm text-base text-muted">Some of the best things I’ve learned came from helping someone else figure it out.</p><span className="mt-8 inline-block text-xs text-muted">Activity start dates</span></Reveal><div className="experience-list">{experience.map(item => <Reveal key={item.name}><article className="experience-item"><time className="text-xs text-muted">{item.date}</time><div><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-2xl font-medium">{item.name}</h3><span className="text-xs text-muted">{item.detail}</span></div><p className="mt-4 text-sm text-muted">{item.description}</p></div></article></Reveal>)}</div></section>
  );
}
