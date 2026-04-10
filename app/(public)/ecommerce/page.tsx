'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, Headphones, Package, Mail, Phone, MapPin, ChevronRight, Check, Sparkles } from 'lucide-react';

// Custom SVG components for deprecated social media icons
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
  </svg>
);

// Mock data
const featuredProducts = [
  {
    id: 1,
    name: 'หูฟังไร้สายพรีเมียม',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: '/images/ecommerce/headphones.png',
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'นาฬิกาสมาร์ทโปร',
    price: 5999,
    originalPrice: 7499,
    discount: 20,
    image: '/images/ecommerce/smartwatch.png',
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: 'ขาตั้งโน้ตบุ๊คพรีเมียม',
    price: 1499,
    originalPrice: 2399,
    discount: 38,
    image: '/images/ecommerce/stand.png',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 4,
    name: 'แท่นชาร์จไร้สาย',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    image: '/images/ecommerce/charger.png',
    rating: 4.4,
    reviews: 156
  },
  {
    id: 5,
    name: 'ลำโพงบลูทูทแม็กซ์',
    price: 2699,
    originalPrice: 3899,
    discount: 31,
    image: '/images/ecommerce/speaker.png',
    rating: 4.7,
    reviews: 92
  },
  {
    id: 6,
    name: 'ฮับ USB-C โปร',
    price: 1049,
    originalPrice: 1499,
    discount: 30,
    image: '/images/ecommerce/hub.png',
    rating: 4.3,
    reviews: 67
  }
];

const getRandomAvatar = (gender: 'men' | 'women') => {
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const testimonials = [
  {
    id: 1,
    name: 'กิตติพงศ์ ศรีสุข',
    avatar: getRandomAvatar('men'),
    rating: 5,
    text: 'สินค้าคุณภาพเยี่ยมและบริการลูกค้าดีเยี่ยม! คุณภาพเกินคาดหมายมาก',
    role: 'เจ้าของธุรกิจออนไลน์'
  },
  {
    id: 2,
    name: 'พิมพ์ชนก วัฒนชัย',
    avatar: getRandomAvatar('women'),
    rating: 5,
    text: 'จัดส่งเร็วมาก แพ็กของดี ประทับใจสุด ๆ',
    role: 'แม่ค้าออนไลน์'
  },
  {
    id: 3,
    name: 'ธนกร อินทร์แก้ว',
    avatar: getRandomAvatar('men'),
    rating: 4,
    text: 'ใช้งานง่าย ระบบดี ช่วยเพิ่มยอดขายได้จริง',
    role: 'เจ้าของร้านค้าปลีก'
  },
  {
    id: 4,
    name: 'ชลธิชา บุญมี',
    avatar: getRandomAvatar('women'),
    rating: 5,
    text: 'สินค้าหลากหลาย คุณภาพดี ราคาคุ้มค่า แนะนำเลยค่ะ',
    role: 'ผู้ประกอบการ SME'
  }
];

const benefits = [
  {
    icon: Truck,
    title: 'จัดส่งเร็ว',
    description: 'จัดส่งฟรีสำหรับออเดอร์ที่มากกว่า 1,500 บาท จัดส่งภายใน 2-3 วันทำการ'
  },
  {
    icon: Shield,
    title: 'ชำระเงินปลอดภัย',
    description: 'การชำระเงินปลอดภัย 100% ด้วยการเข้ารหัส SSL และการคุ้มครองผู้ซื้อ'
  },
  {
    icon: Package,
    title: 'รับประกันคุณภาพ',
    description: 'รับประกันคืนเงินภายใน 30 วันสำหรับสินค้าทุกชิ้น ไม่ต้องคำถาม'
  },
  {
    icon: Headphones,
    title: 'บริการลูกค้า 24/7',
    description: 'บริการลูกค้าตลอด 24 ชั่วโมงทางแชท อีเมล และโทรศัพท์'
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function EcommercePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: number) => {
    const product = featuredProducts.find((product) => product.id === productId);
    if (product) {
      const existingItem = cartItems.find((item) => item.id === productId);
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Shopora</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors">สินค้า</a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">ประโยชน์</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors">รีวิว</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">ติดต่อ</a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
                
                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      ) : (
                        cartItems.map((item) => (
                          <div key={item.id} className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">¥{item.price.toLocaleString('th-TH')}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <button 
                                    onClick={() => {
                                      const newItems = cartItems.map(cartItem => 
                                        cartItem.id === item.id 
                                          ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
                                          : cartItem
                                      );
                                      setCartItems(newItems.filter(cartItem => cartItem.quantity > 0));
                                    }}
                                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => {
                                      setCartItems(cartItems.map(cartItem => 
                                        cartItem.id === item.id 
                                          ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                          : cartItem
                                      ));
                                    }}
                                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs"
                                  >
                                    +
                                  </button>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-semibold text-gray-900">Total:</span>
                          <span className="text-lg font-bold text-gray-900">
                            ฿{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('th-TH')}
                          </span>
                        </div>
                        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                ขยายธุรกิจของคุณวันนี้
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                เพิ่มยอดขายด้วย
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {' '}สินค้าพรีเมียม
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                จัดหาสินค้าคุณภาพสูงในราคาที่แข่งขันได้ จัดส่งเร็ว ชำระเงินปลอดภัย และบริการลูกค้า 24 ชม. เพื่อช่วยธุรกิจของคุณเจริญเติบโต
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  ช้อปเลย
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  ดูสินค้า
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square bg-white rounded-2xl shadow-inner flex items-center justify-center">
                  <img src="/images/ecommerce/shopora.png" alt="Shopora" className="h-full w-full object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">สินค้าแนะนำ</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">ค้นพบสินค้าขายดีที่คนรักมากมาย</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">฿{product.price.toLocaleString('th-TH')}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">฿{product.originalPrice.toLocaleString('th-TH')}</span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product.id)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    เพิ่มลงตะกร้า
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">ทำไมต้องเลือกเรา</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">เรามอบบริการและคุณภาพที่ดีที่สุดสำหรับความต้องการทางธุรกิจของคุณ</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              โปรโมชั่นจำกัดเวลา
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">แฟลชเซล - ลดสูงสุด 50%!</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              อย่าพลาดการลดราคาที่ใหญ่ที่สุดของปี สินค้าพรีเมียมในราคาที่ไม่มีใครเทียบได้
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              ช้อปในโปรโมชั่น
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">รีวิวลูกค้า</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">ดูว่าลูกค้าที่พึงพอใจของเราพูดอะไรกันบ้าง</p>
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
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                รับส่วนลด 10% สำหรับออเดอร์แรก
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                สมัครรับจดหมายข่าวของเราและรับข้อเสนอพิเศษและอัปเดตล่าสุด
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="กรอกอีเมลของคุณ"
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  สมัครสมาชิก
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Shopora</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                พันธมิตรที่เชื่อถือได้ของคุณสำหรับสินค้าพรีเมียมและบริการที่ยอดเยี่ยม
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ลิงก์ด่วน</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-white transition-colors">สินค้า</a></li>
                <li><a href="#" className="hover:text-white transition-colors">สนับสนุน</a></li>
                <li><a href="#" className="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ข้อมูลติดต่อ</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@shophub.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +66 2 123 4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  กรุงเทพมหานคร 10110
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ติดตามเรา</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Shopora. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}