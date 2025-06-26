import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl">Welcome to your blog dashboard!</h1>
      {/* You can map blog posts here later */}
    </div>
  );
};

export default Home;
