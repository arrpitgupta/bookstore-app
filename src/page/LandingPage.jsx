import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import {useNavigate } from "react-router-dom";
import FloatingBook from "../component/FloatingBook";
import { useState } from "react";

const books = [
  "src/assets/book1.webp",
  "src/assets/book2.jpg",
  "src/assets/book3.jpg",
  "src/assets/book4.jpg",
  "src/assets/book5.jpg",
  "src/assets/book6.webp"
];

export default function LandingPage() {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);
  
    const handleNavigate = () => {
      setIsNavigating(true);
      setTimeout(() => {
        navigate("/home");
      }, 800);
    };
  return (
    
    <div className="relative min-h-screen bg-[#fafafa] overflow-hidden px-6">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: 'url("src/assets/book-background.jpg")' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      />

      <header className="relative z-10 py-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 landing-heading">Bookstore</h1>
        <motion.button 
              className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Purchase Now
            </motion.button>
      </header>

      <main className="relative z-10 text-center mt-20">
        <p className="text-sm text-gray-600 tracking-wider">GET YOUR STORY STARTED WITH US</p>
        <motion.h2
          className="text-5xl font-bold text-gray-900 mt-4 mb-10 landing-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          A Bookstore for Readers and Collectors
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-12 md:mt-20 mb-12">
              {books.map((src, i) => (
                <FloatingBook key={i} src={src} index={i} />
              ))}
            </div>

            <motion.div
              className="mt-16 md:mt-20 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={handleNavigate}
            >
              <motion.div 
                className="cursor-pointer"
                whileHover={{ scale: 1.1,  }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowDown className="text-yellow" size={28} />
              </motion.div>
            </motion.div>
      </main>
    </div>
  );
}
