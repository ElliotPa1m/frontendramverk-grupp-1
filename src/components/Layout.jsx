// import { useState, useEffect, useRef } from 'react'
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">LOGO</Link>
        <Link to="/search">Sök</Link>
        <Link to="/my-recipes">Sparade recept</Link>
        <Link to="/create">Skapa recept</Link>
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Saved, Create, Detailed Recipe View or any other page that is added) will get injected here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
