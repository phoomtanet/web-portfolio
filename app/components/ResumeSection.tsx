"use client";

import { useState } from 'react';

const content = {
  en: {
    summary: "Motivated Full Stack Developer with 1 year of professional experience and 6 months of internship in developing web and mobile applications. Skilled in both front-end and back-end development, with hands-on expertise in designing and optimizing databases. Capable of independently analyzing requirements, planning solutions, and delivering efficient, scalable applications.",
    sections: {
      skills: "Skills",
      experience: "Work Experience",
      education: "Education",
      projects: "Relevant Projects",
    },
    skills: [
      { label: "Languages", value: "Java, JavaScript, TypeScript, SQL" },
      { label: "Frontend", value: "Next.js, React, React Native, Flutter" },
      { label: "Backend", value: "Node.js, Express.js" },
      { label: "Database", value: "PostgreSQL, SQL Server, MySQL" },
      { label: "Tools & Platforms", value: "GitHub, GitLab, Postman, Docker" },
      { label: "Other", value: "RESTful APIs, Mobile & Web Development, Database Design & Optimization" },
    ],
    experiences: [
      {
        company: "Intelligence System Corporation Co.,LTD",
        role: "Full Stack Developer",
        period: "1 November 2024 – Present",
        bullets: [
          "Developed web applications using Next.js and Node.js.",
          "Built mobile applications using React Native.",
          "Designed and managed databases, wrote SQL queries, and integrated APIs.",
          "Collaborated with the team to plan, analyze, and implement systems.",
        ],
      },
      {
        company: "Intelligence System Corporation Co.,LTD",
        role: "Full Stack Developer (Internship)",
        period: "25 April 2024 – October 2024",
        bullets: [
          "Developed web applications using Next.js and Node.js.",
          "Built mobile applications using React Native.",
          "Designed and managed databases, wrote SQL queries, and integrated APIs.",
          "Collaborated with the team to plan, analyze, and implement systems.",
        ],
      },
      {
        company: "Freelance",
        role: "Full Stack Developer (Flutter, Node.js)",
        period: "",
        bullets: [
          "Developed mobile applications using Flutter and backend with Node.js.",
          "Designed databases and integrated REST APIs.",
          "Handled projects independently from design to deployment.",
        ],
      },
    ],
    education: [
      {
        school: "Rajamangala University of Technology Isan (RMUTI)",
        degree: "Bachelor of Engineering in Computer Engineering",
        period: "2021 – 2024",
        note: "GPA 3.43",
      },
      {
        school: "Surin Technical College",
        degree: "Higher Vocational Certificate in Computer Engineering",
        period: "2018 – 2020",
        note: "",
      },
    ],
    projects: [
      {
        name: "Employee Welfare Management System",
        duration: "1 Month",
        stack: "Next.js, Node.js, MySQL, Ant Design",
        bullets: [
          "Master data management and core system functions",
          "Management of employee affiliations and store assignments",
          "Transaction data handling for accounting department",
          "Employee information management for HR purposes",
        ],
      },
      {
        name: "Repair Management System",
        duration: "4 Months",
        stack: "Flutter, Node.js, MySQL",
        bullets: [
          "Developed back-office and mobile webview applications for a luggage retail store",
          "Mobile (Webview) for cashiers: record customer info, product details, damage reports, and track repair shipments",
          "Back-office: full management of repair data, mirroring mobile functionalities",
          "Dashboard creation and report generation for management",
        ],
      },
      {
        name: "Student Assessment System",
        duration: "4 Months",
        stack: "React Native, Node.js, MySQL",
        bullets: [
          "Developed student-facing mobile application for assessments",
          "Implemented self-assessment, peer assessment, and teacher assessment types",
          "Allowed students to submit assessments to peers and teachers",
          "Enabled teachers to review and monitor student assessment data",
        ],
      },
      {
        name: "Child Care Management System",
        duration: "5 Months",
        stack: "Next.js, Node.js, React Native, MySQL, Ant Design",
        bullets: [
          "Master data management for children, classrooms, and caregivers",
          "Attendance tracking and health record logging",
          "Calculation and management of caregivers' overtime",
          "Reporting and analytics for center management",
        ],
      },
      {
        name: "E-Commerce System",
        duration: "1 Month",
        stack: "Flutter, Node.js, Prisma, PostgreSQL",
        bullets: [
          "Developed mobile application for customers with shipping information management",
          "Product data management",
          "Customer addresses",
          "Review system for both customers and stores",
        ],
      },
    ],
  },
  th: {
    summary: "นักพัฒนา Full Stack ที่มีแรงบันดาลใจสูง มีประสบการณ์การทำงานจริง 1 ปีและฝึกงาน 6 เดือนในการพัฒนาแอปพลิเคชันเว็บและมือถือ มีทักษะทั้งด้าน Front-end และ Back-end พร้อมความเชี่ยวชาญในการออกแบบและปรับปรุงฐานข้อมูล สามารถวิเคราะห์ความต้องการ วางแผนแนวทางแก้ปัญหา และส่งมอบแอปพลิเคชันที่มีประสิทธิภาพและรองรับการขยายตัวได้อย่างอิสระ",
    sections: {
      skills: "ทักษะ",
      experience: "ประสบการณ์ทำงาน",
      education: "การศึกษา",
      projects: "โปรเจกต์ที่เกี่ยวข้อง",
    },
    skills: [
      { label: "ภาษาโปรแกรม", value: "Java, JavaScript, TypeScript, SQL" },
      { label: "Frontend", value: "Next.js, React, React Native, Flutter" },
      { label: "Backend", value: "Node.js, Express.js" },
      { label: "ฐานข้อมูล", value: "PostgreSQL, SQL Server, MySQL" },
      { label: "เครื่องมือและแพลตฟอร์ม", value: "GitHub, GitLab, Postman, Docker" },
      { label: "อื่น ๆ", value: "RESTful APIs, พัฒนาแอปมือถือและเว็บ, การออกแบบและปรับปรุงฐานข้อมูล" },
    ],
    experiences: [
      {
        company: "Intelligence System Corporation Co.,LTD",
        role: "นักพัฒนา Full Stack",
        period: "1 พฤศจิกายน 2567 – ปัจจุบัน",
        bullets: [
          "พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js",
          "พัฒนาแอปพลิเคชันมือถือด้วย React Native",
          "ออกแบบและจัดการฐานข้อมูล เขียน SQL Query และเชื่อมต่อ API",
          "ร่วมกับทีมในการวางแผน วิเคราะห์ และพัฒนาระบบ",
        ],
      },
      {
        company: "Intelligence System Corporation Co.,LTD",
        role: "นักพัฒนา Full Stack (ฝึกงาน)",
        period: "25 เมษายน 2567 – ตุลาคม 2567",
        bullets: [
          "พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js",
          "พัฒนาแอปพลิเคชันมือถือด้วย React Native",
          "ออกแบบและจัดการฐานข้อมูล เขียน SQL Query และเชื่อมต่อ API",
          "ร่วมกับทีมในการวางแผน วิเคราะห์ และพัฒนาระบบ",
        ],
      },
      {
        company: "Freelance",
        role: "นักพัฒนา Full Stack (Flutter, Node.js)",
        period: "",
        bullets: [
          "พัฒนาแอปพลิเคชันมือถือด้วย Flutter และ Backend ด้วย Node.js",
          "ออกแบบฐานข้อมูลและเชื่อมต่อ REST API",
          "ดูแลโปรเจกต์ตั้งแต่การออกแบบจนถึงการ Deploy",
        ],
      },
    ],
    education: [
      {
        school: "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน (RMUTI)",
        degree: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์",
        period: "2564 – 2567",
        note: "เกรดเฉลี่ย 3.43",
      },
      {
        school: "วิทยาลัยเทคนิคสุรินทร์",
        degree: "ประกาศนียบัตรวิชาชีพชั้นสูง สาขาคอมพิวเตอร์",
        period: "2561 – 2563",
        note: "",
      },
    ],
    projects: [
      {
        name: "ระบบสวัสดิการพนักงาน",
        duration: "1 เดือน",
        stack: "Next.js, Node.js, MySQL, Ant Design",
        bullets: [
          "จัดการข้อมูลหลักและฟังก์ชันหลักของระบบ",
          "จัดการความสัมพันธ์พนักงานและการมอบหมายสาขา",
          "จัดการข้อมูลธุรกรรมสำหรับแผนกบัญชี",
          "จัดการข้อมูลพนักงานสำหรับฝ่ายทรัพยากรบุคคล",
        ],
      },
      {
        name: "ระบบจัดการการซ่อม",
        duration: "4 เดือน",
        stack: "Next.js, Node.js, MySQL",
        bullets: [
          "พัฒนาแอปพลิเคชัน Back-office และ Mobile Webview สำหรับร้านค้ากระเป๋า",
          "Mobile สำหรับแคชเชียร์: บันทึกข้อมูลลูกค้า สินค้า รายงานความเสียหาย และติดตามการส่งซ่อม",
          "Back-office: จัดการข้อมูลการซ่อมครบวงจร",
          "สร้าง Dashboard และรายงานสำหรับผู้บริหาร",
        ],
      },
      {
        name: "ระบบประเมินนักเรียน",
        duration: "4 เดือน",
        stack: "React Native, Node.js, MySQL",
        bullets: [
          "พัฒนาแอปพลิเคชันมือถือสำหรับนักเรียนในการทำแบบประเมิน",
          "รองรับการประเมินตนเอง ประเมินเพื่อน และประเมินโดยครู",
          "ให้นักเรียนส่งแบบประเมินถึงเพื่อนและครูได้",
          "ให้ครูตรวจสอบและติดตามผลการประเมินนักเรียน",
        ],
      },
      {
        name: "ระบบจัดการศูนย์เด็กเล็ก",
        duration: "5 เดือน",
        stack: "Next.js, Node.js, React Native, MySQL, Ant Design",
        bullets: [
          "จัดการข้อมูลหลักด้านเด็ก ห้องเรียน และผู้ดูแล",
          "ติดตามการเข้าร่วมและบันทึกสุขภาพ",
          "คำนวณและจัดการค่าล่วงเวลาของผู้ดูแล",
          "รายงานและวิเคราะห์ข้อมูลสำหรับผู้บริหาร",
        ],
      },
      {
        name: "ระบบ E-Commerce (Freelance)",
        duration: "3 เดือน",
        stack: "Flutter, Node.js, Prisma, PostgreSQL",
        bullets: [
          "พัฒนาแอปพลิเคชันมือถือสำหรับลูกค้าพร้อมระบบจัดการข้อมูลการจัดส่ง",
          "จัดการข้อมูลสินค้า",
          "จัดการที่อยู่ลูกค้า",
          "ระบบรีวิวสำหรับลูกค้าและร้านค้า",
        ],
      },
    ],
  },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-bold tracking-wide text-indigo-600">
        {children}
      </h2>
      <div className="mt-2 h-0.5 w-full bg-indigo-200 rounded-full" />
    </div>
  );
}

export default function ResumeSection() {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const t = content[lang];

  return (
    <div className="flex flex-col gap-8 text-left">

      {/* Language Toggle */}
      <div className="flex justify-end">
        <div className="flex overflow-hidden rounded-full border border-indigo-200 text-xs font-semibold">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 transition ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('th')}
            className={`px-4 py-1.5 transition ${lang === 'th' ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
          >
            TH
          </button>
        </div>
      </div>

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
      </div>

      <hr className="border-indigo-100" />

      {/* Skills */}
      <div>
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
      <div>
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
      <div>
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
      <div>
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
  );
}
