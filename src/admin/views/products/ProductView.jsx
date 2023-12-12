import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// components
import { ListProducts, Loader } from "admin/components";
// api
import { getAllProducts } from "api/productApi";
// icons
import { BsPersonAdd } from "react-icons/bs";

export const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
          Productos registrados
        </h1>

        <Link
          to="/new-product"
          className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
        >
          <BsPersonAdd /> Nuevo Producto
        </Link>
      </div>

      <ListProducts products={products} />
    </div>
  );
};
