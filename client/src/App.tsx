import { useState } from 'react';
import DesktopRegister from './pages/auth/DesktopSignup';
import DesktopSignin from './pages/auth/DesktopLogin';
import EmailVerificationPage from './pages/auth/EmailVerPage';
import WelcomeMessage from './pages/auth/WelcomePage';

function App() {
  const [page, setPage] = useState<'register' | 'signin' | 'verify' | 'welcome'>('signin');

  return (
    <div>
      {page === 'register' && <DesktopRegister />}
      {page === 'signin' && <DesktopSignin />}
      {page === 'verify' && <EmailVerificationPage />}
      {page === 'welcome' && <WelcomeMessage />}
      
      {/* Example buttons to switch pages */}
      <div className="mt-4 flex gap-2">
        <button onClick={() => setPage('register')}>Register</button>
        <button onClick={() => setPage('signin')}>Sign In</button>
        <button onClick={() => setPage('verify')}>Verify Email</button>
        <button onClick={() => setPage('welcome')}>Welcome</button>
      </div>
    </div>
  );
}

export default App;
