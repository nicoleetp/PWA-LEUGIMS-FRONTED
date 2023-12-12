import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// components
import { ListHistory, Loader } from "admin/components";
// api
import { getAllHistory, deleteHistory } from "api/historyApi";
// icons
import { BiAddToQueue } from "react-icons/bi";

export const HistoryView = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storiesData = await getAllHistory();
        setHistoryData(storiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la historia: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteHistory = async (historyId) => {
    try {
      await deleteHistory(historyId);
      const updatedHistoryData = historyData.filter(
        (history) => history._id !== historyId
      );
      setHistoryData(updatedHistoryData);
      toast.success("Historia eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la historia: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-5 rounded-xl shadow-lg my-10">
          {historyData.length === 0 ? (
            <div className="flex items-center flex-col justify-between mb-5 text-center">
              <h2 className="mb-5 font-extrabold text-xl md:text-3xl text-gray-700 uppercase">
                Aún no tienes ninguna{" "}
                <span className="text-primary-100">Historia</span> registrada
              </h2>

              <p className="text-lg mb-5 font-medium">
                Empieza registrando una nueva{" "}
                <span className="text-primary-100 uppercase">Historia</span>
              </p>

              <Link
                to="/new-history"
                className="flex items-center gap-2 bg-indigo-600 py-3 px-5 rounded-xl text-white font-medium"
              >
                <BiAddToQueue /> Registrar Historia
              </Link>
            </div>
          ) : (
            <ListHistory
              historyData={historyData}
              onDeleteHistory={handleDeleteHistory}
            />
          )}
        </div>
      )}
    </>
  );
};
