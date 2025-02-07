import { useEffect, useState } from "react";
import { fetchBooks } from "../service/api";
import SearchBar from "../component/SearchBar";
import BookCard from "../component/BookCard";

// const dummyBooks = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     category: "Classic",
//     description: "A story of the Jazz Age in 1920s America.",
//     price: 10.99,
//     image: "https://via.placeholder.com/150",
//   },
  
// ];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async (query = "") => {
    setLoading(true);
    try {
      const data = await fetchBooks(query); 
      setBooks(data.books || []);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="home-page">
      <h1>Bookstore</h1>
      <SearchBar onSearch={loadBooks} />
      {loading ? (
        <p className="data-txt">Loading...</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="data-txt">No books found.</p>
      )}
    </div>
  );
};

export default HomePage;
