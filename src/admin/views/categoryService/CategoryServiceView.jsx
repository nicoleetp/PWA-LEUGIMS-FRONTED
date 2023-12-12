import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiCategory } from "react-icons/bi";
import {
  ListCategoryService,
  Loader,
  NewCategoryService,
  ViewCategoryService,
} from "admin/components";
import {
  deleteCategoryService,
  getAllCategoryService,
} from "api/categoryServiceApi";

export const CategoryServiceView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [viewCategoryModalOpen, setViewCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  const openNewCategoryModal = () => {
    setCategoryToEdit(null);
    setNewCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category) => {
    setCategoryToEdit(category);
    setNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setNewCategoryModalOpen(false);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategoryService(categoryId);
      toast.success(`La categoría fue eliminada correctamente`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
        <div className="flex items-center flex-col md:flex-row justify-between mb-5">
          <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
            Categorías de Servicios
          </h1>
          <button
            onClick={openNewCategoryModal}
            className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
          >
            <BiCategory /> Nueva categoría
          </button>
        </div>
        <ListCategoryService
          categories={categories}
          onDeleteCategory={handleDeleteCategory}
          onEditCategory={openEditCategoryModal}
          onViewCategory={(categoryId) => {
            setSelectedCategoryId(categoryId);
            setViewCategoryModalOpen(true);
          }}
        />
      </div>

      {isNewCategoryModalOpen && (
        <NewCategoryService
          isOpen={isNewCategoryModalOpen}
          onClose={closeNewCategoryModal}
          setCategories={setCategories}
          isEdit={!!categoryToEdit}
          initialCategory={categoryToEdit}
        />
      )}

      {viewCategoryModalOpen && (
        <ViewCategoryService
          isOpen={viewCategoryModalOpen}
          onClose={() => setViewCategoryModalOpen(false)}
          categoryId={selectedCategoryId}
        />
      )}
    </>
  );
};
