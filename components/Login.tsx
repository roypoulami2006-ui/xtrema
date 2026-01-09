
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from './Logo';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('email');
    // Simulate a brief network delay for realism
    setTimeout(() => {
      setIsLoading(null);
      onLogin();
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    // Simulate OAuth handshake delay
    setTimeout(() => {
      setIsLoading(null);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-12">
          <Logo className="w-32 h-32" textSize="text-5xl" />
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="relative">
            <input 
              type="email" 
              required
              disabled={!!isLoading}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-[#A3E635]/60 disabled:opacity-50"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input 
              type="password" 
              required
              disabled={!!isLoading}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-[#A3E635]/60 disabled:opacity-50"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={!!isLoading}
            className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading === 'email' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log in'}
          </button>
        </form>

        <div className="w-full mt-6 space-y-3">
          <button 
            onClick={() => handleSocialLogin('google')}
            disabled={!!isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                <span className="text-sm font-medium text-slate-600">Sign in with Google</span>
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center py-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">or</span>
          </div>

          <button 
            onClick={() => handleSocialLogin('facebook')}
            disabled={!!isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading === 'facebook' ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5 h-5" alt="Facebook" />
                <span className="text-sm font-medium text-slate-600">Sign in with Facebook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
