import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if not already

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
    
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
