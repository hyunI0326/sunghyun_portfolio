const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.11 });
revealItems.forEach((item) => observer.observe(item));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

const terminalPhrases = [
  'python model.py --iterate',
  'git push origin build',
  'java -jar ideas-into-products.jar',
  'swift run CodexQuota',
];
const terminalText = document.querySelector('#terminal-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeTerminal() {
  if (!terminalText) return;
  const phrase = terminalPhrases[phraseIndex];
  terminalText.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(typeTerminal, 46);
  } else if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(typeTerminal, 1300);
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeTerminal, 24);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % terminalPhrases.length;
    setTimeout(typeTerminal, 320);
  }
}
typeTerminal();

const fallbackRepos = [
  { name: 'Japan_travel_map', description: 'Web project for a Japan travel experience.', language: 'TypeScript', url: 'https://github.com/hyunI0326/Japan_travel_map' },
  { name: 'bigdata_analysis', description: 'Big-data analysis practice and project work.', language: 'Jupyter Notebook', url: 'https://github.com/hyunI0326/bigdata_analysis' },
  { name: 'dacon_voice', description: 'DACON voice-related project repository.', language: 'Python', url: 'https://github.com/hyunI0326/dacon_voice' },
];

function renderRepos(repos, live = true) {
  const grid = document.querySelector('#repo-grid');
  const status = document.querySelector('#repo-status');
  if (!grid) return;

  grid.innerHTML = repos.slice(0, 3).map(repo => `
    <a class="repo-card" href="${repo.url || repo.html_url}" target="_blank" rel="noreferrer">
      <div class="repo-name">${repo.name}</div>
      <div class="repo-desc">${repo.description || 'Public GitHub repository — explore the code and project history.'}</div>
      <div class="repo-bottom">
        <span class="repo-lang">${repo.language || 'Repository'}</span>
        <span>↗</span>
      </div>
    </a>
  `).join('');

  if (status) status.textContent = live ? 'Synced from GitHub' : 'GitHub fallback';
}

fetch('https://api.github.com/users/hyunI0326/repos?sort=updated&per_page=20')
  .then(response => {
    if (!response.ok) throw new Error('GitHub API unavailable');
    return response.json();
  })
  .then(repos => {
    const excluded = new Set(['hyunI0326', 'quota-bar', 'Daycon_BDA']);
    const filtered = repos.filter(repo => !repo.fork && !excluded.has(repo.name));
    renderRepos(filtered.length >= 3 ? filtered : repos, true);
  })
  .catch(() => renderRepos(fallbackRepos, false));
