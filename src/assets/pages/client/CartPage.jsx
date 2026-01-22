import { Card, Button, Row, Col, Table, Badge } from "react-bootstrap";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const decreaseQty = (product) => {
    if (product.qty === 1) {
      removeFromCart(product._id);
    } else {
      addToCart({ ...product, qty: -1 });
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h4 className="fw-bold mb-4">My Cart</h4>

        {cart.length === 0 ? (
          <Card className="p-4 text-center shadow-sm">
            <h6>Your cart is empty</h6>
          </Card>
        ) : (
          <Row>
            <Col md={8}>
              <Card className="shadow-sm mb-3">
                <Card.Body>
                  <Table responsive bordered>
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.name}</strong>
                            <br />
                            <small className="text-muted">
                              {item.category}
                            </small>
                          </td>

                          <td>₹ {item.price}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={() =>
                                  decreaseQty(item)
                                }
                              >
                                −
                              </Button>

                              <Badge bg="secondary">
                                {item.qty}
                              </Badge>

                              <Button
                                size="sm"
                                variant="outline-dark"
                                onClick={() =>
                                  addToCart(item)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </td>

                          <td>
                            ₹ {item.price * item.qty}
                          </td>

                          <td>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() =>
                                removeFromCart(item._id)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold mb-3">
                    Order Summary
                  </h6>

                  <p className="d-flex justify-content-between">
                    <span>Items</span>
                    <span>{cart.length}</span>
                  </p>

                  <p className="d-flex justify-content-between">
                    <span>Total</span>
                    <strong>₹ {totalPrice}</strong>
                  </p>

                  <Button
                    variant="dark"
                    className="w-100"
                    disabled
                  >
                    Checkout (Coming Soon)
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
