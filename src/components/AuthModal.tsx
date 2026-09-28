import React, { useState } from 'react';
import { X, UserCheck, Lock, Mail, User } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  if (!isOpen) return null;

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (isSignUp ? 'New User' : email.split('@')[0] || 'Valued Shopper');
    onLogin({
      name: finalName,
      email: email.trim() || 'shopper@smartshop.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Signed In</h3>
              <p className="text-sm font-semibold text-slate-700 mt-1">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {isSignUp ? 'Create your SmartShop Account' : 'Welcome back to SmartShop'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp ? 'Sign up to track orders and save your favorites' : 'Sign in to access your previous orders & preferences'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Varshita Adari"
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
