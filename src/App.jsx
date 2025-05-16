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
import { BookOpen, House } from "lucide-react";


const AppLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const hideNavbar = currentPath === "/";
  const isOnCreatePage = currentPath === "/create";
  const isOnHomePage = currentPath === "/home";

  return (
    <>
      {!hideNavbar && (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <Link to="/">
            <div className="text-xl font-bold landing-heading">Bookstore</div>
          </Link>
          <div className="flex space-x-4">
            {isOnCreatePage && (
              <Link
                to="/home"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <House />
              </Link>
            )}
            {isOnHomePage && (
              <Link
                to="/create"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <BookOpen/>
              </Link>
            )}
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
