import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Badge } from "react-bootstrap";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/approved/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) return null;

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <Card className="shadow-sm">
          <div className="row g-0">
            {/* Image */}
            <div className="col-md-5">
              <img
                src={product.images?.[0] || "/no-image.png"}
                alt={product.name}
                className="img-fluid rounded-start"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Details */}
            <div className="col-md-7">
              <Card.Body>
                <h4 className="fw-bold">{product.name}</h4>

                <Badge bg="secondary" className="mb-2">
                  {product.category}
                </Badge>

                <h5 className="text-success mt-3">
                  ₹ {product.price}
                </h5>

                <p className="text-muted mt-3">
                  {product.description}
                </p>

                <div className="d-flex gap-2 mt-4">
                  <Button
                    variant="dark"
                    onClick={() => {
                      addToCart(product);
                      toast.success("Added to cart", {
                        autoClose: 1500,
                      });
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline-dark"
                    onClick={() => navigate("/cart")}
                  >
                    View Cart
                  </Button>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
