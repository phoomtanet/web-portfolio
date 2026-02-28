"use client";

import Link from 'next/link';
import { useState } from 'react';
import TopNav from '../components/TopNav';

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <TopNav />

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 text-slate-900 sm:py-12">
        <div className="mb-6" />
        <section className="w-full rounded-3xl border border-indigo-100 bg-white p-8 text-center shadow-lg shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />
          <h1 className="text-3xl font-semibold sm:text-4xl">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              ยินดีต้อนรับสู่หน้า Home
            </span>
          </h1>
          <p className="mt-3 text-slate-600">โหมด Guest ถูกพามาที่หน้านี้เรียบร้อย คุณสามารถปรับเนื้อหาได้ตามต้องการ</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-700">
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 font-medium text-indigo-700 shadow-sm">โหมด Guest</span>
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 font-medium text-cyan-700 shadow-sm">สำรวจผลงาน</span>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/70 transition hover:shadow-indigo-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              เริ่มต้นใช้งาน
            </button>
          </div>
        </section>
      </main>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800/70 bg-slate-950/95 p-6 shadow-2xl shadow-indigo-950/30">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Welcome back</p>
                <h3 className="text-2xl font-semibold text-slate-50">เข้าสู่ระบบ</h3>
              </div>
              <button
                onClick={() => setShowLogin(false)}
                className="rounded-full border border-slate-800/70 px-2 py-1 text-slate-400 transition hover:border-slate-600 hover:text-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="email">อีเมล</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200" htmlFor="password">รหัสผ่าน</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <Link href="/forgot" className="text-cyan-300 transition hover:text-cyan-200">ลืมรหัสผ่าน?</Link>
                <Link href="/signup" className="text-indigo-300 transition hover:text-indigo-200">สมัครสมาชิก</Link>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:shadow-indigo-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                เข้าสู่ระบบ
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="w-full rounded-xl border border-slate-800/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:text-slate-100"
              >
                ปิดหน้าต่าง
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
