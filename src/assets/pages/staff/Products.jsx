import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

import { Card, Table, Button, Badge, Row, Col, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/axios";

const MyProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchMyProducts = async () => {
    try {
      const res = await API.get("/products/my");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load your products");
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  // Stats
  const total = products.length;
  const pending = products.filter((p) => p.status === "pending").length;
  const approved = products.filter((p) => p.status === "approved").length;
  const rejected = products.filter((p) => p.status === "rejected").length;

  const getStatusBadge = (status) => {
    if (status === "approved") return <Badge bg="success">Approved</Badge>;
    if (status === "rejected") return <Badge bg="danger">Rejected</Badge>;
    return (
      <Badge bg="warning" text="dark">
        Pending
      </Badge>
    );
  };

  /* ---------------- DELETE FLOW ---------------- */

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/products/my/${selectedProduct._id}`);
      toast.success("Product deleted successfully");
      closeDeleteModal();
      fetchMyProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />

        <div className="p-4 flex-grow-1">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">My Products</h4>
            <Button
              variant="dark"
              onClick={() => navigate("/staff/add-product")}
            >
              + Add Product
            </Button>
          </div>

          {/* Stats */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="text-muted">Total Products</h6>
                  <h3 className="fw-bold">{total}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="text-muted">Pending</h6>
                  <h3 className="fw-bold text-warning">{pending}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="text-muted">Approved</h6>
                  <h3 className="fw-bold text-success">{approved}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="text-muted">Rejected</h6>
                  <h3 className="fw-bold text-danger">{rejected}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Products table */}
          <Card className="shadow-sm">
            <Card.Body>
              {products.length === 0 ? (
                <p className="text-muted mb-0">No products added yet.</p>
              ) : (
                <Table responsive bordered hover>
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{getStatusBadge(product.status)}</td>
                        <td>
                          {product.status === "pending" && (
                            <Button size="sm" variant="secondary" disabled>
                              Awaiting Approval
                            </Button>
                          )}

                          {product.status !== "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="m-3"
                                onClick={() =>
                                  navigate(`/staff/products/${product._id}/edit`)
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => openDeleteModal(product)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>

        <Footer />
      </div>

      {/* DELETE CONFIRM MODAL */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.name}</strong>?
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyProducts;
