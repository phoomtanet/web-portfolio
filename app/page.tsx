import Link from 'next/link';

export default function Home() {

  
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-8 lg:px-10 text-slate-900">
      <section className="grid w-full gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Left info card */}
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
              <p className="text-base text-slate-600">เลือกวิธีเข้าใช้งานได้เลย ทั้งสมัครสมาชิก ล็อคอิน หรือเข้าแบบ Guest เพื่อสำรวจเว็บไซต์อย่างรวดเร็ว</p>
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

        {/* Right login card */}
        <div className="relative rounded-3xl border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-200/60 ring-1 ring-indigo-100/60">
          <div className="space-y-6">
            <header className="space-y-2 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-600">Welcome Back</p>
              <h2 className="text-3xl font-semibold text-slate-900">เข้าสู่ระบบ</h2>
              <p className="text-sm text-slate-500">กรอกอีเมลและรหัสผ่านเพื่อดำเนินการต่อ</p>
            </header>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">อีเมล</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">รหัสผ่าน</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <Link href="/forgot" className="text-indigo-600 transition hover:text-indigo-500">ลืมรหัสผ่าน?</Link>
                <span className="text-slate-400">หรือ</span>
                <Link href="/guest" className="text-indigo-600 transition hover:text-indigo-500">เข้าแบบ Guest</Link>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/70 transition hover:shadow-indigo-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
              <span>ยังไม่มีบัญชี?</span>
              <Link href="/signup" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
