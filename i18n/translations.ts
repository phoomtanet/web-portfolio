import type { Lang } from './LangContext';

const translations = {
  en: {
    nav: {
      info: 'Info',
      portfolio: 'Portfolio',
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      secretLair: 'Secret Lair',
      radioRoom: 'Radio Room',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: "Let's create something amazing together",
      info: 'Contact Information',
      sendMessage: 'Send Message',
      socialLinks: 'Social Links',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      loginPrompt: 'Please login to send messages through our chat system.',
      loginButton: 'Login to Send Message',
      orUseChat: 'Or use the chat button in bottom-right corner',
      openChat: 'Open Chat to Send Message',
    },
    resume: {
      summary: 'Full Stack Developer with nearly 2 years of hands-on experience building web and mobile applications using Next.js, Node.js, and React Native. Experienced in developing end-to-end solutions that improve operational efficiency and streamline workflows. Strong in translating business requirements into scalable, high-performance applications with clean and maintainable architecture.',
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
          duration: '1 month',
          stack: 'Next.js, Node.js, SQL Server',
          overview: 'An employee welfare management system for organizations to track employee benefit usage, manage quotas, and generate financial reports.',
          bullets: [
            'Developed user role-based access control system (Admin, HR, Accounting)',
            'Implemented email notification system',
            'Integrated organizational data to work systematically',
            'Enabled accounting department to review transactions and generate reports faster'
          ],
        },
        {
          name: 'Repair Management System',
          duration: '4 months',
          stack: 'Next.js, Node.js, SQL Server',
          overview: 'A repair management system for repair shops to track jobs at every step from receiving items to returning to customers, with summary reports and dashboards.',
          bullets: [
            'Designed job status update system (e.g., receive job, send for repair, price evaluation, repair complete, return to customer)',
            'Reduced manual work, prevented item loss, and improved data accuracy',
            'Displayed job lists and overview through dashboards for easy status tracking',
            'Connected repair data with repair evaluation system'
          ]
        },
        {
          name: 'Student Assessment System',
          duration: '8 months',
          stack: 'React Native, Next.js, Node.js, SQL Server',
          overview: 'A comprehensive student evaluation system with analytics dashboards, supporting multiple assessment types and providing data-driven insights.',
          bullets: [
            'Connected data with existing education systems via APIs (students, instructors, courses, registrations, grades)',
            'Developed customizable assessment forms according to requirements',
            'Students can access their own data such as grades, registered courses, and assessment status',
            'Supported role-based access for class advisors, academic advisors, course instructors, and department heads with different data access permissions'
          ],
        },
        {
          name: 'Child Care Center Management System',
          duration: '5 months',
          stack: 'Next.js, Node.js, SQL Server',
          overview: 'A childcare management system for tracking attendance, health records, and childcare expenses with operational dashboards.',
          bullets: [
            'Built childcare management system (attendance tracking, health monitoring, childcare expenses)',
            'Designed dashboards and reports for operational monitoring',
            'Enabled caregivers and parents to accurately track child development, helping promote targeted child development',
            'Improved data integration and system connectivity'
          ],
        },
        {
          name: 'E-Commerce System (Freelance)',
          duration: '3 months',
          stack: 'Flutter, Node.js, PostgreSQL, WebSocket',
          overview: 'Developed a comprehensive E-Commerce system supporting full-cycle trading from product listing to ordering and delivery, with real-time auction/bidding and order status tracking.',
          bullets: [
            'Developed product management system from listing to buyer delivery',
            'Implemented real-time product auction and price negotiation using WebSocket',
            'Developed order tracking, inventory management, and product status system',
            'Connected API for shipping cost calculation (Shipop)'
          ],
        },
      ],
      pdf: {
        preview: 'Preview Transcript',
        download: 'Download Transcript',
        enResume: 'Preview Resume',
        modalTitle: 'Transcript',
        downloadBtn: 'Download',
        closeBtn: 'Close',
      },
    },
  },
  th: {
    nav: {
      info: 'ข้อมูล',
      portfolio: 'ผลงาน',
      home: 'หน้าแรก',
      about: 'เกี่ยวกับ',
      experience: 'ประสบการณ์',
      projects: 'โปรเจกต์',
      skills: 'ทักษะ',
      contact: 'ติดต่อ',
      secretLair: 'SECRET LAIR',
      radioRoom: 'RADIO ROOM',
    },
    contact: {
      title: 'ติดต่อ',
      subtitle: 'มาสร้างสิ่งที่น่าทึ่งร่วมกัน',
      info: 'ข้อมูลติดต่อ',
      sendMessage: 'ส่งข้อความ',
      socialLinks: 'ลิงก์โซเชียล',
      email: 'อีเมล',
      phone: 'โทรศัพท์',
      location: 'ที่อยู่',
      loginPrompt: 'กรุณาเข้าสู่ระบบเพื่อส่งข้อความผ่านระบบแชทของเรา',
      loginButton: 'เข้าสู่ระบบเพื่อส่งข้อความ',
      orUseChat: 'หรือใช้ปุ่มแชทที่มุมล่างขวา',
      openChat: 'เปิดแชทเพื่อส่งข้อความ',
    },
    resume: {
      summary: ' Full Stack Developer ที่มีประสบการณ์เกือบ 2 ปี ในการพัฒนา Web และ Mobile Application โดยใช้ Next.js, Node.js และ React Native มีประสบการณ์ในการพัฒนาโซลูชันแบบ end-to-end เพื่อเพิ่มประสิทธิภาพการทำงาน ลดขั้นตอนที่ซ้ำซ้อน และปรับปรุง workflow มีความสามารถในการแปลงความต้องการทางธุรกิจให้เป็นระบบที่สามารถขยายตัวได้ มีประสิทธิภาพสูง และมีโครงสร้างโค้ดที่สะอาด ดูแลรักษาง่าย',
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
          stack: 'Next.js, Node.js,  SQL Server',
          bullets: [
            'พัฒนาระบบกำหนดสิทธิ์ผู้ใช้งานตามบทบาท (Admin, HR, Accounting)',
            'พัฒนาระบบการแจ้งเตือนผ่าน email',
            'เชื่อมโยงข้อมูลภายในองค์กรให้ทำงานร่วมกันอย่างเป็นระบบ',
            'ช่วยให้ฝ่ายบัญชีตรวจสอบธุรกรรมและสรุปรายงานได้รวดเร็วขึ้น'
          ],
          overview: 'ระบบจัดการสวัสดิการพนักงานสำหรับองค์กร ใช้บันทึกการใช้สวัสดิการของพนักงาน จัดการโควต้า และสรุปรายงานการเงิน'
        },
        {
          name: 'ระบบจัดการงานซ่อม',
          duration: '4 เดือน',
          stack: 'Next.js, Node.js,  SQL Server',
          overview: 'ระบบจัดการงานซ่อมสำหรับร้านค้า ติดตามงานได้ทุกขั้นตอนตั้งแต่รับสินค้าไปจนถึงส่งคืนลูกค้า และสรุปผลรายและแดชบอร์ด',
          bullets: [
            'ออกแบบระบบอัปเดตสถานะงาน (เช่น รับงาน, ส่งซ่อม, ประเมินราคา, ซ่อมเสร็จ, ส่งคืน)',
            'ช่วยลดงาน manual ลดการสูญหายของสินค้า และเพิ่มความแม่นยำของข้อมูล',
            'แสดงรายการงานและภาพรวมผ่านแดชบอร์ด เพื่อช่วยติดตามสถานะได้ง่าย',
            'เชื่อมโยงข้อมูลการซ่อมกับระบบประเมินการซ่อม'
          ]
        },
        {
          name: 'ระบบประเมินผลนักเรียน',
          duration: '8 เดือน',
          stack: 'React Native, Next.js, Node.js,  SQL Server',
          overview: 'ระบบประเมินผลนักเรียนครบวงจรพร้อมแดชบอร์ดวิเคราะห์ข้อมูล รองรับการประเมินหลายรูปแบบและให้ข้อมูลเชิงลึก',
          bullets: [
            'เชื่อมโยงข้อมูลกับระบบการศึกษาที่มีอยู่ผ่าน APIs (นักเรียน, อาจารย์, รายวิชา, การลงทะเบียน, คะแนน)',
            'พัฒนาระบบแบบประเมินที่สามารถปรับแต่งรูปแบบได้ตามความต้องการ',
            'นักเรียนสามารถเข้าถึงข้อมูลของตนเอง เช่น คะแนน รายวิชาที่ลงทะเบียน และสถานะแบบประเมิน',
            'รองรับการใช้งานตามบทบาท เช่น อาจารย์ประจำชั้นปี อาจารย์ที่ปรึกษา อาจารย์ประจำวิชา และประธานวิชา โดยสามารถเข้าถึงข้อมูลได้แตกต่างกันตามสิทธิ์',
          ],
        },
        {
          name: 'ระบบจัดการศูนย์เด็กเล็ก',
          duration: '5 เดือน',
          stack: 'Next.js, Node.js,  SQL Server',
          overview: 'ระบบจัดการศูนย์เด็กเล็กสำหรับติดตามการเข้าเรียน บันทึกสุขภาพ คำนวณค่าล่วงเวลา พร้อมแดชบอร์ดการดำเนินงาน',
          bullets: [
            'สร้างระบบจัดการศูนย์เด็กเล็ก (ติดตามการเข้าเรียน, สุขภาพ, ค่าใช้จ่ายในกาดูแลเด็ก)',
            'ออกแบบแดชบอร์ดและรายงานสำหรับการตรวจสอบการดำเนินงาน',
            'ช่วยให้พี่เลี้ยงและผู้ปกครองติดตามพัฒนาการเด็กได้ถูกต้อง ช่วยให้ส่งเสริมพัฒนาการเด็กอย่างตรงจุด',
            'ช่วยเชื่อมโยงข้อมูลให้เป็นระบบมากขึ้น',

          ],
        },
        {
          name: 'ระบบ E-Commerce (Freelance)',
          duration: '3 เดือน',
          stack: 'Flutter, Node.js, PostgreSQL , WebSocket',
          overview: 'พัฒนาระบบ E-Commerce รองรับการซื้อขายสินค้าแบบครบวงจร ตั้งแต่การลงสินค้า การสั่งซื้อ ไปจนถึงการจัดส่ง พร้อมระบบประมูลและต่อรองราคาแบบ Real-time และการติดตามสถานะออเดอร์',
          bullets: [
            'พัฒนาระบบจัดการสินค้า ตั้งแต่ลงสินค้า จนถึงมือผู้ซื้อ',
            'พัฒนาการประมูลสินค้าและต่อรองราคาแบบ Real time โดย WebSocket',
            'พัฒนาระบบติดตามออเดอร์ การจัดการสต๊อกและสถานะสินค้า',
            'เชื่อมต่อ API สำหรับคำนวณค่าขนส่ง (Shipop)',
          ],
        },
      ],
      pdf: {
        preview: 'ดูผลการเรียน',
        download: 'ดาวน์โหลดผลการเรียน',
        enResume: 'ดูเรซูเม่',
        modalTitle: 'ผลการเรียน',
        downloadBtn: 'ดาวน์โหลด',
        closeBtn: 'ปิด',
      },
    },
  },
} satisfies Record<Lang, unknown>;

export default translations;
export type Translations = typeof translations;
