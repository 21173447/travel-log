import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-semibold mb-4">Welcome to TRVL✈</h1>
        <p className="mb-6">Explore the world and create travel logs.</p>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block text-white bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-3 text-lg font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block text-white bg-green-500 hover:bg-green-600 rounded-md px-6 py-3 text-lg font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
