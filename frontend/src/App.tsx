import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import LibrosPage from "./pages/LibrosPage";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import EditarLibroPage from "./pages/EditarLibroPage";
import CrearLibroPage from "./pages/CrearLibroPage";
import { PATHS } from "./config/constants";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirige / al dashboard si está autenticado */}
          <Route
            path={PATHS.HOME}
            element={<Navigate to={PATHS.LIBRO_INDEX} />}
          />

          {/* Ruta pública */}
          <Route path={PATHS.LOGIN} element={<Login />} />

          {/* Ruta privada */}
          <Route
            path={PATHS.LIBRO_INDEX}
            element={
              <PrivateRoute>
                <LibrosPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.LIBRO_CREATE}
            element={
              <PrivateRoute>
                <CrearLibroPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.LIBRO_EDIT(":id")}
            element={
              <PrivateRoute>
                <EditarLibroPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
