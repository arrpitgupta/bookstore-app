import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FloatingBook = ({ src, index }) => {
  const delay = index * 0.2;
  const duration = 3 + index % 2;
  const yOffset = 15 + (index % 3) * 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ 
        opacity: { delay, duration: 0.8 },
        y: { delay, duration: 1.2 },
        rotate: { delay, duration: 1.5 }
      }}
      className="relative"
    >
      <motion.div
        animate={{ 
          y: [0, -yOffset, 0],
          rotate: [0, index % 2 === 0 ? -3 : 3, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: duration,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
        }}
        className="relative"
      >
        <img
          src={src}
          alt="book"
          className="w-32 h-48 md:w-36 md:h-52 object-cover rounded-md shadow-lg"
        />
        <motion.div 
          className="absolute inset-0 rounded-md bg-gradient-to-tr from-yellow-200/20 to-transparent"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
FloatingBook.propTypes = {
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default FloatingBook;
