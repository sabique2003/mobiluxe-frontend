import { useEffect, useState } from "react";
import AppNavbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";

import { Card, Table, Row, Col, Badge, Spinner } from "react-bootstrap";
import API from "../../api/axios";
import { toast } from "react-toastify";

const StaffDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    try {
      const res = await API.get("/products/my");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  // Stats
  const total = products.length;
  const pending = products.filter(p => p.status === "pending").length;
  const approved = products.filter(p => p.status === "approved").length;

  const getStatusBadge = (status) => {
    if (status === "approved") {
      return <Badge bg="success">Approved</Badge>;
    }
    if (status === "rejected") {
      return <Badge bg="danger">Rejected</Badge>;
    }
    return (
      <Badge bg="warning" text="dark">
        Pending
      </Badge>
    );
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        <AppNavbar />

        <div className="p-4 flex-grow-1">
          <h4 className="mb-4 fw-bold">Staff Dashboard</h4>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              {/* Stats */}
              <Row className="mb-4">
                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">My Products</h6>
                      <h3 className="fw-bold">{total}</h3>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">Pending Approval</h6>
                      <h3 className="fw-bold text-warning">{pending}</h3>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">Approved Products</h6>
                      <h3 className="fw-bold text-success">{approved}</h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Recent Products Table */}
              <Card className="shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold mb-3">Recent Products</h6>

                  {products.length === 0 ? (
                    <p className="text-muted mb-0">
                      No products added yet.
                    </p>
                  ) : (
                    <Table responsive bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.slice(0, 5).map((product, index) => (
                          <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{getStatusBadge(product.status)}</td>
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

export default StaffDashboard;
