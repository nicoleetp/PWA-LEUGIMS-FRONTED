import { Link } from "react-router-dom";
// icons
import { BiAddToQueue } from "react-icons/bi";
import { ListSlider } from "admin/components";

export const SliderView = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg my-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
          Sliders Registrados
        </h1>

        <Link
          to="/new-slider"
          className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
        >
          <BiAddToQueue /> Nuevo Slider
        </Link>
      </div>

      <ListSlider />
    </div>
  );
};
