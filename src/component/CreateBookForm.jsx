import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../service/api';
import { motion } from 'framer-motion';

const CreateBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    price: '',
    category: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBook(formData);
      alert('Book created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📚 Create a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Author', name: 'author', type: 'text' },
          { label: 'Published Year', name: 'publishedYear', type: 'number' },
          { label: 'Genre', name: 'genre', type: 'text' },
          { label: 'Price', name: 'price', type: 'number', step: '0.01' },
          { label: 'Category', name: 'category', type: 'text' },
        ].map(({ label, name, type, step }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              {...(step && { step })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>
        ))}

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Book'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateBookForm;
