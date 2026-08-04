import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    fetchProjects();
  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">Loading Projects...</h2>
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Total: {projects.length}
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No Projects Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                  {project.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : project.status === "Completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>

              </div>

              <p className="text-gray-500 mt-3">
                Project ID: {project.id}
              </p>

              <div className="mt-6 flex justify-end">

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details →
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Projects;