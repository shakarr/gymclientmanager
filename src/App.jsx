import { ToastContainer } from "react-toastify";
import { Auth } from "./pages";
import { LoggedNavigation } from "./routes";
import useAuth from "./hooks/useAuth";

import "./app.scss";

export default function App() {
  const { auth, loading } = useAuth();

  if (loading) return <p>cargando...</p>

  return (
    <>
      {auth._id ? <LoggedNavigation /> : <Auth />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
