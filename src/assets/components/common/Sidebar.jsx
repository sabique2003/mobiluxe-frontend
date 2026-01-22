import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../assets/context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <Nav className="flex-column p-3">

        {/* DASHBOARD */}
        {user?.role === "admin" && (
          <NavLink to="/admin/dashboard" className="nav-link sidebar-link">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        )}

        {user?.role === "staff" && (
          <NavLink to="/staff/dashboard" className="nav-link sidebar-link">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        )}

        {/* ADMIN LINKS */}
        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/products" className="nav-link sidebar-link">
              <i className="bi bi-box-seam me-2"></i>
              Products
            </NavLink>

            <NavLink to="/admin/staff" className="nav-link sidebar-link">
              <i className="bi bi-people me-2"></i>
              Staff Approval
            </NavLink>
          </>
        )}

        {/* STAFF LINKS */}
        {user?.role === "staff" && (
          <>
            <NavLink to="/staff/add-product" className="nav-link sidebar-link">
              <i className="bi bi-plus-square me-2"></i>
              Add Product
            </NavLink>

            <NavLink to="/staff/products" className="nav-link sidebar-link">
              <i className="bi bi-phone me-2"></i>
              My Products
            </NavLink>
          </>
        )}

        {/* CLIENT LINKS */}
        {user?.role === "client" && (
          <NavLink to="/products" className="nav-link sidebar-link">
            <i className="bi bi-shop me-2"></i>
            Shop
          </NavLink>
        )}

      </Nav>
    </div>
  );
};

export default Sidebar;
