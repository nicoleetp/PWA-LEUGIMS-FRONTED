import { FormEditSlider } from "admin/components";

export const EditSlider = () => {
  return (
    <>
      <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="mb-5 font-extrabold text-3xl text-gray-700 uppercase">
            Editar Slider
          </h1>
        </div>
        <FormEditSlider />
      </div>
    </>
  );
};
