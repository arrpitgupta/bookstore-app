import { useEffect, useState } from "react";
import { fetchBooks, fetchCategories } from "../service/api";
import SearchBar from "../component/SearchBar";
import BookCard from "../component/BookCard";
import FilterBar from "../component/FilterBar";

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
  const handleDelete = (deletedId) => {
    setBooks((prev) => prev.filter((book) => book._id !== deletedId));
  };
  const handleUpdate = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
    );
    fetchBooks();
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-4">
        <FilterBar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading books...</p>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg font-medium">
          No books found.
        </p>
      )}

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={filters.page <= 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          ◀ Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {filters.page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-white-500 text-black rounded-md hover:bg-white-700 disabled:opacity-50"
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
