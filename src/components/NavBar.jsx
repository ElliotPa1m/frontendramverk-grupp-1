import { NavLink } from "react-router-dom";

// Main navigation bar with links to all pages
function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white/80">
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
      <div className="flex flex-col sm:flex-row sm:gap-8 p-2 pe-4 sm:px-4 sm:py-2 ">
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
  );
}

export default Navbar;
