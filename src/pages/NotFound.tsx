
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-souk-300">404</h1>
          <h2 className="text-2xl font-semibold text-souk-900 mb-6">Page Not Found</h2>
          <p className="text-souk-700 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="bg-souk-700 hover:bg-souk-800 text-white py-3 px-8 rounded-md 
                    font-medium inline-block button-hover"
          >
            Back to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
