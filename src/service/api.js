import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api/v1/books';

export const fetchBooks = async (query = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`, { params: { query: query } });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
export const createBook = async (bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create book');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  };