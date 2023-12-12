import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// api
import { getCountData, lastProducts, lastServices } from "api/dashboardApi";
// components
import { Loader } from "admin/components";
// icons
import { FaRegEye } from "react-icons/fa";

export const DashboardView = () => {
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const count = await getCountData();
        setCountData(count);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener slider: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await lastProducts();
        setProducts(serviceData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los sliders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await lastServices();
        setServices(serviceData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los sliders: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { productCount, serviceCount, userCount } = countData;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Productos Registrados
              </h2>
              <p className="text-3xl text-blue-600 font-bold">{productCount}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Usuarios Registrados
              </h2>
              <p className="text-3xl text-green-600 font-bold">{userCount}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Servicios Registrados
              </h2>
              <p className="text-3xl text-yellow-600 font-bold">
                {serviceCount}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-8 ">
            {/* productos */}
            <div className="bg-white p-4 rounded-lg shadow-md md:w-1/2 w-full">
              <h2 className="text-xl font-semibold mb-4">Últimos Productos</h2>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-2">Imagen</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-gray-300"
                      >
                        <td className="w-full flex justify-center p-2">
                          <img
                            src={`${product.image}`}
                            alt={product.name}
                            className="w-20"
                          />
                        </td>
                        <td className="text-center p-2">{product.name}</td>
                        <td className="text-center p-2">{product.price}</td>
                        <td className="text-center p-2">
                          <div className="flex justify-center w-full">
                            <Link
                              to={`/view-product/${product._id}`}
                              className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover:bg-pink-600 duration-500 ease-out flex items-center justify-center"
                            >
                              <FaRegEye />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* servicios */}
            <div className="bg-white p-4 rounded-lg shadow-md md:w-1/2 w-full">
              <h2 className="text-xl font-semibold mb-4">Últimos Servicios</h2>
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {services &&
                    services.map((service) => (
                      <tr
                        key={service._id}
                        className="border-b border-gray-300"
                      >
                        <td className="text-center p-2">{service.name}</td>
                        <td className="text-center p-2">
                          {service.description}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
