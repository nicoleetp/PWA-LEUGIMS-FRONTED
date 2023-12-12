import { useState } from "react";
import { Link } from "react-router-dom";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiMore2Fill,
  RiCloseFill,
  RiSettings3Line,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiKeyboardLine,
  RiSlideshowLine,
  RiUser3Line,
  RiFolderHistoryLine,
  RiMessage3Line,
} from "react-icons/ri";
import { BiCategoryAlt, BiCategory } from "react-icons/bi";
import { LiaProductHunt } from "react-icons/lia";
import { useAuth } from "hooks/useAuth";

export const Sidebar = () => {
  const { user } = useAuth() || [];

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState({
    usuarios: false,
    invoices: false,
  });

  const toggleDropdown = (dropdownName) => {
    setShowDropdowns({
      ...showDropdowns,
      [dropdownName]: !showDropdowns[dropdownName],
    });
  };

  const { name, lastname, email } = user;

  return (
    <>
      <div
        className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-4 h-[30vh]">
          <Link
            to={"/"}
            className="text-white font-extrabold uppercase text-2xl underline"
          >
            Leugims
          </Link>
          <h2 className="text-xl text-center capitalize text-white font-bold">
            {name} {lastname}
          </h2>
          <p className="bg-primary-100 py-2 px-4 rounded-full text-white">
            {email}
          </p>
        </div>
        {/* Nav */}
        <div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8 sidebar__scroll">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Dashboard
            </Link>
            <Link
              to="/users"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiUser3Line /> Usuarios
            </Link>
            <Link
              to="/slider"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiSlideshowLine /> Contenido
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFolderHistoryLine /> Historia
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiMessage3Line /> Mensajes
            </Link>
            <button
              onClick={() => toggleDropdown("inventario")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-primary-900/50"
            >
              <RiFileCopyLine /> Inventario
              {showDropdowns.inventario ? (
                <RiArrowDropUpLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>
            {showDropdowns.inventario && (
              <div className="p-2 bg-primary-900/50 rounded-xl transition-all duration-500 ease-in-out">
                <Link
                  to="/category-product"
                  className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
                >
                  <BiCategoryAlt /> Categoría Productos
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover-bg-primary-900/50 transition-colors"
                >
                  <LiaProductHunt /> Productos
                </Link>
                <Link
                  to="/category-service"
                  className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover-bg-primary-900/50 transition-colors"
                >
                  <BiCategory /> Categoría Servicios
                </Link>
                <Link
                  to="/services"
                  className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover-bg-primary-900/50 transition-colors"
                >
                  <RiKeyboardLine /> Servicios
                </Link>
              </div>
            )}
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl flex items-center gap-4">
            <RiSettings3Line /> <Link to="/config">Configuración</Link>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};
