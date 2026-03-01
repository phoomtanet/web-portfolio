export default function BorderBox({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full rounded-3xl border border-indigo-100 bg-white p-8 shadow-lg shadow-indigo-200/60 ring-1 ring-indigo-100/60">
      {children}
    </section>
  );
}
