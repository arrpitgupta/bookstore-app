import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../service/api';
import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';

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

  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (coverImage) {
      form.append("coverImage", coverImage);
    }

    
    await createBook(form);
    alert('Book created successfully!');
    navigate('/home');
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
      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <div className="flex items-center justify-center gap-4">
            <label className="cursor-pointer flex items-center justify-center w-32 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-sm flex flex-col items-center">
                  <ImagePlus className="w-6 h-6 mb-1" />
                  Upload
                </div>
              )}
            </label>

            {previewUrl && (
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setPreviewUrl(null);
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
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
