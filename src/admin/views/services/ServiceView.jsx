import { Link } from "react-router-dom";
// components
import { ListServices } from "admin/components";
// icons
import { BiAddToQueue } from "react-icons/bi";

export const ServiceView = () => {
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-lg my-10">
        <div className="flex items-center flex-col md:flex-row justify-between mb-5">
          <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
            Servicios registrados
          </h1>

          <Link
            to="/new-service"
            className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
          >
            <BiAddToQueue /> Nuevo Servicio
          </Link>
        </div>

        <ListServices />
      </div>
    </>
  );
};
