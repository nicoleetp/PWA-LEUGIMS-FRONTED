import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { registerCategory, updateCategory } from "api/categoryProductApi";
import { Loader } from "admin/components/loaders/Loader";
import { validateName } from "helpers/validations";

export const NewCategory = ({
  isOpen,
  onClose,
  setCategories,
  isEdit,
  initialCategory,
}) => {
  const [errors, setErrors] = useState([]);
  const [loadingOperation, setLoadingOperation] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: isEdit ? initialCategory.name : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = [];

    const nameError = validateName(categoryData.name, "Nombre");
    if (nameError) validationErrors.push(nameError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingOperation(true);

    try {
      if (!validateForm()) {
        return;
      }

      if (isEdit) {
        const response = await updateCategory(
          initialCategory._id,
          categoryData
        );
        toast.success(
          `La categoría ${response.name.toUpperCase()} fue actualizada correctamente`
        );
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === response._id ? response : category
          )
        );
      } else {
        const response = await registerCategory(categoryData);
        toast.success(
          `La categoría ${response.name.toUpperCase()} fue registrada correctamente`
        );
        setCategories((prevCategories) => [...prevCategories, response]);
      }
      onClose();
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    } finally {
      setLoadingOperation(false);
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
        {loadingOperation ? (
          <Loader />
        ) : (
          <>
            {isOpen && (
              <>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative bg-white z-50 rounded-xl w-96 top-12vh m-auto shadow-xl">
                  <h2 className="bg-gray-200 text-gray-700 text-2xl font-bold text-center py-3 rounded-t-xl">
                    {isEdit ? "Editar" : "Registrar"}{" "}
                    <span className="text-red-500 font-black uppercase">
                      Categoría
                    </span>
                  </h2>
                  <form
                    onSubmit={handleFormSubmit}
                    className="p-5 flex flex-col items-center gap-2"
                  >
                    {errors.length > 0 && (
                      <div className="w-full bg-red-500 flex flex-col gap-2 items-center text-white uppercase py-5 rounded-xl font-medium mb-3">
                        <ul>
                          {errors.map((error, index) => (
                            <li key={index}>&bull; {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-col mb-4 w-full">
                      <label className="uppercase font-bold text-gray-600">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="border border-gray-700 p-2 rounded-lg"
                        name="name"
                        value={categoryData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <input
                        type="submit"
                        value={isEdit ? "Actualizar" : "Registrar"}
                        className="bg-indigo-500 rounded-xl px-10 py-2 text-white border-2 hover:border-indigo-500 hover-bg-transparent hover-text-indigo-500 active-bg-indigo-700/5 font-medium transition duration-200 cursor-pointer"
                      />
                      <button
                        onClick={() => {
                          onClose();
                        }}
                        className="bg-red-500 rounded-xl px-10 py-2 text-white border-2 hover-border-red-500 hover-bg-transparent hover-text-red-500 active-bg-red-700/5 font-medium transition duration-200"
                      >
                        Cerrar
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
