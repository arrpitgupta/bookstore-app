const BookCard = ({ book }) => (
    <div className="book-card">
      
      <div className="content">
        <h3 className="title">{book.title}</h3>
        <p className="author">by {book.author}</p>
        <p className="category"><strong>Category:</strong> {book.category}</p>
        <p className="price"><strong>Price:</strong> ₹{book.price}</p>
        <p className="description">{book.description}</p>
        {/* <button className="btn-primary">View Details</button> */}
      </div>
    </div>
  );
  
  export default BookCard;
  