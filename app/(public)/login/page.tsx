"use client";

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useError } from '@/context/ErrorContext';
import { apiLogin } from '@/lib/auth';
import { AuthModal } from '@/components';

const inputCls =
  'w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition';

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { showError } = useError();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError('');

    if (!identifier.trim() || !password.trim()) {
      setValidationError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    setLoading(true);
    try {
      const res = await apiLogin(identifier.trim(), password);
      setSession(res.user.username, res.token);
      router.push('/home');
    } catch (err) {
      showError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-8 lg:px-10 text-slate-900">
      <section className="grid w-full gap-6 lg:grid-cols-[1.05fr_1fr]">

        {/* Left — info card */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-8 shadow-xl shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.12),transparent_35%)]" aria-hidden />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="max-w-xl space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">ยินดีต้อนรับ</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                  Portfolio Phoomtanet Intayung (Porsche)
                </span>
              </h1>
              <p className="text-base text-slate-600">
                เลือกวิธีเข้าใช้งานได้เลย ทั้งสมัครสมาชิก ล็อคอิน หรือเข้าแบบ Guest เพื่อสำรวจเว็บไซต์อย่างรวดเร็ว
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                เข้าถึงรวดเร็ว ปลอดภัย
              </div>
              <div className="flex items-center gap-3 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-cyan-500" aria-hidden />
                รองรับ Guest และสมาชิก
              </div>
            </div>
          </div>
        </div>

        {/* Right — login card */}
        <div className="relative rounded-3xl border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          <div className="space-y-6">
            <header className="space-y-2 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-600">Welcome Back</p>
              <h2 className="text-3xl font-semibold text-slate-900">เข้าสู่ระบบ</h2>
              <p className="text-sm text-slate-500">กรอก Username หรือ Email และรหัสผ่าน</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="identifier">
                  Username หรือ Email
                </label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="username / email"
                  disabled={loading}
                  className={inputCls}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className={`${inputCls} pr-10`}
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

              <div className="flex items-center justify-between text-sm text-slate-500">
                <span className="cursor-pointer text-indigo-600 transition hover:text-indigo-500">
                  ลืมรหัสผ่าน?
                </span>
                <Link href="/home" className="text-indigo-600 transition hover:text-indigo-500">
                  เข้าแบบ Guest
                </Link>
              </div>

              {validationError && <p className="text-xs text-red-500">{validationError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/70 transition hover:opacity-90 disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
              <span>ยังไม่มีบัญชี?</span>
              <button
                onClick={() => setShowRegister(true)}
                className="font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </div>

      </section>

      {showRegister && (
        <AuthModal
          initialTab="register"
          onClose={() => setShowRegister(false)}
          onSuccess={(name, token) => {
            setSession(name, token);
            router.push('/home');
          }}
        />
      )}
    </main>
  );
}
