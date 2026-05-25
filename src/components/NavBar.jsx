import { NavLink } from "react-router-dom";

// Main navigation bar with links to all pages
function Navbar() {
  return (
    <nav className="flex items-center justify-between p-2 pe-4 sm:px-8 sm:py-4 bg-white/80">
      <NavLink to="/">
        <div className="flex h-20 max-w-[150px]">
          <img
            src="/logos/logga-test-2.png"
            className="h-full object-contain"
            alt="Receptboken logo"
          />
        </div>
      </NavLink>
      {/* the "isActive" changes to color of the button depending on what page you are on */}
      <div className="flex flex-col sm:flex-row sm:gap-8">
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
