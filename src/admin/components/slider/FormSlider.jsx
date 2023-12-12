import { registerSlider } from "api/sliderApi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../form/Input";
import { toast } from "react-toastify";
import { Loader } from "../loaders/Loader";
import { validateImage, validateName } from "helpers/validations";

export const FormSlider = () => {
  const navigate = useNavigate();

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

    const imageError = validateImage(sliderData.image, "Imagen");
    if (imageError) validationErrors.push(imageError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

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

        let imageUrl = null;

        if (sliderData.image) {
          const data = new FormData();
          data.append("file", sliderData.image);
          data.append("upload_preset", "images_preset");

          let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await fetch(api, {
            method: "POST",
            body: data,
          });

          const responseData = await res.json();

          if (res.ok) {
            imageUrl = responseData.secure_url;
          } else {
            // Si hay un problema con la subida de la imagen, maneja el error
            throw new Error(responseData.error.message);
          }
        }

        const response = await registerSlider({
          ...sliderData,
          image: imageUrl,
        });

        toast.success(
          `El producto ${response.title} fue registrado correctamente`
        );
        navigate("/slider");
      } catch (error) {
        toast.warn(error.message);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-8">
            <Input
              label={"Título"}
              type={"text"}
              placeholder={"Ingrese el título"}
              name="title"
              value={sliderData.name}
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
            <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
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
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
            <button
              className="w-full sm:w-auto text-center bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
              type="submit"
            >
              Registrar
            </button>
            <Link
              to="/slider"
              className="w-full sm:w-auto text-center bg-red-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-red-600 transition-colors duration-500 ease-out cursor-pointer"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
};
