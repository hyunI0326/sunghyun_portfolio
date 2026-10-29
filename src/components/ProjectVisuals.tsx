import { ArrowUpRightIcon, BellSimpleIcon, ChartBarIcon, CheckIcon, CodeIcon, CommandIcon } from '@phosphor-icons/react';

export function QuotaPreview({ hero = false }: { hero?: boolean }) {
  return (
    <div className={`quota-preview ${hero ? 'quota-hero' : ''}`} aria-hidden="true">
      <div className="window-chrome"><span className="window-dots"><i /><i /><i /></span><span>Codex Quota</span><CommandIcon size={14} /></div>
      <div className="quota-content">
        <div className="flex items-center gap-3"><span className="app-icon"><CodeIcon size={24} /></span><div><p className="text-base font-semibold">Room to keep building.</p><p className="mt-1 text-xs text-muted">Your usage, at a glance.</p></div></div>
        <div className="quota-metric"><span className="text-xs text-muted">Session remaining</span><span className="text-4xl font-medium tabular-nums">72<span className="text-xl text-muted">%</span></span></div>
        <div className="quota-track"><span className="quota-fill" /></div>
        <div className="mt-4 flex items-center justify-between text-xs"><span className="text-muted">Weekly remaining</span><span>46%</span></div>
        <div className="quota-track mt-2"><span className="quota-fill weekly" /></div>
        <div className="quota-notice"><BellSimpleIcon size={16} /><span>A heads up, before you hit a limit.</span><CheckIcon size={14} /></div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <aside className="hero-visual" aria-label="Codex Quota Alert interface illustration, with sample usage data">
      <div className="visual-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className="code-note" aria-hidden="true"><div className="flex items-center justify-between text-xs text-muted"><span>ideas.ts</span><CodeIcon size={16} /></div><p className="mt-4 text-sm"><span className="text-accent">const</span> idea = {'{'}<br />&nbsp;&nbsp;curiosity: <span className="text-accent">true</span>,<br />&nbsp;&nbsp;purpose: <span className="text-muted">'make it useful'</span><br />{'}'};</p></div>
      <div className="hero-quota-wrap"><QuotaPreview hero /></div>
      <div className="build-note" aria-hidden="true"><span className="build-note-icon"><CheckIcon size={20} /></span><span>From idea to everyday tool.<small>Designed, built, and still improving.</small></span><ArrowUpRightIcon size={20} /></div>
      <span className="visual-caption">A small tool for a real problem <span>↗</span></span>
    </aside>
  );
}

export function DataPreview({ labor = false }: { labor?: boolean }) {
  return (
    <div className={`data-preview ${labor ? 'labor-preview' : ''}`} aria-hidden="true">
      <div className="flex items-center justify-between text-xs text-muted"><span>{labor ? 'Employment patterns' : 'From data to direction'}</span><ChartBarIcon size={20} /></div>
      <div className="chart-title text-lg font-medium">{labor ? 'See the bigger picture.' : 'Find the signal in the noise.'}</div>
      {labor ? <div className="horizontal-chart"><div /><div /><div /><div /><div /></div> : <div className="bar-chart">{Array.from({ length: 14 }, (_, i) => <span key={i} />)}</div>}
      <div className="flex justify-between text-xs text-muted"><span>{labor ? 'People' : 'Explore'}</span><span>{labor ? 'Work' : 'Understand'}</span><span>{labor ? 'Opportunity' : 'Predict'}</span></div>
      <span className="chart-caption">Concept illustration</span>
    </div>
  );
}
