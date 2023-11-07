import { useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// api
import { deleteUser } from "api/userApi";
// hooks
import { useAuth } from "hooks/useAuth";

export const ListUsers = ({ users }) => {
  const { user } = useAuth();
  const [userList, setUserList] = useState(users);

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      toast.success(result?.message);

      // Actualiza la lista después de eliminar el usuario
      const updatedUserList = userList.filter((user) => user._id !== userId);
      setUserList(updatedUserList);
    } catch (error) {
      console.log(error);
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Nombre Completo
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              DNI
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Celular
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map(({ _id, name, lastname, dni, phone, email }) => (
            <tr key={_id} className="bg-white">
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                {name} {lastname}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {dni}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {phone}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {email}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                {name != "Admin" && (
                  <>
                    {_id !== user.userId && (
                      <button
                        onClick={() => handleDeleteUser(_id)}
                        className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                      >
                        <FaRegTrashAlt />
                      </button>
                    )}
                    <Link
                      to=""
                      className="w-7 h-7 text-xs bg-indigo-500 rounded-2xl text-white hover:bg-indigo-600 duration-500 ease-out flex items-center justify-center"
                    >
                      <FaRegEdit />
                    </Link>
                  </>
                )}
                <button className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover:bg-pink-600 duration-500 ease-out flex items-center justify-center">
                  <FaRegEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
