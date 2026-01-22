import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StaffRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "staff") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default StaffRoute;
