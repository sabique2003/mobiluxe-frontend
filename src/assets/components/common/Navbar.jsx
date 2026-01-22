import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          className="fw-bold text-uppercase cursor-pointer"
          onClick={() => {
            if (user?.role === "client") navigate("/products");
            else navigate(`/${user?.role}/dashboard`);
          }}
        >
          Mobiluxe
        </Navbar.Brand>

        {/* Right side */}
        <Nav className="ms-auto align-items-center gap-3">
          {/* CLIENT CART */}
          {user?.role === "client" && (
            <Button
              variant="outline-light"
              className="position-relative"
              onClick={() => navigate("/cart")}
            >
              <i className="bi bi-cart3 me-1"></i>
              My Cart
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          )}

          {/* USER INFO */}
          {user && (
            <>
              <span className="text-light">
                {user.name}
                {user.role !== "client" && ` (${user.role})`}
              </span>

              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
