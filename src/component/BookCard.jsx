import PropTypes from "prop-types";

const BookCard = ({ book }) => (
    <div className="book-card">
      
      <div className="content">
        <h3 className="title">{book.title}</h3>
        <p className="author">by {book.author}</p>
        <p className="category"><strong>Category:</strong> {book.category}</p>
        <p className="price"><strong>Genre:</strong> {book.genre}</p>
        <p className="price"><strong>Price:</strong> ₹{book.price}</p>
        <p className="price"><strong>Publish Year:</strong> {book.publishedYear}</p>
        <p className="description">{book.description}</p>
        {/* <button className="btn-primary">View Details</button> */}
      </div>
    </div>
  );
  
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    publishedYear: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
  export default BookCard;
  