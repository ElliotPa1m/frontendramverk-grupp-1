import { NavLink } from "react-router-dom";

// Main navigation bar with links to all pages
function Navbar() {
  return (
    <header className="w-100vw bg-white/80">
      <nav className="max-w-[1500px] mx-auto flex items-center justify-between">
        <NavLink to="/">
          <div className="flex h-20 sm:h-10 max-w-[150px] mt-1 ms-1">
            <img
              src="/logos/new-logo.png"
              className="h-full object-contain"
              alt="Receptboken logo"
            />
          </div>
        </NavLink>
        {/* the "isActive" changes to color of the button depending on what page you are on */}
        <div className="flex flex-col sm:flex-row sm:gap-8 p-2 pe-4 sm:px-4 sm:py-2 me-1 sm:me-0 text-right">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `barlow-condensed-light hover:text-button transition-colors ${isActive ? "text-button" : "text-text"}`
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/my-recipes"
            className={({ isActive }) =>
              `barlow-condensed-light hover:text-button transition-colors ${isActive ? "text-button" : "text-text"}`
            }
          >
            My Recipes
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `barlow-condensed-light hover:text-button transition-colors ${isActive ? "text-button" : "text-text"}`
            }
          >
            Create Recipe
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
