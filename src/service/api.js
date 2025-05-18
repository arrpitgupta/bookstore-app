import axios from "axios";
// const API_BASE_URL = "http://localhost:7000/api/v1/books";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_BASE_URL}/list?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  // console.log(response);

  return response.data;
};

export const createBook = async (data) => {
  return await axios.post(`${API_BASE_URL}/create`,data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteBookById = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/deleteBook/${id}`);
  return res.data;
};
export const updateBookPrice = async (id, price) => {
  const { data } = await axios.put(`${API_BASE_URL}/updateBook/${id}`, { price });
  return data;
};
