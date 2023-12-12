import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// api
import { getAllConfigs } from "api/configurationApi";
// componentes
import { ListConfig, ListUsers, Loader } from "admin/components";
// iconos
import { TbLayoutGridAdd } from "react-icons/tb";
import { BiSolidDownArrowAlt } from "react-icons/bi";

export const ConfigView = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configData = await getAllConfigs();
        setConfigs(configData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las configuraciones:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg my-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        {configs[0] !== null ? (
          <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
            Configuración registrada
          </h1>
        ) : (
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <p className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase text-center">
              No tienes ninguna configuración registrada
            </p>
            <div className=" flex flex-col items-center gap-5 text-xl text-gray-600 ">
              <span className="font-medium">
                Empieza registrando tus configuraciones!
              </span>
              <p className="moveUpDown text-2xl bg-primary-100 p-2 text-white rounded-full">
                <BiSolidDownArrowAlt />
              </p>
            </div>
            <Link
              to="/new-config"
              className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
            >
              <TbLayoutGridAdd /> Nueva configuración
            </Link>
          </div>
        )}
      </div>

      {configs[0] !== null && <ListConfig configs={configs} />}
    </div>
  );
};
