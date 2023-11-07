import React from "react";
import { BiLogOut } from "react-icons/bi";
import { getGreeting } from "helpers/validations";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useAuth() || [];
  const navigate = useNavigate();
  const greeting = getGreeting();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };
  const { name } = user;
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
      <h2 className="text-2xl md:text-3xl font-bold">
        {greeting}, <span className="text-primary-100 capitalize">{name}</span>
      </h2>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 font-medium bg-red-500 text-white py-2 px-5 cursor-pointer rounded-xl hover:bg-red-600 transition-colors duration-500 ease outline-none"
      >
        <BiLogOut /> Cerrar Sesión
      </button>
    </header>
  );
};
