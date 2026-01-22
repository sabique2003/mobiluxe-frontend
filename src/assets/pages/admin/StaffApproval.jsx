import { useEffect, useState } from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Footer from "../../components/common/Footer";
import ApprovalModal from '../../components/admin/ApprovalModal'

import API from "../../api/axios";
import { toast } from "react-toastify";

const StaffApproval = () => {
  const [staffList, setStaffList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [actionType, setActionType] = useState("");

  // Fetch pending staff
  const fetchStaff = async () => {
    try {
      const res = await API.get("/users/staff/pending");
      setStaffList(res.data);
    } catch (error) {
      toast.error("Failed to load staff");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const openModal = (staff, action) => {
    setSelectedStaff(staff);
    setActionType(action);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await API.put(`/users/staff/${selectedStaff._id}/status`, {
        status: actionType,
      });

      toast.success(`Staff ${actionType}`);
      setShowModal(false);
      fetchStaff();
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
          <h4 className="fw-bold mb-4">Staff Approval</h4>

          <Card className="shadow-sm">
            <Card.Body>
              {staffList.length === 0 ? (
                <p className="text-muted mb-0">
                  No pending staff requests.
                </p>
              ) : (
                <Table responsive bordered hover>
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffList.map((staff, index) => (
                      <tr key={staff._id}>
                        <td>{index + 1}</td>
                        <td>{staff.name}</td>
                        <td>{staff.email}</td>
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
                              openModal(staff, "approved")
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              openModal(staff, "rejected")
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
        </div>

        <Footer />
      </div>

      <ApprovalModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title={
          actionType === "approved"
            ? "Approve Staff"
            : "Reject Staff"
        }
        bodyText={
          selectedStaff
            ? `Are you sure you want to ${actionType} ${selectedStaff.name}?`
            : ""
        }
        confirmText={
          actionType === "approved" ? "Approve" : "Reject"
        }
        confirmVariant={
          actionType === "approved" ? "success" : "danger"
        }
      />
    </div>
  );
};

export default StaffApproval;
