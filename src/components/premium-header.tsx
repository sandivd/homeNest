import Brand from './brand';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import type { User } from '../zillowWebsiteOpus4';
import Icon from './icons';
export type HeaderProps = { user: User | null; theme: string; toggleTheme: () => void };
export function PremiumHeader({ user, theme, toggleTheme, savedCount = 0, showSavedOnly = false, onToggleSaved }: HeaderProps & { savedCount?: number; showSavedOnly?: boolean; onToggleSaved?: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner">
    <NavLink to="/buy" className="brand-lockup" aria-label="HomeNest home"><Brand /></NavLink>
    <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
      {['Buy', 'Rent', 'Mortgage'].map(label => <NavLink key={label} to={'/' + label.toLowerCase()} className={({isActive}) => isActive ? 'nav-active' : ''} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <NavLink to={user ? '/profile' : '/signin'} onClick={() => setOpen(false)}>{user ? user.name : 'Sign in'}</NavLink>
    </nav>
    <div className="header-actions">{onToggleSaved && <button type="button" className={`saved-homes-action ${showSavedOnly ? 'saved-action-active' : ''}`} onClick={onToggleSaved} aria-pressed={showSavedOnly}><Icon name="heart" size={18} /><span>Saved</span>{savedCount > 0 && <span className="saved-count">{savedCount}</span>}</button>}
      <button type="button" className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
    </div>
    <button type="button" className="mobile-menu-button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </div></header>;
}
