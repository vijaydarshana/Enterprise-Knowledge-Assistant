import { useState, useEffect } from "react";
import api from "../services/api";

function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    departmentId: "",
    projectId: "",
    skillIds: [],
  });

  useEffect(() => {
      async function fetchMasterData() {
    try {
      const [departmentRes, projectRes, skillRes] = await Promise.all([
        api.get("/departments"),
        api.get("/projects"),
        api.get("/skills"),
      ]);

      setDepartments(departmentRes.data?.data ?? departmentRes.data ?? []);
      setProjects(projectRes.data?.data ?? projectRes.data ?? []);
      setSkills(skillRes.data?.data ?? skillRes.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || "",
        name: employee.name || "",
        email: employee.email || "",
        designation: employee.designation || "",
        departmentId: employee.departmentId || "",
        projectId: employee.projectId || "",
        skillIds: employee.skillIds || [],
      });
    }
  }, [employee]);

  useEffect(() => {
    if (!employee || !departments.length || !projects.length || !skills.length) {
      return;
    }

    setFormData((prev) => {
      if (!employee) return prev;

      const next = { ...prev };

      if (!next.departmentId && employee.department) {
        const matchedDept = departments.find((dept) => dept.name === employee.department);
        if (matchedDept) next.departmentId = matchedDept.id;
      }

      if (!next.projectId && employee.project) {
        const matchedProject = projects.find((project) => project.name === employee.project);
        if (matchedProject) next.projectId = matchedProject.id;
      }

      if ((!next.skillIds || next.skillIds.length === 0) && Array.isArray(employee.skills)) {
        const matchedSkillIds = skills
          .filter((skill) => employee.skills.includes(skill.name))
          .map((skill) => skill.id);

        if (matchedSkillIds.length > 0) {
          next.skillIds = matchedSkillIds;
        }
      }

      return next;
    });
  }, [employee, departments, projects, skills]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSkillChange(skillId) {
    setFormData((prev) => {
      const exists = prev.skillIds.includes(skillId);

      if (exists) {
        return {
          ...prev,
          skillIds: prev.skillIds.filter((id) => id !== skillId),
        };
      }

      return {
        ...prev,
        skillIds: [...prev.skillIds, skillId],
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(formData, Boolean(employee));
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white rounded-xl p-10">
          <h2 className="text-2xl font-bold">
            Loading...
          </h2>
        </div>
      </div>
    );
  }
    return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[650px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit}>

          {!employee && (
            <input
              className="border w-full p-3 mb-4 rounded"
              placeholder="Employee ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          )}

          <input
            className="border w-full p-3 mb-4 rounded"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 mb-4 rounded"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="border w-full p-3 mb-4 rounded"
            placeholder="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Department
            </label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="border w-full p-3 rounded"
              required
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Project
            </label>

            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="border w-full p-3 rounded"
              required
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">

            <label className="block font-semibold mb-3">
              Skills
            </label>

            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto border rounded p-3">

              {skills.map((skill) => (

                <label
                  key={skill.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.skillIds.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)}
                  />

                  {skill.name}

                </label>

              ))}

            </div>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              {employee ? "Update Employee" : "Create Employee"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EmployeeForm;