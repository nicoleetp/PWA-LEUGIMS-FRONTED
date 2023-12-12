import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// components
import { Loader } from "../loaders/Loader";
// api
import { deleteService, getAllServices } from "api/serviceApi";
// hooks
import { useAdmin } from "hooks/useAdmin";
// modals
import { ModalServiceView } from "../modals/services/ModalServiceView";
// icons
import { FaRegTrashAlt, FaRegEdit, FaRegEye } from "react-icons/fa";

export const ListServices = () => {
  const { isOpen, onOpenModal } = useAdmin();
  const [listServices, setListServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await getAllServices();
        setListServices(serviceData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los servicios: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId);
      toast.success(`El servicio fue eliminado correctamente`);
      setListServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
  };

  const openModalWithUser = (serviceId) => {
    const service = listServices.find((service) => service._id === serviceId);
    setSelectedService(service);
    setSelectedServiceId(serviceId);
    onOpenModal();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {listServices.map((service) => (
                <tr key={service._id} className="bg-white">
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {service?.categoryService.name}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                    <>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                      >
                        <FaRegTrashAlt />
                      </button>
                      <Link
                        to={`/edit-service/${service._id}`}
                        className="w-7 h-7 text-xs bg-indigo-500 rounded-2xl text-white hover.bg-indigo-600 duration-500 ease-out flex items-center justify-center"
                      >
                        <FaRegEdit />
                      </Link>
                    </>
                    <button
                      onClick={() => openModalWithUser(service._id)}
                      className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover.bg-pink-600 duration-500 ease-out flex items-center justify-center"
                    >
                      <FaRegEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedServiceId && (
            <ModalServiceView
              isOpen={isOpen}
              service={selectedService}
              onClose={() => setSelectedServiceId(null)}
            />
          )}
        </div>
      )}
    </>
  );
};
