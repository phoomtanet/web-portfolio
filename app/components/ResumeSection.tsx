"use client";

import { useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import translations from '../i18n/translations';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 print:break-after-avoid">
      <h2 className="text-base font-bold tracking-wide text-indigo-600">
        {children}
      </h2>
      <div className="mt-2 h-0.5 w-full bg-indigo-200 rounded-full" />
    </div>
  );
}

const PDF_PATH = '/file/transcrip-phoomtanet.pdf';

export default function ResumeSection() {
  const { lang } = useLang();
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].resume;

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * pageW) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      let y = 0;
      let remaining = imgH;
      pdf.addImage(imgData, 'JPEG', 0, y, imgW, imgH);
      remaining -= pageH;

      while (remaining > 0) {
        y -= pageH;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, y, imgW, imgH);
        remaining -= pageH;
      }

      pdf.save('resume-phoomtanet.pdf');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
    <div ref={contentRef} className="flex flex-col gap-8 text-left">

      {/* Hero */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Phoomtanet Intayung
          </span>
        </h1>
        <p className="mt-1 text-lg font-medium text-indigo-500">Full Stack Developer</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
          <span>📞 0653324270</span>
          <span>✉️ phoomtanet.in@gmail.com</span>
        </div>
        <p className="mt-4 leading-relaxed text-slate-600">{t.summary}</p>

        {/* PDF Actions */}
        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {t.pdf.preview}
          </button>
          <a
            href={PDF_PATH}
            download="transcript-phoomtanet.pdf"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t.pdf.download}
          </a>
          {/* <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {lang === 'th' ? 'พิมพ์ / บันทึก PDF' : 'Print / Save PDF'}
          </button> */}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Skills */}
      <div className="print:break-inside-avoid">
        <SectionTitle>{t.sections.skills}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.skills.map((s) => (
            <div key={s.label} className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">{s.label}</p>
              <p className="mt-1 text-sm text-slate-600">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Work Experience */}
      <div className="print:break-inside-avoid">
        <SectionTitle>{t.sections.experience}</SectionTitle>
        <div className="flex flex-col gap-6">
          {t.experiences.map((exp, i) => (
            <div key={i} className="border-l-2 border-indigo-300 pl-5">
              <p className="font-semibold text-slate-800">{exp.company}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                <span className="text-sm text-indigo-600">{exp.role}</span>
                {exp.period && (
                  <span className="text-xs text-slate-400">• {exp.period}</span>
                )}
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Education */}
      <div className="print:break-inside-avoid">
        <SectionTitle>{t.sections.education}</SectionTitle>
        <div className="flex flex-col gap-4">
          {t.education.map((edu, i) => (
            <div key={i} className="border-l-2 border-cyan-300 pl-5">
              <p className="font-semibold text-slate-800">{edu.school}</p>
              <p className="text-sm text-slate-600">{edu.degree}</p>
              <div className="mt-0.5 flex gap-3 text-xs text-slate-400">
                <span>{edu.period}</span>
                {edu.note && <span className="font-medium text-cyan-600">{edu.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Projects */}
      <div className="print:break-inside-avoid">
        <SectionTitle>{t.sections.projects}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.projects.map((proj, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 shadow-sm">
              <div>
                <p className="font-semibold text-slate-800">{proj.name}</p>
                <p className="text-xs text-slate-400">{proj.duration}</p>
              </div>
              <p className="inline-flex w-fit rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
                {proj.stack}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {proj.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm print:hidden">
          <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <p className="font-semibold text-slate-800">{t.pdf.modalTitle}</p>
              <div className="flex items-center gap-2">
                <a
                  href={PDF_PATH}
                  download="transcript-phoomtanet.pdf"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t.pdf.downloadBtn}
                </a>
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  ✕ {t.pdf.closeBtn}
                </button>
              </div>
            </div>
            <iframe
              src={PDF_PATH}
              className="h-[80vh] w-full"
              title="Transcript PDF"
            />
          </div>
        </div>
      )}
    </>
  );
}
