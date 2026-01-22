import { useEffect, useState } from "react";
import { Card, Row, Col, Container, Badge, Spinner } from "react-bootstrap";
import API from "../../api/axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ CORRECT

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/approved");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="d-flex">
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />

        <Container className="py-4 flex-grow-1">
          <h4 className="fw-bold mb-4">Shop Mobiles</h4>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-muted">No products available.</p>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} md={4} lg={3} className="mb-4">
                  <Card
                    className="h-100 shadow-sm"
                    onClick={() =>
                      navigate(`/products/${product._id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {product.images?.[0] && (
                      <Card.Img
                        variant="top"
                        src={product.images[0]}
                        style={{
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <Card.Body>
                      <Card.Title className="fw-bold">
                        {product.name}
                      </Card.Title>

                      <Card.Text className="text-muted small">
                        {product.category}
                      </Card.Text>

                      <h6 className="fw-bold text-success">
                        ₹ {product.price}
                      </h6>

                      <Badge bg="success">Available</Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>

        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
