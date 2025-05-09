import { useEffect, useState } from "react";
import { fetchBooks, fetchCategories } from "../service/api";
import SearchBar from "../component/SearchBar";
import BookCard from "../component/BookCard";
import FilterBar from "../component/FilterBar";
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
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    sortBy: "title",
    sortOrder: "asc",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 8,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooks(filters);
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching books", err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [filters]);


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="home-page" >
      <h1>Bookstore</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar filters={filters} categories={categories} onFilterChange={handleFilterChange} />
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
      <div className="pagination">
        <button
          className="page-btn"
          disabled={filters.page <= 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          ◀ Prev
        </button>
        <span className="page-count">Page {filters.page} of {totalPages}</span>
        <button
          className="page-btn"
          disabled={filters.page >= totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default HomePage;
