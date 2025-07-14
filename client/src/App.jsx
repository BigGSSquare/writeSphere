import React from "react";
import Blogs from "./pages/Blogs.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateBlog from "./pages/Write.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogRead from "./pages/BlogRead.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import MyBlogs from "./pages/MyBlogs.jsx";
const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder="false" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/edit/:id" element={<EditBlog />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogRead />} />
        <Route path="/blog/edit/:id" element={<EditBlog />}></Route>
        <Route path="/MyBlogs" element={<MyBlogs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
