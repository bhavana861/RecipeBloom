import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import {  useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);


  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
      navigate("/");   
    return;
    }
    setIsOpen(true);
  };


  return (
    <nav className="navbar">

      <div className="nav-logo">
        🍴 <span>RecipeBloom</span>
      </div>


      <div className="nav-links">

        <NavLink to="/"
          className={({isActive}) => isActive ? "active" : ""}
        >
          Home
        </NavLink>


        <NavLink
          to={!isLogin ? "/myRecipe" : "/"}
          onClick={() => isLogin && setIsOpen(true)}
          className={({isActive}) => isActive ? "active" : ""}
        >
          My Recipe
        </NavLink>


        <NavLink
          to={!isLogin ? "/favRecipe" : "/"}
          onClick={() => isLogin && setIsOpen(true)}
          className={({isActive}) => isActive ? "active" : ""}
        >
          Favourites
        </NavLink>


      </div>


      <button onClick={checkLogin} className="login-btn">
        {isLogin ? "Login" : "Logout"}
      </button>


      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

    </nav>
  );
};

export default Navbar;