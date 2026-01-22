import { useEffect, useState } from "react";
import { Table, Badge, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import API from "../../api/axios";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ApprovalModal from "../../components/admin/ApprovalModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [action, setAction] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product, actionType) => {
    setSelectedProduct(product);
    setAction(actionType);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await API.put(`/products/${selectedProduct._id}/status`, {
        status: action,
      });

      toast.success(`Product ${action}`);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />

        <div className="p-4 flex-grow-1">
          <h4 className="fw-bold mb-4">Product Management</h4>

          <Card className="shadow-sm">
            <Card.Body>
              {products.length === 0 ? (
                <p className="text-muted mb-0">
                  No products found.
                </p>
              ) : (
                <Table bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Created By</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>₹ {product.price}</td>
                        <td>{product.category}</td>
                        <td>
                          {product.createdBy?.name}
                          <br />
                          <small className="text-muted">
                            {product.createdBy?.email}
                          </small>
                        </td>
                        <td>
                          <Badge
                            bg={
                              product.status === "approved"
                                ? "success"
                                : product.status === "rejected"
                                ? "danger"
                                : "warning"
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td>
                          {product.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="success"
                                className="me-2"
                                onClick={() =>
                                  openModal(product, "approved")
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() =>
                                  openModal(product, "rejected")
                                }
                              >
                                Reject
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

      <ApprovalModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title={
          action === "approved"
            ? "Approve Product"
            : "Reject Product"
        }
        bodyText={
          selectedProduct
            ? `Are you sure you want to ${action} "${selectedProduct.name}"?`
            : ""
        }
        confirmText={
          action === "approved" ? "Approve" : "Reject"
        }
        confirmVariant={
          action === "approved" ? "success" : "danger"
        }
      />
    </div>
  );
};

export default Products;
