// import { useState, useEffect, useRef } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Saved, Create, Detailed Recipe View or any other page that is added) will get injected here */}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
