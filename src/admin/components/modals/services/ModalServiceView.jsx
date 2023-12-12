import { useAdmin } from "hooks/useAdmin";
import { Link } from "react-router-dom";

export const ModalServiceView = ({ isOpen, service, onClose }) => {
  const { onCloseModal } = useAdmin();

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative bg-white z-50 rounded-xl w-96 md:w-1/2 m-auto shadow-xl">
            <h2 className="bg-gray-200 text-gray-700 text-2xl font-bold text-center py-3 rounded-t-xl">
              Servicio de{" "}
              <span className="text-red-500 font-black uppercase">
                {service.name}
              </span>
            </h2>
            <div className="p-5 flex flex-col gap-2">
              {service && (
                <div className="grid grid-cols-2 gap-x-10">
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Nombre
                    </span>
                    <span className="text-gray-900">{service.name}</span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Categoría
                    </span>
                    <span className="text-gray-900">
                      {service?.categoryService?.name}
                    </span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="uppercase font-bold text-gray-600">
                      Descripción:
                    </span>
                    <span className="text-gray-900">{service.description}</span>
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
                <Link
                  to={`/edit-service/${service._id}`}
                  className="bg-indigo-500 rounded-xl px-8 py-2 text-white border-2 hover:border-indigo-500 hover:bg-transparent hover:text-indigo-500 active:bg-indigo-700/5 font-medium transition duration-200"
                >
                  Ir a editar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
