import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../service/api';

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
    <div className="create-book-page">
      <h2>Create a New Book</h2>
      <form onSubmit={handleSubmit} className="create-book-form">
        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Author', name: 'author', type: 'text' },
          { label: 'Published Year', name: 'publishedYear', type: 'number' },
          { label: 'Genre', name: 'genre', type: 'text' },
          { label: 'Price', name: 'price', type: 'number', step: '0.01' },
          { label: 'Category', name: 'category', type: 'text' },
        ].map(({ label, name, type, step }) => (
          <div className="form-group" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              {...(step && { step })}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
