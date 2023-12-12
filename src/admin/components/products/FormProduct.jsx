import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../form/Input";
// api
import { registerProduct } from "api/productApi";
import { getAllCategories } from "api/categoryProductApi";
import { Loader } from "../loaders/Loader";
import {
  isNumericRequired,
  validateImage,
  validateName,
  validateSelect,
} from "helpers/validations";

export const FormProduct = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const validateForm = () => {
    const validationErrors = [];

    const nameError = validateName(productData.name, "Nombre");
    if (nameError) validationErrors.push(nameError);

    const priceError = isNumericRequired(productData.price, "Precio");
    if (priceError) validationErrors.push(priceError);

    const imageError = validateImage(productData.image, "Imagen");
    if (imageError) validationErrors.push(imageError);

    const categoryError = validateSelect(productData.category, "Categoría");
    if (categoryError) validationErrors.push(categoryError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener categorías: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, image: imageFile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);

        let imageUrl = "";

        if (productData.image) {
          const data = new FormData();
          data.append("file", productData.image);
          data.append("upload_preset", "images_preset");

          let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await axios.post(api, data);
          imageUrl = res.data.secure_url;
        }

        const productDataWithImage = {
          ...productData,
          image: imageUrl,
        };

        const response = await registerProduct(productDataWithImage);
        toast.success(
          `El producto ${response.name.toUpperCase()} fue registrado correctamente`
        );
        navigate("/products");
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
            <Input
              label={"Nombre"}
              type={"text"}
              placeholder={"Ingrese el nombre"}
              name="name"
              value={productData.name}
              change={handleInputChange}
            />
            <Input
              label={"Precio"}
              type={"text"}
              placeholder={"Ingrese el precio"}
              name="price"
              value={productData.price}
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
            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label className="font-medium uppercase" htmlFor="description">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Ingrese la descripción"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={productData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium uppercase" htmlFor="category">
                Seleccione la categoría
              </label>
              <select
                id="category"
                name="category"
                className="py-3 px-4 pr-9 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <button
              className="bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
              type="submit"
            >
              Registrar
            </button>
            <Link
              to="/products"
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
