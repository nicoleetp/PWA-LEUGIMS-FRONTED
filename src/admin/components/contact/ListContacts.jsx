import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// components
import { Loader } from "../loaders/Loader";
// api
import { deleteContact, getAllContact } from "api/contactApi";
// icons
import { FaRegTrashAlt } from "react-icons/fa";

export const ListContacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData = await getAllContact();
        setContacts(contactData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los servicios: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      const result = await deleteContact(contactId);
      toast.success(result?.message);
      const updatedContactList = contacts.filter(
        (contact) => contact._id !== contactId
      );
      setContacts(updatedContactList);
    } catch (error) {
      console.log(error);
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Correo Electónico
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-bold text-gray-700 uppercase tracking-wider">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="bg-white">
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 font-medium capitalize">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900">
                    {contact.description}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-900 flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="w-7 h-7 text-xs bg-red-500 rounded-2xl text-white hover:bg-red-600 duration-500 ease-out flex items-center justify-center"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
