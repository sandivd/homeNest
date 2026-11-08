import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthPage, ProfilePage, MortgagePage, User } from './zillowWebsiteOpus4';
import HomeSearchExperience from './components/home-search-experience';
import { PremiumHeader } from './components/premium-header';
import { getHomes } from './data/listings';
import './App.css';
import './premium.css';
import './theme.css';
const buyHomes = getHomes('buy');
const rentHomes = getHomes('rent');

function AppContent() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const headerProps = { user, theme, toggleTheme: () => setTheme(theme === "light" ? "dark" : "light") };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('zillow_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [location.pathname]);

  const hashPassword = async (password: string) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSignUp = async (newUser: Omit<User, 'passwordHash'>, password: string) => {
    if (users.some(u => u.email === newUser.email)) {
      throw new Error('User already exists');
    }
    const passwordHash = await hashPassword(password);
    const userWithHash = { ...newUser, passwordHash };
    const updatedUsers = [...users, userWithHash];
    setUsers(updatedUsers);
    localStorage.setItem('zillow_users', JSON.stringify(updatedUsers));
    setUser(userWithHash);
    navigate('/');
  };

  const handleSignIn = async (email: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const foundUser = users.find(u => u.email === email && u.passwordHash === passwordHash);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    setUser(foundUser);
    navigate('/');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('zillow_users', JSON.stringify(updatedUsers));
    setUser(updatedUser);
  };

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className={`App ${theme}`} data-theme={theme}>
      {!["/buy", "/rent", "/"].includes(location.pathname) && <PremiumHeader {...headerProps} />}
      <Routes>
        <Route path="/" element={<Navigate to="/buy" replace />} />
        <Route path="/buy" element={<HomeSearchExperience key="buy" homes={buyHomes} {...headerProps} />} />
        <Route path="/rent" element={<HomeSearchExperience key="rent" homes={rentHomes} {...headerProps} />} />
        <Route path="/mortgage" element={<div className="legacy-page"><MortgagePage /></div>} />
        <Route
          path="/signin"
          element={
            user ? <Navigate to="/" replace /> :
              <AuthPage
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                onClose={() => navigate('/')}
              />
          }
        />
        <Route
          path="/profile"
          element={
            user ?
              <ProfilePage
                user={user}
                onUpdateProfile={handleUpdateProfile}
                onSignOut={handleSignOut}
              /> :
              <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
