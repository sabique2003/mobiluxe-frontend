import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      if (formData.role === "staff") {
        toast.success(
          "Staff registered. Waiting for admin approval."
        );
      } else {
        toast.success("Registration successful. Please login.");
      }

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <Container fluid className="login-wrapper">
      <Row className="vh-100 justify-content-center align-items-center">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card className="login-card shadow-lg">
            <Card.Body>
              <h2 className="text-center fw-bold mb-3">
                Create Account
              </h2>

              <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Role */}
                <Form.Group className="mb-4">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="staff">Staff</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100"
                >
                  Register
                </Button>
              </Form>

              <p className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <span
                  className="login-link cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
