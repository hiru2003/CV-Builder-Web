'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        onSuccess();
        onClose();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // If email confirmation is disabled, user is logged in automatically (session exists)
        if (data.session) {
          onSuccess();
          onClose();
        } else {
          // If email confirmation is enabled, display a friendly success instruction
          setSignupSuccess(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800">
            {signupSuccess ? 'Check your email' : 'Save and Download your CV'}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            {signupSuccess
              ? 'We have sent a verification link to your email address.'
              : 'Sign up or log in to secure your CV data in the cloud and unlock the high-quality PDF download.'}
          </DialogDescription>
        </DialogHeader>

        {signupSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <p className="font-semibold text-slate-700 mb-2">Confirmation Link Sent!</p>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              Please click the link in the email sent to <strong className="text-slate-800">{email}</strong> to verify your account and trigger the download.
            </p>
            <Button
              onClick={() => {
                setSignupSuccess(false);
                onClose();
              }}
              className="w-full bg-[#00A3FF] hover:bg-[#008AE6] text-white font-semibold py-2 rounded-xl transition-all"
            >
              Okay, I understand
            </Button>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* Custom Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setError(null);
                }}
                className={`flex-1 py-2 text-sm font-bold text-center rounded-lg transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white text-[#00A3FF] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setError(null);
                }}
                className={`flex-1 py-2 text-sm font-bold text-center rounded-lg transition-all ${
                  activeTab === 'signin'
                    ? 'bg-white text-[#00A3FF] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Mail size={18} />
                  </span>
                  <Input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 mt-6 bg-gradient-to-r from-[#00A3FF] to-[#007BFF] hover:from-[#008AE6] hover:to-[#0069D9] disabled:from-blue-300 disabled:to-blue-400 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : activeTab === 'signup' ? (
                  'Create Account & Download'
                ) : (
                  'Sign In & Download'
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-slate-400 mt-2">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
