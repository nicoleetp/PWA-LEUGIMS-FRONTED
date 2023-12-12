import { ListContacts } from "admin/components";

export const ContactView = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg my-10">
      <div className="flex items-center flex-col md:flex-row justify-between mb-5">
        <h1 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
          Mensajes Recibidos
        </h1>
      </div>

      <ListContacts />
    </div>
  );
};
