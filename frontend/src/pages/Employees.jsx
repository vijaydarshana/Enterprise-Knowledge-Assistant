import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Employees</h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Designation</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b hover:bg-gray-100 cursor-pointer transition"
                onClick={() => navigate(`/employees/${emp.id}`)}
              >
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.email}</td>
                <td className="p-4">{emp.designation}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Employees;