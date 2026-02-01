import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Only accessible if NOT logged in
const PublicRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    // Already logged in → redirect to notes
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
