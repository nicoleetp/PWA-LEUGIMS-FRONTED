import { useState, useEffect } from "react";
// api
import { getAllUsers } from "api/userApi";
// componentes
import { ListUsers, Loader } from "admin/components";
// iconos
import { BsPersonAdd } from "react-icons/bs";
import { Link } from "react-router-dom";

export const UserView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
          Usuarios registrados
        </h1>

        <Link
          to="/new-user"
          className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
        >
          <BsPersonAdd /> Nuevo Usuario
        </Link>
      </div>

      <ListUsers users={users} />
    </div>
  );
};
