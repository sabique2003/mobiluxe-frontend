import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/products");
      }

      toast.success("Login successful");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <Container fluid className="login-wrapper">
      <Row className="vh-100 justify-content-center align-items-center">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card className="login-card shadow-lg">
            <Card.Body>
              <h2 className="text-center fw-bold brand-name mb-1">
                Mobiluxe
              </h2>
              <p className="text-center brand-tagline mb-4">
                Premium Mobile Store
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@mobiluxe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="password-wrapper">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  size="lg"
                  className="w-100 role-btn"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In
                </Button>
              </Form>

              <p className="text-center mb-3 mt-3">
                Don’t have an account?{" "}
                <span
                  className="login-link cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Create one
                </span>
              </p>

              <hr className="my-4" />

              <p className="text-center text-muted small mb-0">
                © {new Date().getFullYear()} Mobiluxe · All Rights Reserved
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
