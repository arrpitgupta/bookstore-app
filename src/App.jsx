import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './page/HomePage';
import CreateBookForm from './component/CreateBookForm';
import LandingPage from './page/LandingPage';

const AppLayout = () => {
  const location = useLocation();

  
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && (
        <nav className="navbar">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link">Add New Book</Link>
        </nav>
      )}
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreateBookForm />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
