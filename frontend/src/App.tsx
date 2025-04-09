import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import LibrosPage from "./pages/Libros";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirige / al dashboard si está autenticado */}
          <Route path="/" element={<Navigate to="/libros" />} />

          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Ruta privada */}
          <Route
            path="/libros"
            element={
              <PrivateRoute>
                <LibrosPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
