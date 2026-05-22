import { NavLink } from "react-router-dom";

// Main navigation bar with links to all pages
function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white/80">

            <div className="flex h-20">
                <img src="/design/logos/logga-test-2.png" className="h-full object-contain" alt="Receptboken logo"></img>
            </div>
                {/* the "isActive" changes to color of the button depending on what page you are on */}
            <div className="flex gap-8">
                <NavLink
                    to="/" className={({ isActive }) => `barlow-condensed-light text-text hover:text-button transition-colors ${isActive ? "text-button" : ""}`}>
                    Home
                </NavLink>

                <NavLink
                    to="/search" className={({ isActive }) => `barlow-condensed-light text-text hover:text-button transition-colors ${isActive ? "text-button" : ""}`}>
                    Search
                </NavLink>

                <NavLink
                    to="/my-recipes" className={({ isActive }) => `barlow-condensed-light text-text hover:text-button transition-colors ${isActive ? "text-button" : ""}`}>
                    My Recipes
                </NavLink>
                <NavLink
                    to="/create" className={({ isActive }) => `barlow-condensed-light text-text hover:text-button transition-colors ${isActive ? "text-button" : ""}`}>
                    Create Recipe
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;