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
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Line = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771h-.001zM6.466 8.108c0-.345.282-.63.63-.63h2.808c.346 0 .627.285.627.63 0 .349-.281.63-.627.63H8.25v1.125h1.755c.346 0 .627.283.627.63 0 .344-.281.629-.627.629H8.25v1.125h1.755c.346 0 .627.285.627.631 0 .345-.281.63-.627.63H7.096c-.345 0-.63-.285-.63-.63V8.108zM4.322 11.433c-.172-.305-.434-.521-.759-.521-.345 0-.63.285-.63.631 0 .244.154.474.391.585l.627.285c.627.285 1.018.945 1.018 1.65 0 1.035-.854 1.86-1.9 1.86-1.049 0-1.9-.825-1.9-1.86 0-.344.281-.629.626-.629.345 0 .63.285.63.629 0 .345.282.631.631.631.345 0 .627-.285.627-.631 0-.24-.154-.474-.391-.585l-.627-.285c-.627-.285-1.018-.945-1.018-1.65 0-1.035.854-1.86 1.9-1.86.525 0 1.008.21 1.365.569l.391.391c.244.244.244.645 0 .889-.244.244-.645.244-.889 0l-.391-.391c-.154-.154-.36-.244-.569-.244-.345 0-.63.285-.63.631 0 .244.154.474.391.585l.627.285c.627.285 1.018.945 1.018 1.65 0 1.035-.854 1.86-1.9 1.86-1.049 0-1.9-.825-1.9-1.86 0-.344.281-.629.626-.629.345 0 .63.285.63.629 0 .345.282.631.631.631.345 0 .627-.285.627-.631 0-.24-.154-.474-.391-.585l-.627-.285c-.627-.285-1.018-.945-1.018-1.65 0-1.035.854-1.86 1.9-1.86.525 0 1.008.21 1.365.569l.391.391c.244.244.244.645 0 .889-.244.244-.645.244-.889 0l-.391-.391c-.154-.154-.36-.244-.569-.244z" />
  </svg>
);

// Mock data
const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    image: '/images/hotel/deluxe_room.png',
    description: 'Elegant room with city view, king-size bed, and modern amenities',
    features: ['King Bed', 'City View', 'Minibar', 'Work Desk'],
    size: '35 m²',
    capacity: 2
  },
  {
    id: 2,
    name: 'Executive Suite',
    image: '/images/hotel/executive_suite.png',
    description: 'Spacious suite with a separate living area and premium facilities',
    features: ['King Bed', 'Living Room', 'Jacuzzi', 'Kitchenette'],
    size: '65 m²',
    capacity: 3
  },
  {
    id: 3,
    name: 'Family Suite',
    image: '/images/hotel/family_suite.png',
    description: 'Perfect for families with connecting rooms and kid-friendly amenities',
    features: ['2 Bedrooms', 'Living Room', 'Kitchen', 'Kids Area'],
    size: '95 m²',
    capacity: 5
  },
  {
    id: 4,
    name: 'Presidential Suite',
    image: '/images/hotel/presidential_suite.png',
    description: 'Ultimate luxury with panoramic views and personalized service',
    features: ['3 Bedrooms', 'Private Pool', 'Butler Service', 'Piano'],
    size: '150 m²',
    capacity: 6
  }
];

const facilities = [
  { icon: Waves, name: 'Swimming Pool', description: 'Infinity pool with stunning ocean view' },
  { icon: Wifi, name: 'Free WiFi', description: 'High-speed internet throughout the hotel' },
  { icon: Heart, name: 'Spa & Wellness', description: 'Full-service spa and relaxing treatments' },
  { icon: Utensils, name: 'Restaurant', description: 'Fine dining and local cuisine' },
  { icon: Dumbbell, name: 'Fitness Center', description: 'Modern gym equipment available 24/7' },
];

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    avatar: <UserCircle className="h-12 w-12" />,
    rating: 5,
    text: 'Beautiful hotel with excellent service! The rooms are clean and comfortable, and the staff are very friendly and helpful.',
    role: 'Business Traveler'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: <UserCircle className="h-12 w-12" />,
    rating: 5,
    text: 'A perfect getaway! The beach view is stunning and the facilities are outstanding. The spa experience was amazing.',
    role: 'Tourist'
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: <UserCircle className="h-12 w-12" />,
    rating: 4,
    text: 'Great experience overall! The hotel exceeded expectations with its location and beautifully designed rooms.',
    role: 'Family Vacation'
  },
  {
    id: 4,
    name: 'Emma Davis',
    avatar: <UserCircle className="h-12 w-12" />,
    rating: 5,
    text: 'Pure luxury! From check-in to check-out, everything was perfect. Will definitely come back again.',
    role: 'Couple Retreat'
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
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold tracking-wide text-gray-900">
                Porcelain Bay
                <span className="text-[#c6a96b] ml-1">Resort</span>
              </h1>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-10">
              {[
                { id: 'about', label: 'About' },
                { id: 'rooms', label: 'Rooms' },
                { id: 'facilities', label: 'Facilities' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  {item.label}

                  {/* underline hover */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#c6a96b] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>



            {/* Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg p-4">
              <div className="flex flex-col space-y-3">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'rooms', label: 'Rooms' },
                  { id: 'facilities', label: 'Facilities' },
                  { id: 'gallery', label: 'Gallery' },
                  { id: 'testimonials', label: 'Reviews' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-gray-900 transition"
                  >
                    {item.label}
                  </button>
                ))}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl text-white"
          >
            {/* badge */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-light tracking-wide">
                Ultimate Luxury Design
              </span>
            </div>

            {/* title */}
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-wide">
              Experience the Art of Minimal Luxury
            </h1>

            {/* description */}
            <p className="text-xl md:text-2xl mb-12 text-white/80 font-light leading-relaxed max-w-2xl">
              Discover a world of elegance and sophistication, where every detail is carefully crafted
              to deliver an exceptional luxury experience.
            </p>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(251, 191, 36, 0.9)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('rooms')}
                className="px-8 py-4 bg-amber-500/80 backdrop-blur-sm border border-amber-400/30 text-white font-light rounded-lg hover:bg-amber-500/90 transition-all duration-500 flex items-center justify-center gap-2 shadow-sm"
              >
                View Rooms
                <ChevronRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-light rounded-lg hover:bg-white/20 transition-all duration-500"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Hotel */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* glow background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e7dcc7] rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              About Porcelain Bay Resort
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A luxury beachfront resort offering an exceptional escape, where refined elegance
              meets privacy and tranquility.
            </p>

            {/* divider */}
            <div className="w-16 h-[2px] bg-[#c6a96b] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* image */}
            <div className="relative">
              <img
                src="/images/hotel/hotel_Interior.png"
                alt="Hotel Interior"
                className="rounded-3xl shadow-xl"
              />
              <div className="absolute inset-0 rounded-3xl border border-white/40"></div>
            </div>

            {/* content */}
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">
                An Unforgettable Luxury Experience
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Porcelain Bay Resort is a five-star beachfront destination located in one of Phuket’s most
                stunning coastal areas. With over 200 thoughtfully designed rooms, each space is crafted
                to provide comfort, elegance, and complete privacy.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Ideally situated near the heart of the city, the resort offers convenient access to shopping
                centers, renowned restaurants, and iconic natural attractions, making it the perfect blend
                of relaxation and exploration.
              </p>

              {/* highlight */}
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-2 h-2 bg-[#c6a96b] rounded-full"></div>
                Prime beachfront location with panoramic ocean views
              </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* image */}
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                </div>

                {/* content */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {room.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {room.description}
                  </p>

                  {/* info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-[#c6a96b]" />
                      <span>{room.capacity} people</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-[#c6a96b]" />
                      <span>{room.size} sq.m.</span>
                    </div>
                  </div>

                  {/* features */}
                  <div className="flex flex-wrap gap-2">
                    {room.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-[#f1ede6] text-gray-700 rounded-full"
                      >
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
      <section id="facilities" className="py-20  relative overflow-hidden">
        {/* soft glow background */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Facilities & Amenities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enjoy a complete range of premium services and facilities designed for your ultimate comfort and relaxation.
            </p>

            {/* luxury divider */}
            <div className="w-16 h-[2px] bg-[#c6a96b] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                {/* icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#f1ede6] to-[#e7dcc7] rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition shadow-md">
                  <facility.icon className="h-8 w-8 text-[#c6a96b]" />
                </div>

                {/* title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {facility.name}
                </h3>

                {/* desc */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
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
      <section className="py-20  relative overflow-hidden">
        {/* soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]  rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm mb-6">
              <Check className="h-4 w-4 text-[#c6a96b]" />
              Special Offer
            </div>

            {/* title */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Enjoy <span className="text-[#c6a96b]">20% Off</span> This Month
            </h2>

            {/* description */}
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book your stay this month and receive an exclusive 20% discount on all room types,
              along with a premium and unforgettable experience.
            </p>
            {/* button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-[#1f2937] text-white font-medium rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              Make a Reservation
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
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Guest Reviews
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what our guests have to say about their unforgettable stay with us.
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
      <section id="contact" className="py-20  relative overflow-hidden">
        {/* glow */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are here to assist you with any inquiries and ensure your stay is seamless and memorable.
            </p>

            <div className="w-16 h-[2px] bg-[#c6a96b] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[450px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps?q=7.839289,98.359906&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* contact */}
            <div className="space-y-8">
              <h3 className="text-2xl font-medium text-gray-900">
                Contact Information
              </h3>

              {/* phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f1ede6] rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-[#c6a96b]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact Number</h4>
                  <p className="text-gray-600">+66 65 332 4270</p>
                </div>
              </div>

              {/* facebook */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f1ede6] rounded-xl flex items-center justify-center">
                  <Facebook className="h-5 w-5 text-[#c6a96b]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Facebook</h4>
                  <p className="text-gray-600">/PorcelainBayResort</p>
                </div>
              </div>

              {/* email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f1ede6] rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#c6a96b]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">info@porcelainbayresort.com</p>
                  <p className="text-gray-600">reservation@porcelainbayresort.com</p>
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