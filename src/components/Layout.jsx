// import { useState, useEffect, useRef } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>
        {/* The child page that we are currently looking at (Search, Saved, Create, Detailed Recipe View or any other page that is added) will get injected here */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
