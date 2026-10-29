import { useState, type FormEvent } from 'react';
import { ArrowUpRightIcon, CheckIcon, CopyIcon, EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { faqs, profile } from '../content';
import { Reveal } from './Reveal';

export function FAQ() {
  return <section className="section faq-section shell" aria-labelledby="faq-title"><Reveal><p className="eyebrow mb-4">A few things you might wonder</p><h2 id="faq-title" className="section-title">Good questions.</h2></Reveal><div className="faq-grid">{faqs.map(faq => <Reveal key={faq.question}><article className="faq-item"><h3 className="text-base font-semibold">{faq.question}</h3><p className="mt-4 text-sm text-muted">{faq.answer}</p></article></Reveal>)}</div></section>;
}

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function Contact() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [draftReady, setDraftReady] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const next: FormErrors = {};
    if (!name) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email address.';
    if (!message) next.message = 'Please share a little about your project or opportunity.';
    setErrors(next);
    setDraftReady(false);
    const firstInvalid = (['name', 'email', 'message'] as const).find(field => next[field]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Let’s talk — ${name.replace(/[\r\n]/g, ' ')}`);
    const body = encodeURIComponent(`Hi Sunghyun,\n\n${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDraftReady(true);
  }

  return (
    <section id="contact" className="section contact-section shell" aria-labelledby="contact-title">
      <Reveal className="contact-layout"><div><p className="eyebrow mb-6 flex items-center gap-3"><span className="status-dot" />04 / Start a conversation</p><h2 id="contact-title" className="contact-title text-5xl md:text-6xl">Something<br />on your mind<span className="text-accent">?</span></h2><p className="mt-6 max-w-sm text-base text-muted">An interesting problem, a collaboration, or just a good conversation. I’d like to hear about it.</p><div className="contact-email"><a href={`mailto:${profile.email}`} className="text-link break-all">{profile.email}<ArrowUpRightIcon size={18} className="shrink-0" /></a><button onClick={copyEmail} className="icon-button" aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'}>{copyState === 'copied' ? <CheckIcon size={18} /> : <CopyIcon size={18} />}</button></div><p className="mt-2 text-xs text-muted" role="status">{copyState === 'copied' ? 'Email address copied.' : copyState === 'error' ? 'Couldn’t copy. Select the email address above to copy it manually.' : 'A conversation, with no commitment.'}</p><div className="mt-8 flex gap-4"><a className="social-link" href={profile.github} target="_blank" rel="noreferrer"><GithubLogoIcon size={20} />GitHub<ArrowUpRightIcon size={14} /></a><a className="social-link" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinLogoIcon size={20} />LinkedIn<ArrowUpRightIcon size={14} /></a></div></div>
      <form className="contact-form" onSubmit={submit} noValidate><div className="form-pair"><label>Your name<input name="name" type="text" autoComplete="name" placeholder="SungHyun Kim" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} onChange={() => { setErrors(previous => ({ ...previous, name: undefined })); setDraftReady(false); }} />{errors.name ? <span className="field-error" id="name-error">{errors.name}</span> : null}</label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="your@example.com" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} onChange={() => { setErrors(previous => ({ ...previous, email: undefined })); setDraftReady(false); }} />{errors.email ? <span className="field-error" id="email-error">{errors.email}</span> : null}</label></div><label>What are you thinking about?<textarea name="message" rows={4} placeholder="Tell me a little about your project or opportunity…" required maxLength={1800} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} onChange={() => { setErrors(previous => ({ ...previous, message: undefined })); setDraftReady(false); }} />{errors.message ? <span className="field-error" id="message-error">{errors.message}</span> : null}</label><div className="flex flex-wrap items-center justify-between gap-4"><span className="flex items-center gap-2 text-xs text-muted"><EnvelopeSimpleIcon size={16} />Opens a draft in your email app</span><button className="button" type="submit">Let’s talk <ArrowUpRightIcon size={20} /></button></div><p className="text-sm text-accent" role="status">{draftReady ? 'Your draft is ready. Review and send it in your email app. If no app opened, use the email address beside this form.' : ''}</p></form></Reveal>
    </section>
  );
}
