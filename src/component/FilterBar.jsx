import PropTypes from "prop-types";

const FilterBar = ({ filters, categories, onFilterChange }) => {
  return (
    <div className="filter-bar-container">
      <select
        className="filter-select"
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="filter-input"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => onFilterChange("minPrice", e.target.value)}
      />
      <input
        type="number"
        className="filter-input"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange("maxPrice", e.target.value)}
      />

      <select
        className="filter-select"
        value={filters.sortBy}
        onChange={(e) => onFilterChange("sortBy", e.target.value)}
      >
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
        <option value="publishedYear">Sort by Year</option>
      </select>

      <select
        className="filter-select"
        value={filters.sortOrder}
        onChange={(e) => onFilterChange("sortOrder", e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
FilterBar.propTypes = {
    filters: PropTypes.shape({
      query: PropTypes.string,
      category: PropTypes.string,
      sortBy: PropTypes.string,
      sortOrder: PropTypes.string,
      minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      page: PropTypes.number,
      limit: PropTypes.number,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

export default FilterBar;
