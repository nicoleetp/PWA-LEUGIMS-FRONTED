import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiAddFill, RiDeleteBin7Line } from "react-icons/ri";
import axios from "axios";
import { updateSlider } from "api/sliderApi";
import { Loader } from "../loaders/Loader";
import { Input } from "../form/Input";
import { getSliderById } from "api/sliderApi";
import { validateName } from "helpers/validations";

export const FormEditSlider = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderData, setSliderData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const validateForm = () => {
    const validationErrors = [];

    const titleError = validateName(sliderData.title, "Título");
    if (titleError) validationErrors.push(titleError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos actuales del slider por su ID
        const response = await getSliderById(id);

        setSliderData({
          title: response.title || "",
          description: response.description || "",
          image: response.image || null,
        });
      } catch (error) {
        console.error("Error al obtener datos del slider: ", error);
        toast.error("Error al obtener datos del slider");
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSliderData({ ...sliderData, image: imageFile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSliderData({ ...sliderData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);

        // Subir la nueva imagen si se selecciona una
        let imageUrl = sliderData.image;

        if (sliderData.image) {
          const data = new FormData();
          data.append("file", sliderData.image);
          data.append("upload_preset", "images_preset");

          let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await axios.post(api, data);
          imageUrl = res.data.secure_url;
        }

        // Actualizar el slider con los nuevos datos
        await updateSlider(id, { ...sliderData, image: imageUrl });

        toast.success(`El slider fue actualizado correctamente`);
        navigate("/slider");
      } catch (error) {
        toast.warn(error?.response?.data?.error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleFormSubmit}>
          {errors.length > 0 && (
            <div className="w-full bg-red-500 flex flex-col gap-2 items-center text-white uppercase py-5 rounded-xl font-medium mb-3">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>&bull; {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-8">
            <Input
              label={"Título"}
              type={"text"}
              placeholder={"Ingrese el título"}
              name="title"
              value={sliderData.title}
              change={handleInputChange}
            />
            <div className="flex flex-col gap-2 justify-center">
              <label className="font-medium uppercase" htmlFor="image">
                Seleccione la Imagen
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label className="font-medium uppercase" htmlFor="description">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Ingrese la descripción"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={sliderData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <button
              className="bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
              type="submit"
            >
              Actualizar
            </button>
            <Link
              to="/slider"
              className="bg-red-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-red-600 transition-colors duration-500 ease-out cursor-pointer"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
};
