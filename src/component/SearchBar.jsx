import PropTypes from "prop-types";
import { useState } from "react";

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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
SearchBar.propTypes  = { onSearch: PropTypes.func.isRequired };

export default SearchBar;
