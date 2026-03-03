"use client";

import { Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { useError } from '@/context/ErrorContext';
import { apiLogin, apiRegister } from '@/lib/auth';

interface Props {
  onClose: () => void;
  onSuccess: (username: string, token: string) => void;
  initialTab?: 'login' | 'register';
}

const tx = {
  en: {
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome Back',
    welcomeSub: 'Enter your details to continue',
    createAccount: 'Create Account',
    createSub: 'Fill in the form to get started',
    username: 'Username',
    email: 'Email (optional)',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submitLogin: 'Login',
    submitRegister: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    errorEmpty: 'Please fill in all fields',
    errorMatch: 'Passwords do not match',
    errorShort: 'Password must be at least 6 characters',
    errorGeneric: 'Something went wrong. Please try again.',
    identifier: 'Username or Email',
  },
  th: {
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    welcome: 'ยินดีต้อนรับกลับ',
    welcomeSub: 'กรอกข้อมูลเพื่อเข้าสู่ระบบ',
    createAccount: 'สร้างบัญชีใหม่',
    createSub: 'กรอกข้อมูลเพื่อเริ่มต้นใช้งาน',
    username: 'ชื่อผู้ใช้',
    email: 'อีเมล (ไม่บังคับ)',
    password: 'รหัสผ่าน',
    confirmPassword: 'ยืนยันรหัสผ่าน',
    submitLogin: 'เข้าสู่ระบบ',
    submitRegister: 'สมัครสมาชิก',
    noAccount: 'ยังไม่มีบัญชี?',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    forgotPassword: 'ลืมรหัสผ่าน?',
    errorEmpty: 'กรุณากรอกข้อมูลให้ครบ',
    errorMatch: 'รหัสผ่านไม่ตรงกัน',
    errorShort: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
    errorGeneric: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
    identifier: 'Username หรือ Email',
  },
};

const inputCls =
  'w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition';

const Req = () => <span className="ml-0.5 text-red-500">*</span>;

export default function AuthModal({ onClose, onSuccess, initialTab = 'login' }: Props) {
  const { lang } = useLang();
  const t = tx[lang];
  const { showError } = useError();

  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function switchTab(next: 'login' | 'register') {
    setTab(next);
    setError('');
    setIdentifier('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setShowPwd(false);
    setShowConfirm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (tab === 'login') {
      if (!identifier.trim() || !password.trim()) { setError(t.errorEmpty); return; }
    } else {
      if (!username.trim() || !password.trim()) { setError(t.errorEmpty); return; }
    }

    if (password.length < 6) { setError(t.errorShort); return; }
    if (tab === 'register' && password !== confirm) { setError(t.errorMatch); return; }

    setLoading(true);
    try {
      if (tab === 'login') {
        const res = await apiLogin(identifier.trim(), password);
        onSuccess(res.user.username, res.token);
      } else {
        await apiRegister(username.trim(), password, email.trim() || undefined);
        const res = await apiLogin(username.trim(), password);
        onSuccess(res.user.username, res.token);
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-t-3xl rounded-b-none border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/60 ring-1 ring-indigo-100/60 sm:max-w-md sm:rounded-3xl lg:max-w-lg">

        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.10) 0%, transparent 45%), radial-gradient(circle at 80% 0%, rgba(56,189,248,0.10) 0%, transparent 40%)' }} />

        <button onClick={onClose} disabled={loading} className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-40">
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-5 sm:p-8 lg:p-10">
          <div className="mb-5 flex gap-1 rounded-xl bg-slate-100 p-1">
            <button onClick={() => switchTab('login')} disabled={loading} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${tab === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t.login}</button>
            <button onClick={() => switchTab('register')} disabled={loading} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${tab === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{t.register}</button>
          </div>

          <div className="mb-4 space-y-1 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-600">{tab === 'login' ? 'Welcome Back' : 'Get Started'}</p>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl lg:text-3xl">{tab === 'login' ? t.welcome : t.createAccount}</h2>
            <p className="text-sm text-slate-500">{tab === 'login' ? t.welcomeSub : t.createSub}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'login' ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t.identifier}</label>
                <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="username / email" disabled={loading} className={inputCls} />
              </div>
            ) : (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.username}<Req />
                  </label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" disabled={loading} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t.email}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" disabled={loading} className={inputCls} />
                </div>
              </>
            )}

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {t.password}{tab === 'register' && <Req />}
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className={inputCls}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            {tab === 'register' && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t.confirmPassword}<Req />
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {tab === 'login' && (
              <div className="text-right">
                <span className="cursor-pointer text-xs text-indigo-500 hover:text-indigo-600">{t.forgotPassword}</span>
              </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button type="submit" disabled={loading} className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/70 transition hover:opacity-90 disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {tab === 'login' ? t.submitLogin : t.submitRegister}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {tab === 'login' ? t.noAccount : t.hasAccount}{' '}
            <button onClick={() => switchTab(tab === 'login' ? 'register' : 'login')} disabled={loading} className="font-semibold text-indigo-600 transition hover:text-indigo-500">
              {tab === 'login' ? t.register : t.login}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
