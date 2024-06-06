import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';

const NavLink = ({ path, text }) => {
  return (
    <button>
      <Link to={path} style={{ textDecoration: 'none' }}>
        {text}
      </Link>
    </button>
  );
};

const Navbar = () => {
  return (
    <div style={{ padding: '10px 0px' }}>
      <NavLink path="/login" text="Login" />
      <NavLink path="/" text="Catch" />
      <NavLink path="/captured" text="Captured" />
      <NavLink path="/register" text="Register" />
      <Logout />
    </div>
  );
};

export default Navbar;
