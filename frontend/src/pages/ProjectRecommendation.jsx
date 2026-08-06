import { useEffect, useState } from "react";
import api from "../services/api";

function ProjectRecommendation() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
     async function fetchProjects() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data?.data ?? res.data ?? []);
    } catch (err) {
      console.error(err);
    }
  }
    fetchProjects();
  }, []);

 

  async function recommendEmployees() {
    if (!selectedProject) return;

    try {
      const res = await api.get(
        `/projects/${selectedProject}/recommend`
      );

      setProjectName(res.data.project);
      setRecommendations(res.data.recommendedEmployees);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        AI Employee Recommendation
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <select
          value={selectedProject}
          onChange={(e)=>setSelectedProject(e.target.value)}
          className="border rounded-lg p-3 w-full"
        >

          <option value="">
            Select Project
          </option>

          {projects.map(project=>(
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}

        </select>

        <button
          onClick={recommendEmployees}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Recommend Employees
        </button>

      </div>

      {projectName && (

        <>
          <h2 className="text-2xl font-bold mb-6">
            {projectName}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {(recommendations ?? []).map((employee,index)=>(

              <div
                key={index}
                className="bg-white rounded-xl shadow p-6"
              >

                <h3 className="text-xl font-bold">
                  {employee.name}
                </h3>

                <p className="mt-3 text-blue-600 font-semibold">
                  Matched Skills:
                  {" "}
                  {employee.matchedSkills}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  {(employee.skills ?? []).map(skill=>(

                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>
  );
}

export default ProjectRecommendation;