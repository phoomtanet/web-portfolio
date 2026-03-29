import type { Lang } from './LangContext';

const translations = {
  en: {
    nav: {
      info: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    resume: {
      summary:
        'Motivated Full Stack Developer with 1 year of professional experience and 6 months of internship in developing web and mobile applications. Skilled in both front-end and back-end development, with hands-on expertise in designing and optimizing databases. Capable of independently analyzing requirements, planning solutions, and delivering efficient, scalable applications.',
      sections: {
        skills: 'Skills',
        experience: 'Work Experience',
        education: 'Education',
        projects: 'Relevant Projects',
      },
      skills: [
        { label: 'Languages', value: 'Java, JavaScript, TypeScript, SQL' },
        { label: 'Frontend', value: 'Next.js, React, React Native, Flutter' },
        { label: 'Backend', value: 'Node.js, Express.js' },
        { label: 'Database', value: 'PostgreSQL, SQL Server, MySQL' },
        { label: 'Tools & Platforms', value: 'GitHub, GitLab, Postman, Docker' },
        { label: 'AI Tools', value: 'ChatGPT, Claude Code, Windsurf' },
        {
          label: 'Other',
          value: 'RESTful APIs, Mobile & Web Development, Database Design & Optimization',
        },
      ],
      experiences: [
        {
          company: 'Intelligence System Corporation Co., Ltd.',
          role: 'Full Stack Developer',
          period: 'Nov 2024 – Mar 2026 (1 year 5 months)',
          bullets: [
            'Developed and maintained scalable web applications using Next.js and Node.js',
            'Built cross-platform mobile applications using React Native',
            'Designed relational database schemas, optimized SQL queries, and integrated RESTful APIs',
            'Collaborated with cross-functional teams to analyze requirements and deliver system features',
          ],
        },
        {
          company: 'Intelligence System Corporation Co., Ltd.',
          role: 'Full Stack Developer (Intern)',
          period: 'Apr 2024 – Oct 2024 (6 months)',
          bullets: [
            'Assisted in developing web applications using Next.js and Node.js',
            'Supported mobile application development using React Native',
            'Worked with databases, wrote SQL queries, and integrated APIs',
            'Participated in system design discussions and development planning',
          ],
        },
        {
          company: 'Freelance',
          role: 'Full Stack Developer (Flutter, Node.js)',
          period: '2024 (3 months)',
          bullets: [
            'Developed mobile applications using Flutter and backend services with Node.js',
            'Designed database structures and implemented RESTful APIs for application functionality',
            'Delivered end-to-end solutions independently, from system design to deployment',
          ],
        },
      ],
      education: [
        {
          school: 'Rajamangala University of Technology Isan (RMUTI)',
          degree: 'Bachelor of Engineering in Computer Engineering',
          period: '2021 – 2024',
          note: 'GPA 3.43',
        },
        {
          school: 'Surin Technical College',
          degree: 'Higher Vocational Certificate in Computer Engineering',
          period: '2018 – 2020',
          note: 'GPA 3.15',
        },
      ],
   projects: [
  {
    name: 'Employee Welfare Management System',
    duration: '1 เดือน',
    stack: 'Next.js, Node.js, MySQL',
    bullets: [
      'พัฒนาระบบสวัสดิการพนักงาน (Admin, HR, Accounting) พร้อม RBAC และ RESTful APIs',
      'ออกแบบโครงสร้างฐานข้อมูลให้รองรับการขยายตัว (Scalable) และจัดการข้อมูลอย่างมีประสิทธิภาพ',
      'ลดระยะเวลาการทำงานแบบ Manual ลงประมาณ 40% ด้วยระบบ Workflow อัตโนมัติ',
      'เพิ่มความถูกต้องของข้อมูลและลดข้อผิดพลาดด้วยระบบศูนย์กลาง (Centralized System)',
    ],
  },
  {
    name: 'Repair Management System',
    duration: '4 เดือน',
    stack: 'Mobile Webview, Node.js, MySQL',
    bullets: [
      'พัฒนาระบบจัดการงานซ่อม (Mobile Webview + Back-office) สำหรับติดตามสถานะงาน',
      'ออกแบบ Dashboard และรายงานสำหรับติดตามผลแบบ Real-time',
      'ลดระยะเวลาในการติดตามงานซ่อมลงประมาณ 30% ด้วยระบบ Workflow แบบรวมศูนย์',
      'เพิ่มความชัดเจนในการมองเห็นข้อมูล (Visibility) เพื่อช่วยในการตัดสินใจได้รวดเร็วขึ้น',
    ],
  },
  {
    name: 'Student Assessment System',
    duration: '6 เดือน',
    stack: 'React Native, Node.js, MySQL',
    bullets: [
      'พัฒนาระบบประเมินผลพร้อม Dashboard และรายงานเชิงวิเคราะห์ (Analytics)',
      'รองรับการประเมินหลายรูปแบบ (Self, Peer, Teacher) พร้อมระบบติดตามการส่งงาน',
      'เชื่อมต่อข้อมูลนักเรียนจากฐานข้อมูลส่วนกลาง (Centralized Database)',
      'ลดระยะเวลาการประมวลผลการประเมินลงประมาณ 35% และสนับสนุนการตัดสินใจเชิงข้อมูล',
    ],
  },
  {
    name: 'Child Care Center Management System',
    duration: '5 เดือน',
    stack: 'Next.js, Node.js, MySQL',
    bullets: [
      'พัฒนาระบบบริหารศูนย์เด็กเล็ก (เช็คชื่อ, สุขภาพ, คำนวณ OT)',
      'ออกแบบ Dashboard และรายงานสำหรับติดตามการดำเนินงาน',
      'เพิ่มประสิทธิภาพการทำงานโดยรวมประมาณ 30% จากการลดงานเอกสาร',
      'ปรับปรุง Workflow การทำงานของผู้ดูแลให้รวดเร็วและเป็นระบบมากขึ้น',
    ],
  },
  {
    name: 'E-Commerce System (Freelance)',
    duration: '3 เดือน',
    stack: 'Flutter, Node.js, PostgreSQL',
    bullets: [
      'พัฒนา Mobile Application สำหรับจัดการสินค้า การจัดส่ง และคำสั่งซื้อ',
      'พัฒนาระบบจัดการสต็อกสินค้าและกระบวนการสั่งซื้อ',
      'เพิ่มฟีเจอร์รีวิวและให้คะแนนสินค้าเพื่อยกระดับประสบการณ์ผู้ใช้งาน',
      'เพิ่มประสิทธิภาพการจัดการคำสั่งซื้อประมาณ 25% และเพิ่มการมีส่วนร่วมของผู้ใช้งาน',
    ],
  },
],
      pdf: {
        preview: 'Preview Transcript',
        download: 'Download Transcript',
        modalTitle: 'Transcript',
        downloadBtn: 'Download',
        closeBtn: 'Close',
      },
    },
  },
  th: {
    nav: {
      info: 'ข้อมูลส่วนตัว',
      portfolio: 'ผลงาน',
      blog: 'บทความ',
      contact: 'ติดต่อ',
    },
    resume: {
      summary:
        'Full Stack Developer ที่มีประสบการณ์พัฒนา Web และ Mobile Application กว่า 2 ปี เชี่ยวชาญทั้ง Front-end และ Back-end พร้อมทักษะด้านการออกแบบฐานข้อมูล วิเคราะห์ความต้องการ และพัฒนาระบบอย่างเป็นระบบและมีประสิทธิภาพ',
      sections: {
        skills: 'ทักษะ',
        experience: 'ประสบการณ์ทำงาน',
        education: 'การศึกษา',
        projects: 'โปรเจกต์ที่เกี่ยวข้อง',
      },
      skills: [
        { label: 'ภาษาโปรแกรม', value: 'Java, JavaScript, TypeScript, SQL' },
        { label: 'หน้าบ้าน', value: 'Next.js, React, React Native, Flutter' },
        { label: 'หลังบ้าน', value: 'Node.js, Express.js' },
        { label: 'ฐานข้อมูล', value: 'PostgreSQL, SQL Server, MySQL' },
        { label: 'เครื่องมือและแพลตฟอร์ม', value: 'GitHub, GitLab, Postman, Docker' },
        { label: 'เครื่องมือ AI', value: 'ChatGPT, Claude, Windsurf' },
        {
          label: 'อื่น ๆ',
          value: 'RESTful APIs, พัฒนาแอปมือถือและเว็บ, การออกแบบและปรับปรุงฐานข้อมูล',
        },
      ],
      experiences: [
        {
          company: 'Intelligence System Corporation Co., Ltd.',
          role: 'นักพัฒนา Full Stack',
          period: 'พฤศจิกายน 2567 – มีนาคม 2569 (1 ปี 5 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js โดยคำนึงถึงประสิทธิภาพและความสามารถในการรองรับผู้ใช้งาน',
            'พัฒนาแอปพลิเคชันมือถือแบบ Cross-platform ด้วย React Native',
            'ออกแบบและจัดการฐานข้อมูลเชิงสัมพันธ์ เขียน SQL Query ให้มีประสิทธิภาพ และเชื่อมต่อ RESTful API',
            'ทำงานร่วมกับทีมในการวิเคราะห์ความต้องการ ออกแบบระบบ และพัฒนาฟีเจอร์ต่าง ๆ',
          ],
        },
        {
          company: 'Intelligence System Corporation Co., Ltd.',
          role: 'นักพัฒนา Full Stack (ฝึกงาน)',
          period: 'เมษายน 2567 – ตุลาคม 2567 (6 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js',
            'พัฒนาแอปพลิเคชันมือถือด้วย React Native',
            'ทำงานกับฐานข้อมูล เขียน SQL Query และเชื่อมต่อ API',
            'มีส่วนร่วมในการวางแผนและพัฒนาระบบร่วมกับทีม',
          ],
        },
        {
          company: 'Freelance',
          role: 'นักพัฒนา Full Stack (Flutter, Node.js)',
          period: '(3 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันมือถือด้วย Flutter และพัฒนา Backend ด้วย Node.js',
            'ออกแบบโครงสร้างฐานข้อมูลและพัฒนา RESTful API เพื่อรองรับการทำงานของระบบ',
            'เชื่อมต่อและจัดการการรับ–ส่งข้อมูลระหว่าง Mobile Application และ Backend',
          ],
        },
      ],
      education: [
        {
          school: 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน (RMUTI)',
          degree: 'วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์',
          period: '2564 – 2567',
          note: 'เกรดเฉลี่ย 3.43',
        },
        {
          school: 'วิทยาลัยเทคนิคสุรินทร์',
          degree: 'ประกาศนียบัตรวิชาชีพชั้นสูง สาขาอิเล็กทรอนิกส์ อุตสาหกรรม',
          period: '2561 – 2563',
          note: 'เกรดเฉลี่ย 3.15',
        },
      ],
      projects: [
        {
          name: 'ระบบสวัสดิการพนักงาน',
          duration: '1 เดือน',
          stack: 'Next.js, Node.js, MySQL',
          bullets: [
            'พัฒนาระบบสวัสดิการพนักงาน (Admin, HR, Accounting) พร้อม RBAC และ RESTful APIs',
            'ออกแบบโครงสร้างฐานข้อมูลที่สามารถขยายได้สำหรับการจัดการข้อมูลอย่างมีประสิทธิภาพ',
            'ลดระยะเวลาการประมวลผลด้วยตนเอง ~40% ผ่านการทำงานอัตโนมัติ',
            'เพิ่มความแม่นยำของข้อมูลและลดข้อผิดพลาดด้วยระบบที่รวมศูนย์',
          ],
        },
        {
          name: 'ระบบจัดการงานซ่อม',
          duration: '4 เดือน',
          stack: 'Mobile Webview, Node.js, MySQL',
          bullets: [
            'สร้างแพลตฟอร์มจัดการงานซ่อม (Mobile Webview + Back-office) สำหรับติดตามงาน',
            'ออกแบบแดชบอร์ดและรายงานสำหรับการตรวจสอบแบบเรียลไทม์',
            'ลดระยะเวลาการติดตามงานซ่อม ~30% ด้วยเวิร์กโฟลว์ที่รวมศูนย์',
            'เพิ่มการมองเห็นการดำเนินงานเพื่อการตัดสินใจที่เร็วขึ้น',
          ],
        },
        {
          name: 'ระบบประเมินผลนักเรียน',
          duration: '6 เดือน',
          stack: 'React Native, Node.js, MySQL',
          bullets: [
            'พัฒนาระบบประเมินผลพร้อมแดชบอร์ดวิเคราะห์และรายงาน',
            'รองรับการประเมินหลายประเภท (ตนเอง, เพื่อน, ครู) พร้อมฟีเจอร์การติดตาม',
            'เชื่อมต่อข้อมูลนักเรียนแบบรวมศูนย์จากฐานข้อมูลการศึกษา',
            'ลดระยะเวลาการประมวลผลการประเมิน ~35% และเปิดใช้งานข้อมูลเชิงลึก',
          ],
        },
        {
          name: 'ระบบจัดการศูนย์เด็กเล็ก',
          duration: '5 เดือน',
          stack: 'Next.js, Node.js, MySQL',
          bullets: [
            'สร้างระบบจัดการศูนย์เด็กเล็ก (ติดตามการเข้าเรียน, สุขภาพ, คำนวณ OT)',
            'ออกแบบแดชบอร์ดและรายงานสำหรับการตรวจสอบการดำเนินงาน',
            'เพิ่มประสิทธิภาพการดำเนินงาน ~30% โดยลดกระบวนการทำงานด้วยตนเอง',
            'ปรับปรุงเวิร์กโฟลว์ของผู้ดูแลด้วยการดำเนินงานประจำวันที่ลื่นไหล',
          ],
        },
        {
          name: 'ระบบ E-Commerce (Freelance)',
          duration: '3 เดือน',
          stack: 'Flutter, Node.js, PostgreSQL',
          bullets: [
            'พัฒนาแอปพลิเคชันมือถือพร้อมการจัดการสินค้า การจัดส่ง และออเดอร์',
            'พัฒนาระบบติดตามสินค้าคงคลังและการประมวลผลออเดอร์',
            'สร้างฟีเจอร์รีวิวและให้คะแนนเพื่อเพิ่มประสบการณ์ผู้ใช้',
            'เพิ่มประสิทธิภาพการจัดการออเดอร์ ~25% และเพิ่มการมีส่วนร่วม',
          ],
        },
      ],
      pdf: {
        preview: 'ดูผลการเรียน',
        download: 'ดาวน์โหลดผลการเรียน',
        modalTitle: 'ผลการเรียน',
        downloadBtn: 'ดาวน์โหลด',
        closeBtn: 'ปิด',
      },
    },
  },
} satisfies Record<Lang, unknown>;

export default translations;
export type Translations = typeof translations;
