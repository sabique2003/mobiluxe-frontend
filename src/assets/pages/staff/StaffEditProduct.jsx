import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import API from "../../api/axios";
import { toast } from "react-toastify";

const StaffEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    images: "",
  });

  // Load existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const p = res.data;

        setForm({
          name: p.name,
          category: p.category,
          price: p.price,
          description: p.description,
          images: p.images?.join(", "),
        });

        setLoading(false);
      } catch {
        toast.error("Failed to load product");
        navigate("/staff/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/my/${id}`, {
        ...form,
        images: form.images.split(",").map((i) => i.trim()),
      });

      toast.success("Product updated & sent for approval");
      navigate("/staff/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />

        <div className="p-4 flex-grow-1">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Edit Product</h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Image URLs (comma separated)</Form.Label>
                  <Form.Control
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="dark">
                    Save & Send for Approval
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/staff/products")}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default StaffEditProduct;
