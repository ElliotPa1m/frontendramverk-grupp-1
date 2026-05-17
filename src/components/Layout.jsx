import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Hem knapp</Link>
        <Link to="/search">Search</Link>
        <Link to="/saved">Sparade recept</Link>
        <Link to="/create">Skapa recept</Link>
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Saved, Create, Detailed Recipe View or any other page that is added) will get injected here */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;