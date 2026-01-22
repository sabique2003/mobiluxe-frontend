import { useEffect, useState } from "react";
import AppNavbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";

import API from "../../api/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/products"); // admin only
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Stats
  const totalProducts = products.length;
  const pendingProducts = products.filter(
    (p) => p.status === "pending"
  );
  const pendingCount = pendingProducts.length;

  // Unique staff count (temporary approach)
  const uniqueStaff = new Set(
    products
      .map((p) => p.createdBy?._id)
      .filter(Boolean)
  ).size;

  const handleAction = async (id, status) => {
    try {
      await API.put(`/products/${id}/status`, { status });
      toast.success(`Product ${status}`);
      fetchDashboardData();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <AppNavbar />

        <div className="p-4 flex-grow-1">
          <h4 className="mb-4 fw-bold">Admin Dashboard</h4>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <Row className="mb-4">
                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">
                        Total Products
                      </h6>
                      <h3 className="fw-bold">
                        {totalProducts}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">
                        Pending Approvals
                      </h6>
                      <h3 className="fw-bold text-warning">
                        {pendingCount}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">
                        Active Staff
                      </h6>
                      <h3 className="fw-bold text-success">
                        {uniqueStaff}
                      </h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Pending Products Table */}
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold mb-3">
                    Pending Product Approvals
                  </h6>

                  {pendingCount === 0 ? (
                    <p className="text-muted mb-0">
                      No pending approvals.
                    </p>
                  ) : (
                    <Table responsive bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Added By</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {pendingProducts.map((product, index) => (
                          <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>
                              {product.createdBy?.name}
                              <br />
                              <small className="text-muted">
                                {product.createdBy?.email}
                              </small>
                            </td>
                            <td>
                              <Badge bg="warning" text="dark">
                                Pending
                              </Badge>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                variant="success"
                                className="me-2"
                                onClick={() =>
                                  handleAction(
                                    product._id,
                                    "approved"
                                  )
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() =>
                                  handleAction(
                                    product._id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
