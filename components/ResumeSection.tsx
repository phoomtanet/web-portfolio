"use client";

import {
  Briefcase,
  Code2,
  Database,
  Download,
  Eye,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  Monitor,
  Phone,
  Server,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useLang } from '@/i18n/LangContext';
import translations from '@/i18n/translations';

const skillIcons: Record<string, React.ReactNode> = {
  // EN keys
  Languages:          <Code2 className="h-4 w-4" />,
  Frontend:           <Monitor className="h-4 w-4" />,
  Backend:            <Server className="h-4 w-4" />,
  Database:           <Database className="h-4 w-4" />,
  'Tools & Platforms': <Wrench className="h-4 w-4" />,
  'AI Tools':         <Sparkles className="h-4 w-4" />,
  Other:              <Layers className="h-4 w-4" />,
  // TH keys
  'ภาษาโปรแกรม':        <Code2 className="h-4 w-4" />,
  'หน้าบ้าน':            <Monitor className="h-4 w-4" />,
  'หลังบ้าน':            <Server className="h-4 w-4" />,
  'ฐานข้อมูล':           <Database className="h-4 w-4" />,
  'เครื่องมือและแพลตฟอร์ม': <Wrench className="h-4 w-4" />,
  'เครื่องมือ AI':       <Sparkles className="h-4 w-4" />,
  'อื่น ๆ':              <Layers className="h-4 w-4" />,
};

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-5 print:break-after-avoid">
      <h2 className="flex items-center gap-2 text-base font-bold tracking-wide text-indigo-600">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          {icon}
        </span>
        {children}
      </h2>
      <div className="mt-2 h-0.5 w-full rounded-full bg-indigo-200" />
    </div>
  );
}

const PDF_PATH = '/file/transcrip_phoomtanet_intayung.pdf';
const EN_RESUME_PATH = '/file/resume_phoomtanet_intayung_en.pdf';

export default function ResumeSection() {
  const { lang } = useLang();
  const [showPreview, setShowPreview] = useState(false);
  const [showEnResume, setShowEnResume] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].resume;


  return (
    <>
    <div ref={contentRef} className="flex flex-col gap-8 text-left">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 sm:p-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Photo */}
          <div className="sm:order-last">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 blur transition-all duration-300 group-hover:opacity-75 group-hover:scale-105" />
              <img
                src="/images/my-profile2.png"
                alt="Phoomtanet Intayung"
                className="relative mx-auto h-36 w-36 shrink-0 rounded-full border-4 border-indigo-100 object-cover shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl sm:mx-0"
              />
            </div>
          </div>
          {/* Text side */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 animate-fade-in-up">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 hover:from-purple-600 hover:via-cyan-500 hover:to-indigo-600">
                Phoomtanet Intayung
              </span>
            </h1>
            <p className="mt-1 text-lg font-semibold text-indigo-500">Full Stack Developer</p>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-indigo-400" />
                0653324270
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                phoomtanet.in@gmail.com
              </span>
            </div>

            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">{t.summary}</p>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3 print:hidden">
              <button
                onClick={() => setShowPreview(true)}
                className="group relative flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition-all duration-300 hover:bg-indigo-50 hover:shadow-md hover:-translate-y-0.5"
              >
                <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {t.pdf.preview}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-cyan-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setShowEnResume(true)}
                className="group relative flex items-center gap-2 rounded-xl border border-cyan-200 bg-white px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm transition-all duration-300 hover:bg-cyan-50 hover:shadow-md hover:-translate-y-0.5"
              >
                <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {t.pdf.enResume}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-indigo-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="print:break-inside-avoid">
        <SectionTitle icon={<Code2 className="h-4 w-4" />}>{t.sections.skills}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.skills.map((s, index) => (
            <div 
              key={s.label} 
              className="group flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/80 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-200">
                {skillIcons[s.label] ?? <Layers className="h-4 w-4" />}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-indigo-600 transition-colors duration-300 group-hover:text-indigo-700">{s.label}</p>
                <p className="mt-0.5 text-sm text-slate-800">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Work Experience */}
      <div className="print:break-inside-avoid">
        <SectionTitle icon={<Briefcase className="h-4 w-4" />}>{t.sections.experience}</SectionTitle>
        <div className="flex flex-col gap-6">
          {t.experiences.map((exp, i) => (
            <div key={i} className="group relative border-l-2 border-indigo-200 pl-5 transition-all duration-300 hover:border-indigo-300">
              <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-300 to-indigo-200 shadow shadow-indigo-200/50 transition-all duration-300 group-hover:scale-125 group-hover:shadow-indigo-300/50" />
              <p className="font-semibold text-slate-800 transition-colors duration-300 group-hover:text-indigo-700">{exp.company}</p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                            <p className="inline-flex w-fit rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">

                  {exp.role}
                </p>
                {exp.period && (
                  <span className="text-xs text-slate-400">{exp.period}</span>
                )}
              </div>
              <ul className="mt-2 space-y-1 pl-1 text-sm text-slate-600">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 group/bullet transition-all duration-300 hover:translate-x-1">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300 transition-all duration-300 group-hover/bullet:scale-150 group-hover/bullet:bg-indigo-400" />
                    <span className="transition-colors duration-300 group-hover:text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Education */}
      <div className="print:break-inside-avoid">
        <SectionTitle icon={<GraduationCap className="h-4 w-4" />}>{t.sections.education}</SectionTitle>
        <div className="flex flex-col gap-4">
          {t.education.map((edu, i) => (
            <div key={i} className="group relative border-l-2 border-indigo-200 pl-5 transition-all duration-300 hover:border-indigo-300">
              <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-300 to-indigo-200 shadow shadow-indigo-200/50 transition-all duration-300 group-hover:scale-125 group-hover:shadow-indigo-300/50" />
              <p className="font-semibold text-slate-800 transition-colors duration-300 group-hover:text-indigo-700">{edu.school}</p>
              <p className="text-sm text-slate-600">{edu.degree}</p>
              <div className="mt-0.5 flex gap-3 text-xs text-slate-400">
                <span>{edu.period}</span>
                {edu.note && (
                  <span className="font-medium text-indigo-500">
                    {edu.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-indigo-100" />

      {/* Projects */}
      <div className="print:break-inside-avoid">
        <SectionTitle icon={<FolderGit2 className="h-4 w-4" />}>{t.sections.projects}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.projects.map((proj, i) => (
            <div 
              key={i} 
              className="group flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-2 hover:scale-[1.02]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="font-semibold text-slate-800 transition-colors duration-300 group-hover:text-indigo-700">{proj.name}</p>
                {proj.duration && <p className="text-xs text-slate-400">{proj.duration}</p>}
              </div>
              <p className="inline-flex w-fit rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 transition-all duration-300 group-hover:bg-indigo-200 group-hover:ring-indigo-300">
                {proj.stack}
              </p>
              <ul className="space-y-1 pl-1 text-sm text-slate-600">
                {proj.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 group/bullet transition-all duration-300 hover:translate-x-1">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300 transition-all duration-300 group-hover/bullet:scale-150 group-hover/bullet:bg-indigo-400" />
                    <span className="transition-colors duration-300 group-hover:text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>

      {/* EN Resume Modal */}
      {showEnResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm print:hidden">
          <div className="flex w-full max-w-4xl max-h-[95vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-5 py-3">
              <p className="font-semibold text-slate-800 text-sm sm:text-base">EN Resume</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEnResume(false)}
                  className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={EN_RESUME_PATH}
                className="h-full w-full min-h-[60vh] sm:h-[80vh]"
                title="EN Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm print:hidden">
          <div className="flex w-full max-w-4xl max-h-[95vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-5 py-3">
              <p className="font-semibold text-slate-800 text-sm sm:text-base">{t.pdf.modalTitle}</p>
              <div className="flex items-center gap-2">
                <a
                  href={PDF_PATH}
                  download="transcript-phoomtanet.pdf"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.pdf.downloadBtn}</span>
                  <span className="sm:hidden">DL</span>
                </a>
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  ✕ <span className="hidden sm:inline ml-1">{t.pdf.closeBtn}</span>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={PDF_PATH}
                className="h-full w-full min-h-[60vh] sm:h-[80vh]"
                title="Transcript PDF"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
