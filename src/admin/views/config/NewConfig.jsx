import { FormConfig } from "admin/components";

export const NewConfig = () => {
  return (
    <>
      <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="mb-5 font-extrabold text-3xl text-gray-700 uppercase">
            Registrar Configuración
          </h1>
        </div>

        <FormConfig />
      </div>
    </>
  );
};
