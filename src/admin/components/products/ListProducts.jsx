import { useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// api
import { deleteProduct } from "api/productApi";

export const ListProducts = ({ products }) => {
  const [productsList, setProductsList] = useState(products);
  const imgNotFound = import.meta.env.VITE_IMG_NOT_FOUND;

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await deleteProduct(productId);
      toast.success(result?.message);
      const updatedProductList = productsList.filter(
        (product) => product._id !== productId
      );
      setProductsList(updatedProductList);
    } catch (error) {
      console.log(error);
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Imagen
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product) => (
            <tr key={product._id} className="bg-white">
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                <img
                  src={product.image ? product.image : imgNotFound}
                  alt={product.name}
                  className="w-14 h-10 rounded-lg object-cover"
                />
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                {product.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {product.description}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {product.price}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                {product.category.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                >
                  <FaRegTrashAlt />
                </button>
                <Link
                  to={`/edit-product/${product._id}`}
                  className="w-7 h-7 text-xs bg-indigo-500 rounded-2xl text-white hover:bg-indigo-600 duration-500 ease-out flex items-center justify-center"
                >
                  <FaRegEdit />
                </Link>
                <Link
                  to={`/view-product/${product._id}`}
                  className="w-7 h-7 text-xs bg-pink-500 rounded-2xl text-white hover:bg-pink-600 duration-500 ease-out flex items-center justify-center"
                >
                  <FaRegEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
