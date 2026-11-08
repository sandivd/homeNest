import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Heart, Loader2, LockKeyhole, Mail, MapPin, UserRound } from 'lucide-react';
import type { User } from '../zillowWebsiteOpus4';
import PropertyImage from './property-image';
import '../auth.css';

type AuthProps = {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (user: Omit<User, 'passwordHash'>, password: string) => Promise<void>;
  onClose: () => void;
};

export default function AuthPage({ onSignIn, onSignUp, onClose }: AuthProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function changeMode(signIn: boolean) {
    setIsSignIn(signIn);
    setError('');
    setShowPassword(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (!isSignIn && (!name.trim() || !city.trim())) {
      setError('Enter your name and city.');
      return;
    }
    setBusy(true);
    try {
      if (isSignIn) await onSignIn(email.trim(), password);
      else await onSignUp({ email: email.trim(), name: name.trim(), city: city.trim(), phone: '', role: 'Just Browsing', targetCity: '', minPrice: '', maxPrice: '' }, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <main className="auth-page">
    <div className="auth-topline"><button type="button" onClick={onClose}><ArrowLeft size={16} /> Back to exploring</button><span>A PLACE FOR YOUR NEXT CHAPTER</span></div>
    <div className="auth-layout">
      <aside className="auth-story" aria-label="Make room for what comes next">
        <PropertyImage className="auth-story-photo" src="https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1600" alt="A sunlit home opening onto a garden" />
        <div className="auth-story-shade" />
        <div className="auth-story-top"><span className="auth-story-dot" /> A MORE PERSONAL WAY HOME</div>
        <div className="auth-story-copy"><span className="auth-story-number">01 / THE POSSIBILITIES</span><h2>Somewhere new.<br /><em>Something yours.</em></h2><p>A front door. A favorite corner. A place that just feels right. Keep the possibilities close.</p><div className="auth-story-rule" /><div className="auth-story-bottom"><span>Find it. Love it. Make it home.</span><ArrowRight size={22} /></div></div>
        <div className="auth-floating-note"><span><Heart size={18} /></span><div><strong>A little closer to home.</strong><small>Your favorites, in one place.</small></div></div>
      </aside>

      <section className="auth-form-panel" aria-labelledby="auth-title">
        <div className="auth-mode-switch" role="group" aria-label="Choose sign in or create account">
          <button type="button" className={isSignIn ? 'auth-mode-active' : ''} aria-pressed={isSignIn} disabled={busy} onClick={() => changeMode(true)}>Sign in</button>
          <button type="button" className={!isSignIn ? 'auth-mode-active' : ''} aria-pressed={!isSignIn} disabled={busy} onClick={() => changeMode(false)}>Create account</button>
        </div>
        <div className="auth-form-heading"><p className="auth-eyebrow">{isSignIn ? 'MAKE YOURSELF AT HOME' : 'A FRESH START, A FAMILIAR FEELING'}</p><h1 id="auth-title">{isSignIn ? <>Welcome <em>back.</em></> : <>Make room for<br /><em>what’s next.</em></>}</h1><p>{isSignIn ? 'The homes you love are worth coming back to.' : 'A place to save your favorites and picture your next chapter.'}</p></div>

        <form className="auth-form" onSubmit={handleSubmit} aria-busy={busy}>
          {!isSignIn && <div className="auth-field-row">
            <div className="auth-field"><label htmlFor="auth-name">Your name</label><div className="auth-input-wrap"><UserRound size={18} /><input id="auth-name" name="name" autoComplete="name" placeholder="First and last name" value={name} onChange={e => setName(e.target.value)} required disabled={busy} /></div></div>
            <div className="auth-field"><label htmlFor="auth-city">Your city</label><div className="auth-input-wrap"><MapPin size={18} /><input id="auth-city" name="city" autoComplete="address-level2" placeholder="Where you call home" value={city} onChange={e => setCity(e.target.value)} required disabled={busy} /></div></div>
          </div>}
          <div className="auth-field"><label htmlFor="auth-email">Email address</label><div className="auth-input-wrap"><Mail size={18} /><input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={busy} /></div></div>
          <div className="auth-field"><label htmlFor="auth-password">Password</label><div className="auth-input-wrap"><LockKeyhole size={18} /><input id="auth-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignIn ? 'current-password' : 'new-password'} placeholder={isSignIn ? 'Enter your password' : 'Choose a password'} value={password} onChange={e => setPassword(e.target.value)} required disabled={busy} /><button type="button" className="auth-password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} disabled={busy}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" className="auth-submit" disabled={busy}><span>{busy ? (isSignIn ? 'Signing you in…' : 'Creating your account…') : isSignIn ? 'Welcome home' : 'Create your account'}</span>{busy ? <Loader2 className="auth-spinner" size={19} /> : <ArrowRight size={19} />}</button>
        </form>
        <p className="auth-switch-prompt">{isSignIn ? 'New around here?' : 'Already feel at home?'} <button type="button" disabled={busy} onClick={() => changeMode(!isSignIn)}>{isSignIn ? 'Make yourself at home' : 'Sign in instead'} <ArrowRight size={13} /></button></p>
        <div className="auth-form-foot"><span><Check size={14} /> A little less searching. A little more finding.</span><p>Demo accounts are saved in this browser. Use a password you don’t use elsewhere.</p></div>
      </section>
    </div>
    <div className="auth-page-foot"><span>HomeNest. For the life you’re making.</span><span>THOUGHTFULLY FOUND. PERSONALLY YOURS.</span></div>
  </main>;
}
