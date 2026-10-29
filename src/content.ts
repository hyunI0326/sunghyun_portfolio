export const profile = {
  name: 'Sunghyun Kim',
  email: 'hyunhyun0326@gmail.com',
  github: 'https://github.com/hyunI0326',
  linkedin: 'https://www.linkedin.com/in/hyuni03',
};

export const projects = [
  {
    id: 'quota',
    number: '01',
    category: 'Developer tooling',
    name: 'Codex Quota Alert',
    description: 'A little less checking. A lot more building. A macOS menu bar app that keeps usage limits and reset alerts in view, without a separate API key.',
    tags: ['SwiftUI', 'Python', 'macOS'],
    url: `${profile.github}/quota-bar`,
    kind: 'quota',
  },
  {
    id: 'prediction',
    number: '02',
    category: 'Machine learning · DACON',
    name: 'Understanding student retention',
    description: 'Finding the signals behind student completion, with exploratory analysis and structured data modeling.',
    tags: ['Python', 'Pandas', 'Machine learning'],
    url: `${profile.github}/Daycon_BDA`,
    kind: 'data',
  },
  {
    id: 'labor',
    number: '03',
    category: 'Public data · Research',
    name: 'Making labor data readable',
    description: 'Turning public employment datasets into visual stories about demographics and the changing labor market.',
    tags: ['Python', 'Public data', 'Visualization'],
    url: profile.github,
    kind: 'labor',
  },
] as const;

export const experience = [
  { date: 'Sep 2026', name: 'GDGoC', detail: 'Sangmyung University · Member', description: 'Learning and building alongside a community of student developers.' },
  { date: 'Mar 2026', name: 'BAMBOO', detail: 'Planning team', description: 'Helping organize academic seminars, workshops, internal events, and hackathons.' },
  { date: 'Sep 2025', name: 'INYRO', detail: 'Mentor & study leader', description: 'Sharing algorithms and data structures through weekly challenges and code reviews.' },
  { date: 'Sep 2025', name: 'Momentum', detail: 'Community operations', description: 'Supporting member management, participation tracking, and cohort operations.' },
];

export const faqs = [
  { question: 'What kind of work do you focus on?', answer: 'My interests sit across backend development, applied AI, and data analysis. I enjoy taking a concrete problem from exploration to software that someone can use.' },
  { question: 'Which technologies do you work with?', answer: 'Python and Java are my core programming languages. My projects also use SQL, Pandas, machine learning tools, and SwiftUI for native macOS interfaces.' },
  { question: 'Can I see the code behind these projects?', answer: 'Yes. The project links lead to public repositories or my GitHub profile. The repository section also loads recent public work directly from GitHub.' },
  { question: 'How do you approach collaboration?', answer: 'I start by understanding the problem and agreeing on a small, useful first step. I value clear technical explanations, code reviews, and sharing what I learn along the way.' },
  { question: 'What is the best way to get in touch?', answer: 'Email is the best place to start. Share a little context about your project or opportunity. The contact form prepares an email draft in your own mail app, with no commitment required.' },
  { question: 'Does this website store my information?', answer: 'The contact form does not send information to a website server or save it in the browser. Recent repositories are requested from the public GitHub API. This site uses no analytics or tracking cookies.' },
];
