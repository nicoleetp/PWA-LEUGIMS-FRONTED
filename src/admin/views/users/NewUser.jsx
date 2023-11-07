import { FormUser } from "admin/components";

export const NewUser = () => {
  return (
    <>
      <div className=" bg-white p-5 rounded-xl shadow-lg my-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="mb-5 font-extrabold text-3xl text-gray-700 uppercase">
            Registrar Usuario
          </h1>
        </div>

        <FormUser />
      </div>
    </>
  );
};
