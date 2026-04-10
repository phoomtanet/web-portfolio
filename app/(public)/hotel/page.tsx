'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Wifi, 
  Waves, 
  Utensils, 
  Dumbbell, 
  Heart, 
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Check,
  Users,
  Bed,
  UserCircle
} from 'lucide-react';

// Custom SVG components for social media icons
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Line = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771h-.001zM6.466 8.108c0-.345.282-.63.63-.63h2.808c.346 0 .627.285.627.63 0 .349-.281.63-.627.63H8.25v1.125h1.755c.346 0 .627.283.627.63 0 .344-.281.629-.627.629H8.25v1.125h1.755c.346 0 .627.285.627.631 0 .345-.281.63-.627.63H7.096c-.345 0-.63-.285-.63-.63V8.108zM4.322 11.433c-.172-.305-.434-.521-.759-.521-.345 0-.63.285-.63.631 0 .244.154.474.391.585l.627.285c.627.285 1.018.945 1.018 1.65 0 1.035-.854 1.86-1.9 1.86-1.049 0-1.9-.825-1.9-1.86 0-.344.281-.629.626-.629.345 0 .63.285.63.629 0 .345.282.631.631.631.345 0 .627-.285.627-.631 0-.24-.154-.474-.391-.585l-.627-.285c-.627-.285-1.018-.945-1.018-1.65 0-1.035.854-1.86 1.9-1.86.525 0 1.008.21 1.365.569l.391.391c.244.244.244.645 0 .889-.244.244-.645.244-.889 0l-.391-.391c-.154-.154-.36-.244-.569-.244-.345 0-.63.285-.63.631 0 .244.154.474.391.585l.627.285c.627.285 1.018.945 1.018 1.65 0 1.035-.854 1.86-1.9 1.86-1.049 0-1.9-.825-1.9-1.86 0-.344.281-.629.626-.629.345 0 .63.285.63.629 0 .345.282.631.631.631.345 0 .627-.285.627-.631 0-.24-.154-.474-.391-.585l-.627-.285c-.627-.285-1.018-.945-1.018-1.65 0-1.035.854-1.86 1.9-1.86.525 0 1.008.21 1.365.569l.391.391c.244.244.244.645 0 .889-.244.244-.645.244-.889 0l-.391-.391c-.154-.154-.36-.244-.569-.244z"/>
  </svg>
);

// Mock data
const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    image: '/images/hotel/deluxe_room.png',
    description: 'Elegant room with city view, king-size bed, and modern amenities',
    features: ['King Bed', 'City View', 'Mini Bar', 'Work Desk'],
    size: '35 ²',
    capacity: 2
  },
  {
    id: 2,
    name: 'Executive Suite',
    image: '/images/hotel/executive_suite.png',
    description: 'Spacious suite with separate living area and premium facilities',
    features: ['King Bed', 'Living Room', 'Jacuzzi', 'Kitchenette'],
    size: '65 ²',
    capacity: 3
  },
  {
    id: 3,
    name: 'Family Suite',
    image: '/images/hotel/family_suite.png',
    description: 'Perfect for families with connecting rooms and kid-friendly amenities',
    features: ['2 Bedrooms', 'Living Room', 'Kitchen', 'Kids Area'],
    size: '95 ²',
    capacity: 5
  },
  {
    id: 4,
    name: 'Presidential Suite',
    image: '/images/hotel/presidential_suite.png',
    description: 'Ultimate luxury with panoramic views and personalized service',
    features: ['3 Bedrooms', 'Private Pool', 'Butler Service', 'Piano'],
    size: '150 ²',
    capacity: 6
  }
];

const facilities = [
  { icon: Waves, name: ' Swimming Pool', description: 'Infinity pool with ocean view' },
  { icon: Wifi, name: ' WiFi', description: 'High-speed internet throughout' },
  { icon: Heart, name: ' Spa & Wellness', description: 'Full-service spa and massage' },
  { icon: Utensils, name: ' Restaurant', description: 'Fine dining and local cuisine' },
  { icon: Dumbbell, name: ' Fitness Center', description: '24/7 modern gym equipment' },
];

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    avatar: <UserCircle className="h-12 w-12 text-blue-500" />,
    rating: 5,
    text: 'Beautiful hotel with excellent service! The room was clean and comfortable. Staff was very helpful and friendly.',
    role: 'Business Traveler'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: <UserCircle className="h-12 w-12 text-purple-500" />,
    rating: 5,
    text: 'Perfect vacation spot! Amazing beach view and great facilities. The spa treatments were incredible.',
    role: 'Tourist'
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: <UserCircle className="h-12 w-12 text-green-500" />,
    rating: 4,
    text: 'Wonderful experience! The hotel exceeded our expectations. Great location and beautiful rooms.',
    role: 'Family Vacation'
  },
  {
    id: 4,
    name: 'Emma Davis',
    avatar: <UserCircle className="h-12 w-12 text-pink-500" />,
    rating: 5,
    text: 'Luxury at its finest! From check-in to check-out, everything was perfect. Will definitely return!',
    role: 'Couple Getaway'
  }
];

const galleryImages = [
  '/images/hotel/lobby.png',
  '/images/hotel/pool.png',
  '/images/hotel/restaurant.png',
  '/images/hotel/beach.png',
  '/images/hotel/spa.png',
  '/images/hotel/gym.png',
  '/images/hotel/terrace.png',
  '/images/hotel/presidential_suite.png'
];

export default function HotelPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Porcelain Bay Resort</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 transition-colors">
                เกี่ยวกับเรา
              </button>
              <button onClick={() => scrollToSection('rooms')} className="text-gray-600 hover:text-gray-900 transition-colors">
                ห้อง
              </button>
              <button onClick={() => scrollToSection('facilities')} className="text-gray-600 hover:text-gray-900 transition-colors">
                สิ่งอำนวยความสะดวก
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-gray-900 transition-colors">
                แกลเลอรี่
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900 transition-colors">
                คำแนะนำ
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors">
                ติดต่อเรา
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  เกี่ยวกับเรา
                </button>
                <button onClick={() => scrollToSection('rooms')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  ห้อง
                </button>
                <button onClick={() => scrollToSection('facilities')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  สิ่งอำนวยความสะดวก
                </button>
                <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  แกลเลอรี่
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  คำแนะนำ
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors text-left">
                  ติดต่อเรา
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="/images/hotel/header.png" 
            alt="Porcelain Bay Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              สัมผัสประสบการณ์การพักผ่อนระดับพรีเมียม
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              พักผ่อนอย่างเพลิดเพลินในบรรยากาศหรูหรา พร้อมวิวทะเลสวยงามและบริการระดับ 5 ดาว
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('rooms')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                ดูห้องพัก
                <ChevronRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                ติดต่อเรา
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Hotel */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              เกี่ยวกับ Porcelain Bay Resort
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              โรงแรมหรูหราตั้งอยู่บนชายหาดสวยงาม มอบประสบการณ์การพักผ่อนที่เหนือกว่าด้วยบริการระดับโลกและสิ่งอำนวยความสะดวกครบครัน
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/hotel/hotel_Interior.png" 
                alt="Hotel Interior"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ประสบการณ์การพักผ่อนที่ไม่เหมือนใคร
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Porcelain Bay Resort เป็นโรงแรมระดับ 5 ดาวที่ตั้งอยู่บนชายหาดสวยงามที่สุดในภูเก็ต เรามีห้องพักกว่า 200 ห้อง ที่ออกแบบมาเพื่อมอบความสะดวกสบายและความเป็นส่วนตัวสูงสุด
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ด้วยทำเลที่ตั้งใจกลางเมืองท่องเที่ยว ทำให้คุณสามารถเดินทางไปยังสถานที่สำคัญต่างๆ ได้อย่างสะดวก ไม่ว่าจะเป็นห้างสรรพสินค้า ร้านอาหารชื่อดัง หรือแหล่งท่องเที่ยวทางธรรมชาติ
              </p>
         
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section id="rooms" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img src={room.image} alt={room.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{room.capacity} </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{room.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Facilities */}
      <section id="facilities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white hover:bg-gray-50 transition-colors duration-300 group shadow-lg hover:shadow-xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <facility.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{facility.name}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-20 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Check className="h-4 w-4" />
              โปรโมชั่นพิเศษ
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              ลด 20% สำหรับเดือนนี้
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              จองห้องพักในเดือนนี้และรับส่วนลดพิเศษ 20% สำหรับทุกประเภทห้องพัก
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              รับส่วนลดเลย!
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              คำแนะนำจากลูกค้า
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              คำแนะนำจากลูกค้าที่พักผ่อนที่โรงแรมของเรา
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ติดต่อเรา
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ติดต่อเราเพื่อข้อมูลเพิ่มเติม
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=7.839289,98.359906&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ช่องทางการติดต่อ
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      เบอร์โทรศัพท์
                    </h4>
                    <p className="text-gray-600">+66 65 332 4270</p>
                  </div>
                </div>
                
            
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Facebook className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Facebook</h4>
                    <p className="text-gray-600">/PorcelainBayResort</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      ติดตามเรา
                    </motion.button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@porcelainbayresort.com</p>
                    <p className="text-gray-600">reservation@porcelainbayresort.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Porcelain Bay Resort</h3>
            <p className="text-gray-400 mb-6">
                เว็บไซต์นี้เป็นเพียงตัวอย่าง (Prototype) สำหรับการนำเสนอผลงานเท่านั้น 
                รูปภาพและเนื้อหาทั้งหมดใช้เพื่อการสาธิต
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Line className="h-5 w-5" />
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2026 Porcelain Bay Resort. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}