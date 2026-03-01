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
          company: 'Intelligence System Corporation Co.,LTD',
          role: 'Full Stack Developer',
          period: '1 November 2024 – 31 March 2026 (1 year 5 months)',
          bullets: [
            'Developed web applications using Next.js and Node.js.',
            'Built mobile applications using React Native.',
            'Designed and managed databases, wrote SQL queries, and integrated APIs.',
            'Collaborated with the team to plan, analyze, and implement systems.',
          ],
        },
        {
          company: 'Intelligence System Corporation Co.,LTD',
          role: 'Full Stack Developer (Internship)',
          period: '25 April 2024 – 31 October 2024 (6 months)',
          bullets: [
            'Developed web applications using Next.js and Node.js.',
            'Built mobile applications using React Native.',
            'Designed and managed databases, wrote SQL queries, and integrated APIs.',
            'Collaborated with the team to plan, analyze, and implement systems.',
          ],
        },
        {
          company: 'Freelance',
          role: 'Full Stack Developer (Flutter, Node.js)',
          period: '',
          bullets: [
            'Developed mobile applications using Flutter and backend with Node.js.',
            'Designed databases and integrated REST APIs.',
            'Handled projects independently from design to deployment.',
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
          duration: '1 Month',
          stack: 'Next.js, Node.js, MySQL, Ant Design',
          bullets: [
            'Master data management and core system functions',
            'Management of employee affiliations and store assignments',
            'Transaction data handling for accounting department',
            'Employee information management for HR purposes',
          ],
        },
        {
          name: 'Repair Management System',
          duration: '4 Months',
          stack: 'Flutter, Node.js, MySQL',
          bullets: [
            'Developed back-office and mobile webview applications for a luggage retail store',
            'Mobile (Webview) for cashiers: record customer info, product details, damage reports, and track repair shipments',
            'Back-office: full management of repair data, mirroring mobile functionalities',
            'Dashboard creation and report generation for management',
          ],
        },
        {
          name: 'Student Assessment System',
          duration: '4 Months',
          stack: 'React Native, Node.js, MySQL',
          bullets: [
            'Developed student-facing mobile application for assessments',
            'Implemented self-assessment, peer assessment, and teacher assessment types',
            'Allowed students to submit assessments to peers and teachers',
            'Enabled teachers to review and monitor student assessment data',
            'Displayed assessment results as reports and charts for performance analysis',
          ],
        },
        {
          name: 'Child Care Management System',
          duration: '5 Months',
          stack: 'Next.js, Node.js, React Native, MySQL, Ant Design',
          bullets: [
            'Master data management for children, classrooms, and caregivers',
            'Attendance tracking and health record logging',
            'Calculation and management of caregivers\' overtime',
            'Reporting and analytics for center management',
          ],
        },
        {
          name: 'E-Commerce System',
          duration: '1 Month',
          stack: 'Flutter, Node.js, Prisma, PostgreSQL',
          bullets: [
            'Developed mobile application for customers with shipping information management',
            'Product data management',
            'Customer addresses',
            'Review system for both customers and stores',
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
          company: 'Intelligence System Corporation Co.,LTD',
          role: 'นักพัฒนา Full Stack',
          period: '1 พฤศจิกายน 2567 – 31 มีนาคม 2569 (1 ปี 5 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js',
            'พัฒนาแอปพลิเคชันมือถือด้วย React Native',
            'ออกแบบและจัดการฐานข้อมูล เขียน SQL Query และเชื่อมต่อ API',
            'ร่วมกับทีมในการวางแผน วิเคราะห์ และพัฒนาระบบ',
          ],
        },
        {
          company: 'Intelligence System Corporation Co.,LTD',
          role: 'นักพัฒนา Full Stack (ฝึกงาน)',
          period: '25 เมษายน 2567 – 31 ตุลาคม 2567 (6 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันเว็บด้วย Next.js และ Node.js',
            'พัฒนาแอปพลิเคชันมือถือด้วย React Native',
            'ออกแบบและจัดการฐานข้อมูล เขียน SQL Query และเชื่อมต่อ API',
            'ร่วมกับทีมในการวางแผน วิเคราะห์ และพัฒนาระบบ',
          ],
        },
        {
          company: 'Freelance',
          role: 'นักพัฒนา Full Stack (Flutter, Node.js)',
          period: '(3 เดือน)',
          bullets: [
            'พัฒนาแอปพลิเคชันมือถือด้วย Flutter และ Backend ด้วย Node.js',
            'ออกแบบฐานข้อมูลและเชื่อมต่อ REST FULL API',
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
          stack: 'Next.js, Node.js, MySQL, Ant Design',
          bullets: [
            'จัดการข้อมูลหลักและฟังก์ชันหลักของระบบ',
            'จัดการความสัมพันธ์พนักงานและการมอบหมายสาขา',
            'จัดการข้อมูลธุรกรรมสำหรับแผนกบัญชี',
            'จัดการข้อมูลพนักงานสำหรับฝ่ายทรัพยากรบุคคล',
          ],
        },
        {
          name: 'ระบบจัดการการซ่อม',
          duration: '4 เดือน',
          stack: 'Next.js, Node.js, MySQL',
          bullets: [
            'พัฒนาแอปพลิเคชัน Back-office และ Mobile Webview สำหรับร้านค้ากระเป๋า',
            'Mobile สำหรับแคชเชียร์: บันทึกข้อมูลลูกค้า สินค้า รายงานความเสียหาย และติดตามการส่งซ่อม',
            'Back-office: จัดการข้อมูลการซ่อมครบวงจร',
            'สร้าง Dashboard และรายงานสำหรับผู้บริหาร',
          ],
        },
        {
          name: 'ระบบประเมินผลนักเรียน',
          duration: '6 เดือน',
          stack: 'React Native, Next.js, Node.js, MySQL',
          bullets: [
            'พัฒนาแอปพลิเคชันมือถือสำหรับนักเรียนในการทำแบบประเมิน',
            'รองรับการประเมินตนเอง ประเมินเพื่อน และประเมินโดยครู',
            'ให้นักเรียนส่งแบบประเมินถึงเพื่อนและครูได้',
            'ให้ครูตรวจสอบและติดตามผลการประเมินนักเรียน',
            'แสดงผลการประเมินในรูปแบบรายงานและกราฟเพื่อวิเคราะห์ผลการเรียน',
          ],
        },
        {
          name: 'ระบบจัดการศูนย์เด็กเล็ก',
          duration: '5 เดือน',
          stack: 'Next.js, Node.js, MySQL, Ant Design',
          bullets: [
            'จัดการข้อมูลหลักด้านเด็ก ห้องเรียน และผู้ดูแล',
            'ติดตามการเข้าร่วมและบันทึกสุขภาพ',
            'คำนวณและจัดการค่าล่วงเวลาของผู้ดูแล',
            'รายงานและวิเคราะห์ข้อมูลสำหรับผู้บริหาร',
          ],
        },
        {
          name: 'ระบบ E-Commerce (Freelance)',
          duration: '3 เดือน',
          stack: 'Flutter, Node.js, Prisma, PostgreSQL',
          bullets: [
            'พัฒนาแอปพลิเคชันมือถือสำหรับลูกค้าพร้อมระบบจัดการข้อมูลการจัดส่ง',
            'จัดการข้อมูลสินค้า',
            'จัดการที่อยู่ลูกค้า',
            'ระบบรีวิวสำหรับลูกค้าและร้านค้า',
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
