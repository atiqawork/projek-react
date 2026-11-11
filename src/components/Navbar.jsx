import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        RUTEIN<span>.</span>
      </NavLink>

      <div className="navbar-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/routes">Route</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
