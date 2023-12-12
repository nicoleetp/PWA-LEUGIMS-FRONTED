import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../form/Input";
// api
import { Loader } from "../loaders/Loader";
import { getAllCategoryService } from "api/categoryServiceApi";
import { registerService } from "api/serviceApi";
import { validateName, validateSelect } from "helpers/validations";

export const FormService = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    categoryService: "",
  });

  const validateForm = () => {
    const validationErrors = [];

    const nameError = validateName(serviceData.name, "Nombre");
    if (nameError) validationErrors.push(nameError);

    const categoryError = validateSelect(
      serviceData.categoryService,
      "Categoría"
    );
    if (categoryError) validationErrors.push(categoryError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getAllCategoryService();
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener categorías: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await registerService(serviceData);
        toast.success(
          `El servicio ${response.name.toUpperCase()} fue registrado correctamente`
        );
        navigate("/services");
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-8">
            <Input
              label={"Nombre"}
              type={"text"}
              placeholder={"Ingrese el nombre"}
              name="name"
              value={serviceData.name}
              change={handleInputChange}
            />

            <div className="flex flex-col gap-2">
              <label
                className="font-medium uppercase"
                htmlFor="categoryService"
              >
                Seleccione la categoría
              </label>
              <select
                id="categoryService"
                name="categoryService"
                className="py-3 px-4 pr-9 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                value={serviceData.categoryService}
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

            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label className="font-medium uppercase" htmlFor="description">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Ingrese la descripción"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={serviceData.description}
                onChange={handleInputChange}
              ></textarea>
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
              to="/services"
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
