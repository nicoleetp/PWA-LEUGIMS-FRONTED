import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
// components
import { Input } from "../form/Input";
import { Loader } from "../loaders/Loader";
// api
import { getProductById, updateProduct } from "api/productApi";
import { getAllCategories } from "api/categoryProductApi";
import {
  isNumericRequired,
  validateName,
  validateSelect,
} from "helpers/validations";

export const FormEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productDetails = await getProductById(id);

        setProductData({
          name: productDetails.name || "",
          description: productDetails.description || "",
          price: productDetails.price || "",
          image: productDetails.image || null,
          category: productDetails.category || "",
        });
      } catch (error) {
        toast.warn(error?.response?.data?.error);
      }
    };

    loadProduct();
  }, [id]);

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

        let imageUrl = productData.image;

        if (productData.image) {
          const data = new FormData();
          data.append("file", productData.image);
          data.append("upload_preset", "images_preset");

          let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await fetch(api, {
            method: "POST",
            body: data,
          });

          const imageData = await res.json();
          imageUrl = imageData.secure_url;
        }

        const updatedProductData = { ...productData, image: imageUrl };

        const response = await updateProduct(id, updatedProductData);
        toast.success(
          `El producto ${response.name.toUpperCase()} fue actualizado correctamente`
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
                value={productData.category._id}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
            <button
              className="w-full sm:w-auto text-center bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
              type="submit"
            >
              Actualizar
            </button>
            <Link
              to="/products"
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
