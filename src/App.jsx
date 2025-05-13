import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import HomePage from "./page/HomePage";
import CreateBookForm from "./component/CreateBookForm";
import LandingPage from "./page/LandingPage";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <Link
              to="/">
          <div className="text-xl font-bold landing-heading">Bookstore</div>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/home"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Add New Book
            </Link>
          </div>
        </nav>
      )}
      <div className={`${!hideNavbar ? "pt-20" : ""}`}>
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
