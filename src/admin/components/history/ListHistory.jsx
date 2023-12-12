import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ListHistory = ({ historyData, onDeleteHistory }) => {
  return (
    <>
      {historyData.map((history) => (
        <div
          key={history._id}
          className="flex items-center flex-col justify-between gap-10 mb-5 text-center"
        >
          <h2 className="font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
            {history.title}
          </h2>

          <div className="w-full p-5 shadow-lg rounded-xl">
            <p>{history.description}</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-10 place-content-center">
            <div className="w-full p-5 shadow-lg rounded-xl flex flex-col gap-3">
              <span className="uppercase font-bold">Misión</span>
              <p>{history.mision}</p>
            </div>
            <div className="w-full p-5 shadow-lg rounded-xl flex flex-col gap-3">
              <span className="uppercase font-bold">Visión</span>
              <p>{history.vision}</p>
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-5">
            <Link
              to={`/edit-history/${history._id}`}
              className="py-3 px-10 flex items-center gap-2 uppercase font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-500 ease-linear rounded-xl text-white"
            >
              <FaRegEdit /> Editar
            </Link>
            <button
              onClick={() => onDeleteHistory(history._id)}
              className="py-3 px-10 flex items-center gap-2 uppercase font-medium bg-red-600 hover:bg-red-700 transition-colors duration-500 ease-linear rounded-xl text-white"
            >
              <FaRegTrashAlt /> Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
