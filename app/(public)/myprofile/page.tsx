"use client";

import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  Smartphone,
  Database,
  Zap,
  Monitor,
  Server,
  Palette,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function FreelanceServiceBanner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      {/* Main Banner Container */}
      <div className="w-full max-w-7xl">
        {/* 1200x628 Banner */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '1200/628' }}>
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          
          {/* Tech Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-blue-600 rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border-4 border-purple-600 rounded-lg rotate-45"></div>
            <div className="absolute bottom-10 left-1/4 w-20 h-20 border-4 border-gold-600 rounded-lg"></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 border-4 border-blue-600 rounded-full"></div>
          </div>

          <div className="relative grid grid-cols-2 h-full">
            
            {/* Left Side - Illustration */}
            <div className="flex items-center justify-center p-8">
              <div className="relative">
                
                {/* Developer Illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  {/* Code Editor Window */}
                  <div className="bg-gray-900 rounded-lg shadow-2xl p-4 w-80 h-56">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="text-blue-400">const developer = {`{`}</div>
                      <div className="text-gray-300 ml-4">name: "Full Stack",</div>
                      <div className="text-gray-300 ml-4">skills: ["React","Next", "Node.js"],</div>
                      <div className="text-gray-300 ml-4">quality: "Premium",</div>
                      <div className="text-gray-300 ml-4">delivery: "Fast"</div>
                      <div className="text-blue-400">{`}`};</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="absolute -top-8 -right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg"
                >
                  <Code2 className="h-6 w-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-3 rounded-full shadow-lg"
                >
                  <Database className="h-6 w-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute top-1/2 -right-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg"
                >
                  <Rocket className="h-6 w-6" />
                </motion.div>

                {/* Dashboard Mock */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-4 left-8 bg-white rounded-lg shadow-xl p-3 w-32"
                >
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                    <div className="h-2 bg-purple-200 rounded w-1/2"></div>
                    <div className="h-2 bg-green-200 rounded w-2/3"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center p-8 pl-4">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg mb-6 w-fit"
              >
                <Zap className="h-4 w-4" />
                Fast Delivery | ส่งงานไว
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl font-bold text-gray-900 mb-4 leading-tight"
              >
                FULL STACK
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DEVELOPMENT
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-600 mb-4 font-medium"
              >
                Landing Page <span className="text-gray-400">·</span> API Development <span className="text-gray-400">·</span> Database Maintenance
              </motion.p>
              
              {/* Thai Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="text-lg text-gray-500 mb-8 font-medium"
              >
                หน้าเว็บไซต์ <span className="text-gray-400">·</span> พัฒนา API <span className="text-gray-400">·</span> ฐานข้อมูล
              </motion.p>

              {/* Key Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Palette className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">UI/UX Design</span>
                    <span className="text-gray-500 text-sm block">การออกแบบ UI/UX</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">API Development</span>
                    <span className="text-gray-500 text-sm block">พัฒนาระบบ API</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">Responsive Design</span>
                    <span className="text-gray-500 text-sm block">ออกแบบ Responsive</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex items-center gap-2"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2">
                  Get Started | เริ่มต้น
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent"></div>
        </div>

        {/* Preview Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            High-Converting Freelance Service Banner
          </p>
          <p className="text-gray-500 text-xs mt-1">
            1200x628px - Optimized for marketplace thumbnails
          </p>
        </div>
      </div>
    </div>
  );
}