import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiAddFill, RiDeleteBin7Line } from "react-icons/ri";
import axios from "axios";
import { getConfigById, updateConfig } from "api/configurationApi";

export const FormEditConfig = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [configData, setConfigData] = useState({
    addresses: [""],
    phones: [""],
    email: [""],
    city: [""],
    facebook: [""],
    instagram: [""],
    logo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getConfigById(id);

        setConfigData({
          addresses: config.addresses || [""],
          phones: config.phones || [""],
          email: config.email || [""],
          city: config.city || [""],
          facebook: config.facebook || [""],
          instagram: config.instagram || [""],
          logo: config.logo || null,
        });
      } catch (error) {
        console.error("Error al obtener la configuración: ", error);
        toast.error("Error al obtener la configuración");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;

    const newField = [...configData[field]];
    newField[name] = value;
    setConfigData({ ...configData, [field]: newField });
  };

  const handleAddField = (field) => {
    if (!configData[field].includes("")) {
      const newField = [...configData[field], ""];
      setConfigData({ ...configData, [field]: newField });
    }
  };

  const handleRemoveField = (field, index) => {
    const newField = [...configData[field]];
    newField.splice(index, 1);
    setConfigData({ ...configData, [field]: newField });
  };

  const handleImageChange = (e) => {
    const logoFile = e.target.files[0];
    setConfigData({ ...configData, logo: logoFile });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (configData.logo) {
        const data = new FormData();
        data.append("file", configData.logo);
        data.append("upload_preset", "images_preset");

        let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const imageUrl = res.data.secure_url;

        setConfigData({ ...configData, logo: imageUrl });
      }

      const cleanedConfigData = { ...configData };
      for (const key in cleanedConfigData) {
        if (Array.isArray(cleanedConfigData[key])) {
          cleanedConfigData[key] = cleanedConfigData[key].filter(
            (item) => item !== ""
          );
        }
      }

      if (
        Object.values(cleanedConfigData).some(
          (field) => Array.isArray(field) && field.length === 0
        )
      ) {
        toast.error("Por favor, complete todos los campos.");
        return;
      }

      await updateConfig(id, cleanedConfigData);

      toast.success(`La configuración fue actualizada correctamente`);
      navigate("/config");
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-x-5 gap-y-8">
          {renderField("addresses", "Dirección")}
          {renderField("phones", "Teléfonos")}
          {renderField("email", "Email")}
          {renderField("city", "Ciudad")}
          {renderField("facebook", "Facebook")}
          {renderField("instagram", "Instagram")}
        </div>

        {renderImageField("logo", "Seleccione la Imagen")}

        <div className="mt-5 flex items-center gap-5">
          <button
            className="bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
            type="submit"
          >
            Actualizar
          </button>
          <Link
            to="/config"
            className="bg-red-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-red-600 transition-colors duration-500 ease-out cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );

  function renderField(field, label) {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium uppercase">{label}</label>
        {configData[field].map((value, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              name={index}
              value={value}
              onKeyDown={(e) => handleKeyDown(e, field, index)}
              onChange={(e) => handleInputChange(e, field)}
              className="border-2 py-2 px-3 border-gray-400 rounded-l-xl"
            />

            {index === configData[field].length - 1 && (
              <button
                onClick={() => handleAddField(field)}
                className="bg-blue-500 border-2 border-blue-500 p-2 rounded-r-xl text-white text-2xl"
              >
                <RiAddFill />
              </button>
            )}
            {index !== configData[field].length - 1 && (
              <button
                onClick={() => handleRemoveField(field, index)}
                className="bg-red-500 border border-red-500 p-3 rounded-r-xl text-white text-lg"
              >
                <RiDeleteBin7Line />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderImageField(field, label) {
    return (
      <div className="flex flex-col gap-2 justify-center mt-10">
        <label className="font-medium uppercase" htmlFor={field}>
          {label}
        </label>
        <input
          type="file"
          name={field}
          id={field}
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
      </div>
    );
  }
};
