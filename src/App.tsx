import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RealEstateListings, { NavBar, AuthPage, ProfilePage, MortgagePage, User } from './zillowWebsiteOpus4';
import './App.css';
import './index.css';

function AppContent() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
    <div className={`App ${theme}`}>
      <NavBar user={user} theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Navigate to="/buy" replace />} />
        <Route path="/buy" element={<RealEstateListings listingType="buy" />} />
        <Route path="/rent" element={<RealEstateListings listingType="rent" />} />
        <Route path="/mortgage" element={<MortgagePage />} />
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
    <BrowserRouter basename="/homeNest">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
