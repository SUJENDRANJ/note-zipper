import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Only accessible if logged in
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
