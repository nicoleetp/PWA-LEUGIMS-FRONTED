import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { deleteConfig } from "api/configurationApi";

export const ListConfig = ({ configs, setConfigs }) => {
  const imgNotFound = import.meta.env.VITE_IMG_NOT_FOUND;

  const handleDeleteConfig = async (configId) => {
    try {
      const result = await deleteConfig(configId);
      window.location.reload();
      toast.success(result?.message);
      const updatedConfigList = configs.filter(
        (config) => config._id !== configId
      );
      setConfigs(updatedConfigList);
    } catch (error) {
      console.log(error);
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {Array.isArray(configs) &&
        configs.map((config) => (
          <div key={config?._id} className="flex flex-col gap-5">
            <div className="grid text-center sm:text-left grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-2">
                <span className="font-bold uppercase">Dirección</span>
                <ul>
                  {config?.addresses.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center sm:justify-start gap-2 capitalize"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold uppercase">Celular</span>
                <ul>
                  {config?.phones.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center sm:justify-start gap-2 capitalize"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold uppercase">Correo Electrónico</span>
                <ul>
                  {config?.email.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center sm:justify-start gap-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold uppercase">Redes Sociales</span>
                <ul className="flex flex-col gap-2">
                  {config?.facebook.map((item, index) => (
                    <li
                      key={index}
                      className="capitalize py-1 bg-blue-600 text-white rounded-full text-center"
                    >
                      {item}
                    </li>
                  ))}
                  {config?.instagram.map((item, index) => (
                    <li
                      key={index}
                      className="capitalize py-1 bg-pink-600 text-white rounded-full text-center"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold uppercase">Ciudad</span>
                <ul>
                  {config?.city.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center sm:justify-start gap-2 capitalize"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-bold uppercase">Logo</span>
                {config?.logo ? (
                  config.logo.map((item, index) => (
                    <img
                      key={index}
                      src={item ? item : imgNotFound}
                      alt="Logo"
                      className="w-28 h-28 rounded-lg shadow-lg"
                    />
                  ))
                ) : (
                  <img
                    src={imgNotFound}
                    alt="Logo"
                    className="w-28 h-28 rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 mt-5">
              <Link
                to={`/edit-config/${config?._id}`}
                className="py-3 px-5 text-lg bg-indigo-500 rounded-2xl text-white hover-bg-indigo-600 duration-500 ease-out flex items-center justify-center gap-3"
              >
                <FaRegEdit /> Editar configuración
              </Link>
              <button
                onClick={() => handleDeleteConfig(config?._id)}
                className="py-3 px-5 text-lg bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center gap-3"
              >
                <FaRegTrashAlt /> Eliminar configuración
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
