import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import logo from "../assets/images/logo-white.png"; 

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <NavLink to="/shop" className="nav-link">Shop</NavLink>
        <NavLink to="/home" className="logo-link">
          <img src={logo} alt="Logo sklepu" className="logo" />
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          <ShoppingCart size={32} />
        </NavLink>
      </div>
    </div>
  );
};
