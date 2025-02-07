import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/HomePage';
import CreateBookForm from './component/CreateBookForm';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Add New Book</Link>
      </nav>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateBookForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
