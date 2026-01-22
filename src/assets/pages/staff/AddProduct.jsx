import { Card, Button, Form, Container } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: "",
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
      await API.post("/products", {
        ...formData,
        images: formData.images
          ? formData.images.split(",")
          : [],
      });

      toast.success("Product submitted for approval");

      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        images: "",
      });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <h5 className="fw-bold mb-4">Add Product</h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image URLs</Form.Label>
              <Form.Control
                placeholder="comma separated URLs"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="dark">
              Submit Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
