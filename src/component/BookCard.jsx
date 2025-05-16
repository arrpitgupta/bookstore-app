import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import { deleteBookById, updateBookPrice } from "../service/api";
import noImage from "/assets/no_image.jpg";

const BookCard = ({ book, onDelete, onUpdate }) => {
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPrice, setNewPrice] = useState(book.price);

  //  const handleDelete = async (e) => {
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
      alert("Failed to update price.");
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        className="w-72 h-[460px] relative cursor-pointer [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-gray-100 rounded-xl shadow-lg p-4 flex flex-col justify-between">
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button
                onClick={handleEditClick}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              {/* Uncomment to enable delete */}
              {/* <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button> */}
            </div>

           
              <div className="flex justify-center mb-4">
                <img
                  src={book.imageUrl || noImage}
                  alt={book.title}
                  className="w-40 h-56 object-cover rounded-md shadow-sm"
                />
              </div>
           

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1 truncate">
                by {book.author}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Category:</span> {book.category}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Year:</span> {book.publishedYear}
              </p>
            </div>

            <div className="text-center mt-3">
              <p className="text-lg font-bold text-green-700">₹{book.price}</p>
              <p className="text-xs text-gray-400">Click to view description</p>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 bg-gray-100 rounded-xl shadow-lg p-4 overflow-hidden flex flex-col">
            <h4 className="flex gap-2 text-lg font-semibold mb-2 text-gray-800">
              {" "}
              <BookOpen />
              Description
            </h4>
            <p className="text-sm text-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {book.description}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Price Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Update Price
            </h2>
            <input
              type="number"
              min="0"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePriceUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Update
              </button>
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
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
