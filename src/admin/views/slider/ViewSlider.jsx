import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "admin/components";
import { getSliderById } from "api/sliderApi";

export const ViewSlider = () => {
  const { id } = useParams();
  const [slider, setSlider] = useState({});
  const [loading, setLoading] = useState(false);
  const imgNotFound = import.meta.env.VITE_IMG_NOT_FOUND;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sliderData = await getSliderById(id);
        setSlider(sliderData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener slider: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const { _id, title, description, image } = slider;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-2 font-extrabold">
            <Link
              to={-1}
              className="mb-5 text-2xl text-gray-700 uppercase underline"
            >
              Sliders
            </Link>
            <span className="text-2xl">/</span>
            <h2 className="text-2xl uppercase text-indigo-600">{title}</h2>
          </div>

          <div className="flex justify-center gap-10">
            <img
              src={image ? image : imgNotFound}
              alt={title}
              className="w-1/2 rounded-xl shadow-lg"
            />
            <div className="w-1/3 flex flex-col gap-3">
              <h1 className="uppercase text-4xl font-extrabold text-gray-700">
                {title}
              </h1>
              <p className="text-lg text-gray-700">{description}</p>

              <Link
                to={`/edit-slider/${_id}`}
                className="bg-indigo-600 text-white py-3 rounded-full text-center uppercase font-bold mt-5 hover:bg-indigo-700 transition-colors duration-500"
              >
                Editar Slider
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
