import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, ArrowClockwiseIcon, CodeIcon, GithubLogoIcon, GitBranchIcon } from '@phosphor-icons/react';
import { profile, projects } from '../content';
import { DataPreview, QuotaPreview } from './ProjectVisuals';
import { Reveal } from './Reveal';

type Repository = { name: string; description: string; language: string; url: string };
type RepositoryState = { status: 'loading' } | { status: 'error' } | { status: 'success'; repositories: Repository[] };

export function Repositories() {
  const [state, setState] = useState<RepositoryState>({ status: 'loading' });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    setState({ status: 'loading' });

    async function load() {
      try {
        const response = await fetch('https://api.github.com/users/hyunI0326/repos?sort=updated&per_page=20', { signal: controller.signal });
        if (!response.ok) throw new Error('GitHub request failed');
        const body: unknown = await response.json();
        if (!Array.isArray(body)) throw new Error('Unexpected GitHub response');
        const repositories: Repository[] = [];
        for (const entry of body) {
          if (!entry || typeof entry !== 'object' || entry.fork || typeof entry.name !== 'string' || typeof entry.html_url !== 'string' || !entry.html_url.startsWith(`${profile.github}/`)) continue;
          if (['hyunI0326', 'quota-bar', 'Daycon_BDA'].includes(entry.name)) continue;
          repositories.push({ name: entry.name, url: entry.html_url, description: typeof entry.description === 'string' ? entry.description : 'Explore the code, decisions, and project history on GitHub.', language: typeof entry.language === 'string' ? entry.language : 'Repository' });
          if (repositories.length === 3) break;
        }
        if (active) setState({ status: 'success', repositories });
      } catch {
        if (active) setState({ status: 'error' });
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => { active = false; controller.abort(); clearTimeout(timeout); };
  }, [retry]);

  return (
    <div className="repository-section">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h3 className="flex items-center gap-3 text-lg font-medium"><GitBranchIcon size={20} className="text-accent" />Also on my workbench</h3><span className="flex items-center gap-2 text-xs text-muted"><span className="status-dot small" />Public work on GitHub</span></div>
      <div aria-live="polite" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' ? <><span className="sr-only">Loading recent repositories.</span><div className="repository-grid">{[0, 1, 2].map(i => <div className="repo-card skeleton" key={i} aria-hidden="true"><span className="skeleton-title" /><span /><span /><span className="skeleton-bottom" /></div>)}</div></> : null}
        {state.status === 'error' ? <div className="repo-message"><CodeIcon size={28} className="text-accent shrink-0" /><div><p className="font-medium">The code is still there. GitHub isn’t responding.</p><p className="mt-2 text-sm text-muted">Recent repositories couldn’t load. Try again or visit my profile directly.</p></div><button className="text-link shrink-0" onClick={() => setRetry(count => count + 1)}><ArrowClockwiseIcon size={16} />Try again</button><a className="text-link shrink-0" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRightIcon size={16} /></a></div> : null}
        {state.status === 'success' && state.repositories.length === 0 ? <div className="repo-message"><GithubLogoIcon size={28} className="text-accent shrink-0" /><div><p className="font-medium">The next idea starts here.</p><p className="mt-2 text-sm text-muted">No additional public repositories to show yet.</p></div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRightIcon size={16} /></a></div> : null}
        {state.status === 'success' && state.repositories.length > 0 ? <div className="repository-grid">{state.repositories.map(repo => <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="repo-card"><div className="flex items-center justify-between gap-4"><h4 className="text-base font-medium">{repo.name.replaceAll('_', ' ').replaceAll('-', ' ')}</h4><ArrowUpRightIcon size={18} className="shrink-0 text-muted" /></div><p className="my-4 text-sm text-muted">{repo.description}</p><span className="mt-auto flex items-center gap-2 text-xs text-muted"><span className="language-dot" />{repo.language}</span></a>)}</div> : null}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section shell" aria-labelledby="work-title">
      <Reveal className="section-heading"><div><p className="eyebrow mb-4">01 / Selected work</p><h2 id="work-title" className="section-title">Ideas are a start.<br />Here’s what I built.</h2></div><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer" className="text-link">All repositories <ArrowUpRightIcon size={18} /></a></Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => <Reveal key={project.id} className={index === 0 ? 'featured-project' : ''}><article className={`project project-${project.kind}`}>
          <a href={project.url} target="_blank" rel="noreferrer" className="project-image" aria-label={`${project.name}, ${project.kind === 'labor' ? 'open GitHub profile' : 'view repository'}`}>
            <span className="project-number">/{project.number}</span>
            {project.kind === 'quota' ? <><span className="quota-backdrop-label" aria-hidden="true">Less checking.<br />More creating.</span><div className="project-quota-wrap"><QuotaPreview /></div></> : <DataPreview labor={project.kind === 'labor'} />}
            <span className="preview-label">{project.kind === 'quota' ? 'Interface preview · Sample data' : 'Data exploration'}</span><span className="project-arrow"><ArrowUpRightIcon size={24} /></span>
          </a>
          <div className="project-copy"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted">{project.category}</p><div className="flex gap-2">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div><h3 className="mt-4 text-2xl font-medium md:text-3xl"><a href={project.url} target="_blank" rel="noreferrer">{project.name} <ArrowRightIcon size={22} className="project-title-arrow" /></a></h3><p className="mt-4 max-w-2xl text-sm text-muted md:text-base">{project.description}</p></div>
        </article></Reveal>)}
      </div>
      <Reveal><Repositories /></Reveal>
    </section>
  );
}
