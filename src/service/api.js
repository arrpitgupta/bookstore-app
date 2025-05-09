import axios from "axios";
// const API_BASE_URL = "http://localhost:7000/api/v1/books";

const API_BASE_URL = 'https://bookstore-backend-iota.vercel.app/api/v1/books';

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
  console.log(response);

  return response.data;
};

export const createBook = async (bookData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};
