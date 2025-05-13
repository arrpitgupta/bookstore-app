import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { deleteBookById, updateBookPrice } from "../service/api";

const BookCard = ({ book, onDelete, onUpdate }) => {
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPrice, setNewPrice] = useState(book.price);

  // const handleDelete = async (e) => {
  //   e.stopPropagation(); 
  //   const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"?`);
  //   if (confirmed) {
  //     try {
  //       await deleteBookById(book._id);
  //       onDelete(book._id);
  //     } catch (error) {
  //       alert("Failed to delete book.");
  //       console.error(error);
  //     }
  //   }
  // };
    const handleEditClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handlePriceUpdate = async () => {
    try {
      const updatedBook = await updateBookPrice(book._id, newPrice);
      onUpdate(updatedBook);
      setShowModal(false);
    
    } catch (error) {
      alert(error,"Failed to update price.");
    }
  };

  return (
    <>
    <motion.div
      className="w-82 h-96 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
      >
      
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl bg-white shadow-xl p-4 flex flex-col justify-between">
          
          <div className="absolute top-4 right-2 flex gap-2 z-10">
            <button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700">
              <Pencil size={18} />
            </button>
            {/* <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button> */}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Genre:</strong> {book.genre}
            </p>
             <p className="text-sm text-gray-500 mt-2">
            <strong>Published Year:</strong> {book.publishedYear}
          </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-green-700">₹{book.price}</p>
            <p className="text-sm text-gray-400 mt-1">Click to view more</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 rounded-xl bg-gray-100 shadow-xl p-4 overflow-hidden">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="text-sm text-gray-700 mb-4 line-clamp-6">{book.description}</p>
         
        </div>
      </motion.div>
    </motion.div>
     {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-xl font-semibold mb-4">Update Price</h2>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full p-2 border rounded mb-4"
            
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handlePriceUpdate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    publishedYear: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

};

export default BookCard;
