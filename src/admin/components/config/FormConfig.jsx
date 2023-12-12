import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// api
import { registerConfig } from "api/configurationApi";
// icons
import { RiAddFill, RiDeleteBin7Line } from "react-icons/ri";

export const FormConfig = () => {
  const navigate = useNavigate();

  const [configData, setConfigData] = useState({
    addresses: [""],
    phones: [""],
    email: [""],
    city: [""],
    facebook: [""],
    instagram: [""],
    logo: null,
  });

  const addressesInputRef = useRef(null);
  const phonesInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleKeyDown = (e, field, index) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleAddField(field);

      if (field === "addresses") {
        addressesInputRef.current.focus();
      } else if (field === "phones") {
        phonesInputRef.current.focus();
      } else if (field === "email") {
        emailInputRef.current.focus();
      } else if (field === "city") {
        emailInputRef.current.focus();
      } else if (field === "facebook") {
        emailInputRef.current.focus();
      } else if (field === "instagram") {
        emailInputRef.current.focus();
      }
    }
  };

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
      let imageUrl = configData.logo;

      if (configData.logo) {
        const data = new FormData();
        data.append("file", configData.logo);
        data.append("upload_preset", "images_preset");

        let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        imageUrl = res.data.secure_url;
      }

      setConfigData({ ...configData, logo: imageUrl });

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

      await registerConfig(cleanedConfigData);

      toast.success(`La configuración fue registrada correctamente`);
      navigate("/config");
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-5 gap-y-8">
          {renderField("addresses", "Dirección", addressesInputRef)}
          {renderField("phones", "Teléfonos", phonesInputRef)}
          {renderField("email", "Email", emailInputRef)}
          {renderField("city", "Ciudad")}
          {renderField("facebook", "Facebook")}
          {renderField("instagram", "Instagram")}
        </div>

        {renderImageField("logo", "Seleccione la Imagen")}

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
          <button
            className="w-full sm:w-auto text-center bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
            type="submit"
          >
            Registrar
          </button>
          <Link
            to="/config"
            className="w-full sm:w-auto text-center bg-red-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-red-600 transition-colors duration-500 ease-out cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );

  function renderField(field, label, inputRef) {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium uppercase">{label}</label>
        {configData[field].map((value, index) => (
          <div key={index} className=" flex items-center">
            <input
              type="text"
              name={index}
              value={value}
              onKeyDown={(e) => handleKeyDown(e, field, index)}
              onChange={(e) => handleInputChange(e, field)}
              ref={inputRef}
              className="w-full border-2 py-2 px-3 border-gray-400 rounded-l-xl"
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
