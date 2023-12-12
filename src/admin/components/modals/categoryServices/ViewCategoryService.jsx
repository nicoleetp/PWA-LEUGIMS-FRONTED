import { getCategoryServiceById } from "api/categoryServiceApi";
import { useState, useEffect } from "react";

export const ViewCategoryService = ({ isOpen, onClose, categoryId }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (isOpen && categoryId) {
      const fetchCategory = async () => {
        try {
          const categoryData = await getCategoryServiceById(categoryId);
          setCategory(categoryData);
        } catch (error) {
          console.error("Error al obtener la categoría: ", error);
        }
      };

      fetchCategory();
    }
  }, [isOpen, categoryId]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative bg-white z-50 rounded-xl w-96 top-12vh m-auto shadow-xl">
            <h2 className="bg-gray-200 text-gray-700 text-2xl font-bold text-center py-3 rounded-t-xl">
              Visualizar{" "}
              <span className="text-red-500 font-black uppercase">
                Categoría
              </span>
            </h2>
            <div className="p-5 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2 mb-4 w-full">
                <span className="uppercase font-bold text-gray-600">
                  Nombre: {""}
                </span>
                <p className="font-medium uppercase text-xl">
                  {category ? category.name : ""}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="bg-red-500 rounded-xl px-10 py-2 text-white border-2 hover-border-red-500 hover-bg-transparent hover-text-red-500 active-bg-red-700/5 font-medium transition duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
