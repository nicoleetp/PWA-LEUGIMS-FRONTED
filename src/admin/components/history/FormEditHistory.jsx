import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../form/Input";
import { toast } from "react-toastify";
import { Loader } from "../loaders/Loader";
import { getHistoryById, updateHistory } from "api/historyApi";
import { validateName } from "helpers/validations";

export const FormEditHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState({
    title: "",
    description: "",
    mision: "",
    vision: "",
  });

  const validateForm = () => {
    const validationErrors = [];

    const titleError = validateName(historyData.title, "Título");
    if (titleError) validationErrors.push(titleError);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getHistoryById(id);
        setHistoryData(history);
        setLoading(false);
      } catch (error) {
        toast.warn("Error al obtener la historia");
        navigate("/history");
      }
    };

    fetchHistory();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHistoryData({ ...historyData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        await updateHistory(id, historyData);
        toast.success("Historia actualizada correctamente");
        navigate("/history");
      } catch (error) {
        toast.warn(
          error?.response?.data?.error || "Error al actualizar la historia"
        );
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
            <div className="w-full col-span-12">
              <Input
                label={"Título"}
                type={"text"}
                placeholder={"Ingrese el título"}
                name="title"
                value={historyData.title}
                change={handleInputChange}
              />
            </div>
            <div className="w-full flex flex-col gap-2 col-span-12">
              <label className="font-medium uppercase" htmlFor="description">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Ingrese la descripción"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={historyData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2 col-span-12">
              <label className="font-medium uppercase" htmlFor="mision">
                Misión
              </label>
              <textarea
                name="mision"
                id="mision"
                placeholder="Ingrese la misión"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={historyData.mision}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2 col-span-12">
              <label className="font-medium uppercase" htmlFor="vision">
                Visión
              </label>
              <textarea
                name="vision"
                id="vision"
                placeholder="Ingrese la visión"
                className="border border-gray-600 p-2 rounded-lg min-h-[80px] max-h-[120px]"
                value={historyData.vision}
                onChange={handleInputChange}
              ></textarea>
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
              to="/history"
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
