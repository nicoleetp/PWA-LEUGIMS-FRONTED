import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import { Loader } from "admin/components";
// api
import { getProductById } from "api/productApi";
import { formatMoney } from "helpers/helpers";

export const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const imgNotFound = import.meta.env.VITE_IMG_NOT_FOUND;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener categorías: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { _id, name, price, description, image, category } = product;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-2  font-extrabold">
            <Link
              to={-1}
              className="mb-5 text-2xl text-gray-700 uppercase underline"
            >
              Productos
            </Link>
            <span className="text-2xl">/</span>
            <h2 className="text-2xl uppercase text-indigo-600">{name}</h2>
          </div>

          <div className="flex justify-center gap-10">
            <img
              src={image ? image : imgNotFound}
              alt={name}
              className="w-1/2 rounded-xl shadow-lg"
            />
            <div className="w-1/3 flex flex-col gap-3">
              <h1 className="uppercase text-4xl font-extrabold text-gray-700">
                {name}
              </h1>
              <p className="text-lg text-gray-700">{description}</p>
              <p className="font-bold text-lg">
                Categoría:{" "}
                <span className="font-medium uppercase">{category?.name}</span>
              </p>
              {price && (
                <span className="text-md bg-primary-100 w-28 text-center py-2 rounded-full text-white font-medium">
                  {price ? formatMoney(price) : price}
                </span>
              )}

              <Link
                to={`/edit-product/${_id}`}
                className="bg-indigo-600 text-white py-3 rounded-full text-center uppercase font-bold mt-5 hover:bg-indigo-700 transition-colors duration-500"
              >
                Editar Producto
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
