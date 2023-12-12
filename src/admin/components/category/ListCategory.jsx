import { FaRegTrashAlt, FaRegEdit, FaRegEye } from "react-icons/fa";

export const ListCategory = ({
  categories,
  onDeleteCategory,
  onEditCategory,
  onViewCategory,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Nombre de categoría
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="bg-white">
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                {category?.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                <>
                  <button
                    className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                    onClick={() => onDeleteCategory(category._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    className="w-7 h-7 text-xs bg-indigo-500 rounded-2xl text-white hover:bg-indigo-600 duration-500 ease-out flex items-center justify-center"
                    onClick={() => onEditCategory(category)}
                  >
                    <FaRegEdit />
                  </button>
                </>
                <button
                  className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover:bg-pink-600 duration-500 ease-out flex items-center justify-center"
                  onClick={() => onViewCategory(category._id)}
                >
                  <FaRegEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
