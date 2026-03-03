export interface Project {
  id: string;
  name: { en: string; th: string };
  desc: { en: string; th: string };
  stack: string[];
  github?: string;
  demo?: string;
  status: 'in-progress' | 'completed';
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    name: { en: 'Web Portfolio', th: 'เว็บพอร์ตโฟลิโอ' },
    desc: {
      en: 'Personal portfolio website built with Next.js 14 and Tailwind CSS. Features bilingual support (TH/EN), authentication, and a contact chat system.',
      th: 'เว็บไซต์พอร์ตโฟลิโอส่วนตัวสร้างด้วย Next.js 14 และ Tailwind CSS รองรับ 2 ภาษา (ไทย/อังกฤษ) พร้อมระบบล็อกอินและแชต',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    github: '#',
    demo: '#',
    status: 'in-progress',
  },
  {
    id: 'ecommerce',
    name: { en: 'E-Commerce Platform', th: 'แพลตฟอร์มซื้อขายออนไลน์' },
    desc: {
      en: 'Full-stack e-commerce platform with product management, cart system, payment integration, and admin dashboard.',
      th: 'แพลตฟอร์มซื้อขายออนไลน์ฟูลสแตก มีระบบจัดการสินค้า ตะกร้า ชำระเงิน และแดชบอร์ดผู้ดูแลระบบ',
    },
    stack: ['React', 'Node.js', 'MySQL', 'Ant Design'],
    github: '#',
    demo: '#',
    status: 'completed',
  },
  {
    id: 'api',
    name: { en: 'REST API Service', th: 'REST API Service' },
    desc: {
      en: 'RESTful API backend service with JWT authentication, role-based access control, and Swagger documentation.',
      th: 'บริการ API แบบ RESTful มีระบบยืนยันตัวตนด้วย JWT, การควบคุมสิทธิ์ตามบทบาท และเอกสาร Swagger',
    },
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    github: '#',
    status: 'completed',
  },
  {
    id: 'dashboard',
    name: { en: 'Analytics Dashboard', th: 'แดชบอร์ดวิเคราะห์ข้อมูล' },
    desc: {
      en: 'Data analytics dashboard with real-time charts, data export, and customizable widgets for business intelligence.',
      th: 'แดชบอร์ดวิเคราะห์ข้อมูลพร้อมกราฟแบบ real-time, ส่งออกข้อมูล และวิดเจ็ตที่ปรับแต่งได้',
    },
    stack: ['Vue.js', 'Chart.js', 'Python', 'FastAPI'],
    github: '#',
    demo: '#',
    status: 'in-progress',
  },
];

export const allStacks = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();

export const statusBadge = {
  'in-progress': {
    en: 'In Progress',
    th: 'กำลังพัฒนา',
    cls: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  },
  completed: {
    en: 'Completed',
    th: 'เสร็จสิ้น',
    cls: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  },
};
