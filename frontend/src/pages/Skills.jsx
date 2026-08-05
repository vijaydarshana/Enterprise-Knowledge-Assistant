import { useEffect, useState } from "react";
import api from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchSkills() {
    try {
      const res = await api.get("/skills");
      setSkills(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    fetchSkills();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-bold">Loading Skills...</h2>
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Skills
        </h1>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Total Skills: {skills.length}
        </span>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {skills.map((skill) => (

          <div
            key={skill.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <div className="text-5xl text-center mb-4">
              🛠️
            </div>

            <h2 className="text-xl font-bold text-center">
              {skill.name}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              Skill ID: {skill.id}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Skills;