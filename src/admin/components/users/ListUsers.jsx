import { FaRegTrashAlt, FaRegEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// api
import { deleteUser } from "api/userApi";

export const ListUsers = ({ users }) => {
  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      toast.success(result?.message);
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
          {users.map((user) => (
            <tr key={user._id} className="bg-white">
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                {user.name} {user.lastname}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {user.dni}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {user.phone}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                {user.name != "Admin" && (
                  <>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                    >
                      <FaRegTrashAlt />
                    </button>
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
