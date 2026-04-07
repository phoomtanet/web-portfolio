"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/i18n/LangContext';
import translations from '@/i18n/translations';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Database,
  Server,
  Globe,
  Terminal,
  Container,
  Cloud,
  Palette,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Calendar,
  Award,
  BookOpen,
  Users,
  Zap,
  Cpu,
  Layers,
  Wrench,
  Briefcase,
  GraduationCap,
  Download,
  Send,
  Monitor,
  Eye
} from 'lucide-react';

const PDF_PATH = '/file/transcrip_phoomtanet_intayung.pdf';
const EN_RESUME_PATH = '/file/resume_phoomtanet_intayung_eng.pdf';

const skillIcons: Record<string, React.ReactNode> = {
  // EN keys
  Languages: <Code2 className="h-5 w-5" />,
  Frontend: <Monitor className="h-5 w-5" />,
  Backend: <Server className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  'Tools & Platforms': <Wrench className="h-5 w-5" />,
  'AI Tools': <Sparkles className="h-5 w-5" />,
  Other: <Layers className="h-5 w-5" />,
  // TH keys
  'ภาษาโปรแกรม': <Code2 className="h-5 w-5" />,
  'หน้าบ้าน': <Monitor className="h-5 w-5" />,
  'หลังบ้าน': <Server className="h-5 w-5" />,
  'ฐานข้อมูล': <Database className="h-5 w-5" />,
  'เครื่องมือและแพลตฟอร์ม': <Wrench className="h-5 w-5" />,
  'เครื่องมือ AI': <Sparkles className="h-5 w-5" />,
  'อื่น ๆ': <Layers className="h-5 w-5" />,
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const [showEnResume, setShowEnResume] = useState(false);
  const { username, openLogin, logout } = useAuth();
  const { lang, setLang } = useLang();
  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = t.resume.skills;

  const experiences = t.resume.experiences;

  const projects = t.resume.projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Subtle Tech Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.3) 49%, rgba(59, 130, 246, 0.3) 50%, transparent 51%, transparent),
            linear-gradient(-45deg, transparent 48%, rgba(59, 130, 246, 0.3) 49%, rgba(59, 130, 246, 0.3) 50%, transparent 51%, transparent)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px'
        }} />
      </div>
      
      {/* Subtle Animated Tech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute w-px h-20 bg-blue-500/20"
            style={{
              left: `${12.5 + (i * 12.5)}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              height: [20, 40, 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`tech-h-${i}`}
            className="absolute h-px w-20 bg-purple-500/20"
            style={{
              top: `${16.6 + (i * 16.6)}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              width: [20, 40, 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
 
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Phoomtanet.dev
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {(['about', 'experience', 'projects', 'skills', 'contact'] as const).map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors hover:text-blue-400 ${activeSection === section ? 'text-blue-400' : 'text-gray-300'
                    }`}
                >
                  {t.nav[section]}
                </motion.button>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                className="px-3 py-1 bg-white/10 rounded-lg border border-white/20 text-sm font-medium transition-all hover:bg-white/20 hover:border-white/40"
              >
                {lang === 'en' ? '🇹🇭 TH' : '🇺🇸 EN'}
              </motion.button>
            </div>
            {/* Mobile menu items */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                className="px-3 py-1 bg-white/10 rounded-lg border border-white/20 text-sm font-medium transition-all hover:bg-white/20 hover:border-white/40"
              >
                {lang === 'en' ? '🇹🇭 TH' : '🇺🇸 EN'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 py-20 z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold"
              >
                <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Phoomtanet
                </span>
                <br />
                <span className="text-4xl md:text-6xl text-white">Intayung</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-2xl text-blue-300 font-semibold"
              >
                Full Stack Developer
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {t.resume.summary}

              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 items-start"
              >
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEnResume(true)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    {lang === 'th' ? 'ดูเรซูเม่' : 'View Resume'} <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPreview(true)}
                    className="px-8 py-3 border border-white/20 rounded-full font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    {lang === 'th' ? 'ดูประวัติ' : 'View Transcript'}

                  </motion.button>
                </div>

              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="https://github.com/phoomtanet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="https://linkedin.com/in/phoomtanet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="mailto:phoomtanet.in@gmail.com"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full blur-xl opacity-50" />
                <img
                  src="/images/my-profile2.png"
                  alt="Phoomtanet Intayung"
                  className="relative w-80 h-80 rounded-full border-4 border-white/20 object-cover shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

  

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.resume.sections.experience}
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {lang === 'th' ? 'ประสบการณ์การทำงานและผลงานของฉัน' : 'My professional journey and achievements'}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-500" />
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative mb-12 ml-16"
                >
                  <div className="absolute -left-10 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full border-4 border-slate-900" />
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <p className="text-blue-300 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-400">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.resume.sections.projects}
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {lang === 'th' ? 'แสดงผลงานที่ดีที่สุดและโซลูชันสร้างสรรค์' : 'Showcasing my best work and creative solutions'}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    {(project.name === 'Employee Welfare Management System' || project.name === 'ระบบสวัสดิการพนักงาน' || 
                      project.name === 'Repair Management System' || project.name === 'ระบบจัดการงานซ่อม' || 
                      project.name === 'Student Assessment System' || project.name === 'ระบบประเมินผลนักเรียน' || 
                      project.name === 'Child Care Center Management System' || project.name === 'ระบบจัดการศูนย์เด็กเล็ก' || 
                      project.name === 'E-Commerce System (Freelance)' || project.name === 'ระบบ E-Commerce (Freelance)') ? (
                      <img 
                        src={
                          project.name === 'Employee Welfare Management System' || project.name === 'ระบบสวัสดิการพนักงาน' ? "/images/fba.png" :
                          project.name === 'Repair Management System' || project.name === 'ระบบจัดการงานซ่อม' ? "/images/bng.png" :
                          project.name === 'Student Assessment System' || project.name === 'ระบบประเมินผลนักเรียน' ? "/images/spro.png" :
                          project.name === 'Child Care Center Management System' || project.name === 'ระบบจัดการศูนย์เด็กเล็ก' ? "/images/chd.png" :
                          "/images/meekong.png"
                        }
                        alt={project.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Code2 className="h-16 w-16 text-white/50" />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {project.bullets[0]}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        {project.stack}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-4">
                      {project.duration}
                    </div>
                    <div className="space-y-2 mb-4 flex-1">
                      {project.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.resume.sections.skills}
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {lang === 'th' ? 'ความเชี่ยวชาญทางเทคนิคและระดับความสามารถ' : 'Technical expertise and proficiency levels'}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                    {skillIcons[skill.label] || <Layers className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{skill.label}</h3>
                    <p className="text-sm text-gray-400">{skill.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">{t.contact.info}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{t.contact.email}</p>
                        <p className="text-white">phoomtanet.in@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Phone className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{t.contact.phone}</p>
                        <p className="text-white">065 332 4270</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <MapPin className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{t.contact.location}</p>
                        <p className="text-white">Bangkok, Thailand</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">{t.contact.socialLinks}</h3>
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://github.com/phoomtanet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://linkedin.com/in/phoomtanet-intayung-843185389"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-6">{t.contact.sendMessage}</h3>
                {username ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-300 text-sm">
                        Logged in as: <span className="font-semibold">{username}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const chatButton = document.querySelector('[aria-label="Toggle chat"]') as HTMLButtonElement;
                        chatButton?.click();
                      }}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {t.contact.openChat}
                    </button>
                    <button
                      onClick={logout}
                      className="w-full py-2 border border-white/20 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-gray-300 text-sm mb-3">
                        {t.contact.loginPrompt}
                      </p>
                      <button
                        onClick={openLogin}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                      >
                        {t.contact.loginButton}
                      </button>
                    </div>
             
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Phoomtanet Intayung. Crafted with passion and lots of coffee ☕
            </p>
          </div>
        </div>
      </footer>

      {/* EN Resume Modal */}
      {showEnResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-4xl max-h-[95vh] flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl shadow-blue-600/20">
            <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3">
              <p className="font-semibold text-white text-sm sm:text-base">EN Resume</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEnResume(false)}
                  className="rounded-lg border border-white/20 px-2 sm:px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/10"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-4xl max-h-[95vh] flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl shadow-blue-600/20">
            <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3">
              <p className="font-semibold text-white text-sm sm:text-base">{lang === 'th' ? 'ประวัติการศึกษา' : 'Academic Transcript'}</p>
              <div className="flex items-center gap-2">
                <a
                  href={PDF_PATH}
                  download="transcript-phoomtanet.pdf"
                  className="flex items-center gap-1.5 rounded-lg border border-white/20 px-2 sm:px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/10"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{lang === 'th' ? 'ดาวน์โหลด' : 'Download'}</span>
                  <span className="sm:hidden">DL</span>
                </a>
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg border border-white/20 px-2 sm:px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/10"
                >
                  ✕ <span className="hidden sm:inline ml-1">{lang === 'th' ? 'ปิด' : 'Close'}</span>
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
    </div>
  );
};

export default Portfolio;
