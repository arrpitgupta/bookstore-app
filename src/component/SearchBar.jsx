import PropTypes from "prop-types";
import { useState } from "react";
import { Search } from "lucide-react"; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      onSearch("");
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-lg mx-auto px-4 py-2 bg-white shadow-md rounded-full">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-grow px-4 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
      <button
        className="p-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full"
        onClick={handleSearch}
      >
        <Search size={18} />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
