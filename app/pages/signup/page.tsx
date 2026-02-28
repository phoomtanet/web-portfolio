import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">สมัครสมาชิก</p>
        <h1 className="text-4xl font-semibold text-slate-100 sm:text-5xl">สร้างบัญชีใหม่</h1>
        <p className="text-slate-300 sm:w-3/4">
          กรอกข้อมูลเพื่อเริ่มใช้งาน หรือกลับไปล็อคอิน/เข้าแบบ Guest ได้ทุกเมื่อ
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                ชื่อ-นามสกุล
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="เช่น สมชาย ใจดี"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                อีเมล
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="อย่างน้อย 8 ตัวอักษร"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400"
            >
              สร้างบัญชี
            </button>
          </div>
        </form>

        <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-6 shadow-inner shadow-black/20 backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-100">มีบัญชีอยู่แล้ว?</h2>
          <p className="text-sm text-slate-300">ไปที่หน้าล็อคอินหรือเข้าแบบ Guest ได้เลย</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <Link
              href="/login"
              className="flex-1 rounded-full border border-slate-800 px-4 py-2.5 text-center text-sm font-medium text-slate-100 transition hover:border-indigo-400 hover:text-indigo-200"
            >
              ล็อคอิน
            </Link>
            <Link
              href="/guest"
              className="flex-1 rounded-full border border-transparent bg-slate-800/70 px-4 py-2.5 text-center text-sm font-medium text-slate-100 transition hover:bg-slate-700"
            >
              เข้าแบบ Guest
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
