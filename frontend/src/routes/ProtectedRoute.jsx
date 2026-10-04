// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ allowedRoles }) {
  // Aquí lees el usuario o token guardado (por ejemplo, en localStorage)
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si no tiene el rol requerido, redirige al inicio
    return <Navigate to="/" replace />;
  }

  // Si pasa la validación, muestra las rutas hijas
  return <Outlet />;
}