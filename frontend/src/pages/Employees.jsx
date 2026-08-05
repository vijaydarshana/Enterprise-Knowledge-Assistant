import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import ConfirmationModal from "../components/ConfirmationModal";
import { Pencil, Trash2, Plus } from "lucide-react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingItem, setPendingItem] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function performCreate(employee) {
    try {
      await api.post("/employees", employee);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function performUpdate(employee) {
    try {
      await api.put(`/employees/${employee.id}`, {
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
      });

      setShowForm(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  }

  async function performDelete(id) {
    try {
      await api.delete(`/employees/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function openConfirmation({ action, item }) {
    setPendingAction(action);
    setPendingItem(item);
    setConfirmationOpen(true);
  }

  function closeConfirmation() {
    setPendingAction(null);
    setPendingItem(null);
    setConfirmationOpen(false);
  }

  function handleDelete(id) {
    openConfirmation({
      action: "delete",
      item: { id },
    });
  }

  function handleSaveRequest(employee, isUpdate) {
    openConfirmation({
      action: isUpdate ? "update" : "create",
      item: employee,
    });
  }

  async function loadEmployeeForEdit(id) {
    try {
      const res = await api.get(`/employees/${id}`);
      setSelectedEmployee(res.data.data);
      setShowForm(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleConfirm() {
    if (pendingAction === "delete") {
      await performDelete(pendingItem.id);
    } else if (pendingAction === "create") {
      await performCreate(pendingItem);
    } else if (pendingAction === "update") {
      await performUpdate(pendingItem);
    }

    closeConfirmation();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Loading Employees...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Employees
          </h1>

          <p className="text-gray-500 mt-2">
            Total Employees: {employees.length}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedEmployee(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Employee
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Designation</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {employees.map((emp) => (

              <tr
                key={emp.id}
                className="border-b hover:bg-gray-50"
              >

                <td
                  className="p-4 cursor-pointer"
                  onClick={() => navigate(`/employees/${emp.id}`)}
                >
                  {emp.name}
                </td>

                <td className="p-4">
                  {emp.email}
                </td>

                <td className="p-4">
                  {emp.designation}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => loadEmployeeForEdit(emp.id)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSaveRequest}
          onCancel={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      <ConfirmationModal
        open={confirmationOpen}
        title={
          pendingAction === "delete"
            ? "Delete Employee"
            : pendingAction === "create"
            ? "Create Employee"
            : "Update Employee"
        }
        message={
          pendingAction === "delete"
            ? "Are you sure you want to delete this employee? This action cannot be undone."
            : pendingAction === "create"
            ? "Do you want to create this employee?"
            : "Do you want to update this employee?"
        }
        confirmText={
          pendingAction === "delete"
            ? "Delete"
            : pendingAction === "create"
            ? "Create"
            : "Update"
        }
        isDanger={pendingAction === "delete"}
        onConfirm={handleConfirm}
        onCancel={closeConfirmation}
      />

    </div>
  );
}

export default Employees;