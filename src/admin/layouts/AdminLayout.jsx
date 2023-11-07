import { Navigate, Outlet, useNavigate } from "react-router-dom";
// componentes
import { Header, Loader, Sidebar } from "admin/components";
import { useAuth } from "hooks/useAuth";

export const AdminLayout = () => {
  const { user, load } = useAuth();

  if (load) {
    return <Loader />;
  }

  return (
    <>
      {user?.userId ? (
        <div className="grid lg:grid-cols-4 xl:grid-cols-5 min-h-screen">
          <Sidebar />
          <main className="lg:col-span-3 xl:col-span-4 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
            <Header />

            {/* insertar contenido dinamico */}
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
