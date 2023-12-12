import { useAdmin } from "hooks/useAdmin";
import { Link } from "react-router-dom";

export const ModalProfile = ({ isOpen, user, onClose }) => {
  const { onCloseModal } = useAdmin();

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative bg-white z-50 rounded-xl w-96 max-w-4/5 md:w-1/3 top-12vh m-auto shadow-xl">
            <h2 className="bg-gray-200 text-gray-700 text-2xl font-bold text-center py-3 rounded-t-xl">
              Perfil de usuario de{" "}
              <span className="text-red-500 font-black uppercase">
                {user?.name}
              </span>
            </h2>
            <div className="p-5 flex flex-col items-center gap-2">
              {user && (
                <div className="grid grid-cols-2 gap-x-10">
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Nombre
                    </span>
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Apellidos
                    </span>
                    <span className="text-gray-900">{user.lastname}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      DNI
                    </span>
                    <span className="text-gray-900">{user.dni}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Celular
                    </span>
                    <span className="text-gray-900">{user.phone}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Email
                    </span>
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Dirección
                    </span>
                    <span className="text-gray-900">{user.address}</span>
                  </div>
                </div>
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    onCloseModal();
                    onClose();
                  }}
                  className="bg-red-500 rounded-xl px-10 py-2 text-white border-2 hover:border-red-500 hover:bg-transparent hover:text-red-500 active:bg-red-700/5 font-medium transition duration-200"
                >
                  Cerrar
                </button>
                {user?.name != "Admin" && (
                  <Link
                    to={`/user/${user?._id}`}
                    className="bg-indigo-500 rounded-xl px-8 py-2 text-white border-2 hover:border-indigo-500 hover:bg-transparent hover:text-indigo-500 active:bg-indigo-700/5 font-medium transition duration-200"
                  >
                    Ir a editar
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
