import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// api
import { deleteSlider, getAllSlider } from "api/sliderApi";
// componets
import { Loader } from "../loaders/Loader";
// icons
import { FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export const ListSlider = () => {
  const [listSlider, setListSlider] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await getAllSlider();
        setListSlider(serviceData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los sliders: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteService = async (sliderId) => {
    try {
      await deleteSlider(sliderId);
      toast.success(`El slider fue eliminado correctamente`);
      setListSlider((prevSlider) =>
        prevSlider.filter((slider) => slider._id !== sliderId)
      );
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
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
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {listSlider.map((slider) => (
                <tr key={slider._id} className="bg-white">
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                    {slider.title}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {slider.description}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    <img
                      src={`${slider.image}`}
                      alt={slider.title}
                      className="w-20 rounded-xl"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                    <>
                      <button
                        onClick={() => handleDeleteService(slider._id)}
                        className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                      >
                        <FaRegTrashAlt />
                      </button>
                      <Link
                        to={`/edit-slider/${slider._id}`}
                        className="w-7 h-7 text-xs bg-indigo-500 rounded-2xl text-white hover.bg-indigo-600 duration-500 ease-out flex items-center justify-center"
                      >
                        <FaRegEdit />
                      </Link>
                    </>
                    <Link
                      to={`/view-slider/${slider._id}`}
                      className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover.bg-pink-600 duration-500 ease-out flex items-center justify-center"
                    >
                      <FaRegEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
