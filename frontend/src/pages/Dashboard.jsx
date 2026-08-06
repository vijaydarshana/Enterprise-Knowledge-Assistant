import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardChart from "../components/DashboardChart";
import {
  Users,
  FolderKanban,
  BookOpen,
  FileText,
  Trophy,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    skills: 0,
    documents: 0,
  });

  const [topEmployees, setTopEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
  async function loadDashboard() {
    try {
      const [statsRes, employeeRes, projectRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/top-employees"),
        api.get("/projects"),
      ]);

      setStats(statsRes.data?.data ?? statsRes.data ?? { employees:0, projects:0, skills:0, documents:0 });
      setTopEmployees(employeeRes.data?.data ?? employeeRes.data ?? []);
      setProjects(projectRes.data?.data ?? projectRes.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
    loadDashboard();
  }, []);


  const cards = [
    {
      title: "Employees",
      value: stats.employees,
      icon: <Users size={30} />,
      color: "bg-blue-600",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: <FolderKanban size={30} />,
      color: "bg-green-600",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: <BookOpen size={30} />,
      color: "bg-purple-600",
    },
    {
      title: "Documents",
      value: stats.documents,
      icon: <FileText size={30} />,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Enterprise AI Knowledge Graph
        </h1>

        <p className="text-gray-500 mt-2">
          Knowledge Management Dashboard
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`${card.color} text-white rounded-2xl shadow-lg p-6`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-lg">
                  {card.title}
                </p>

                <h2 className="text-5xl font-bold mt-3">
                  {card.value}
                </h2>

              </div>

              {card.icon}

            </div>

          </div>

        ))}

      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Top Employees */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">

              Top Skilled Employees

            </h2>

            <Trophy className="text-yellow-500" />

          </div>

          {topEmployees.length === 0 ? (

            <p>No data available</p>

          ) : (

            topEmployees.map((emp, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b py-4"
              >

                <div>

                  <h3 className="font-semibold text-lg">

                    {emp.name}

                  </h3>

                  <p className="text-gray-500">

                    Skills : {emp.skills}

                  </p>

                </div>

                <div className="text-blue-600 font-bold">

                  #{index + 1}

                </div>

              </div>

            ))

          )}

        </div>

        {/* Projects */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">

              Projects

            </h2>

            <FolderKanban className="text-green-600" />

          </div>

          {projects.length === 0 ? (

            <p>No Projects</p>

          ) : (

            projects.map((project) => (

              <div
                key={project.id}
                className="border rounded-xl p-4 mb-4 hover:bg-gray-50 transition"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-semibold text-lg">

                      {project.name}

                    </h3>

                    <p className="text-gray-500">

                      {project.status}

                    </p>

                  </div>

                  <ArrowRight />

                </div>

              </div>

            ))

          )}

        </div>

      </div>
<div className="bg-white rounded-xl shadow-lg p-6 mt-8">

    <h2 className="text-2xl font-bold mb-6">

        Enterprise Statistics

    </h2>

    <DashboardChart stats={stats} />

</div>
      {/* Knowledge Graph */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">

          Knowledge Graph Overview

        </h2>

        <div className="grid md:grid-cols-5 gap-6">

          <div className="bg-blue-100 rounded-xl p-8 text-center">

            👨‍💻

            <p className="mt-3 font-bold">

              Employees

            </p>

          </div>

          <div className="bg-green-100 rounded-xl p-8 text-center">

            🛠

            <p className="mt-3 font-bold">

              Skills

            </p>

          </div>

          <div className="bg-purple-100 rounded-xl p-8 text-center">

            📁

            <p className="mt-3 font-bold">

              Projects

            </p>

          </div>

          <div className="bg-orange-100 rounded-xl p-8 text-center">

            📄

            <p className="mt-3 font-bold">

              Documents

            </p>

          </div>

          <div className="bg-pink-100 rounded-xl p-8 text-center">

            🏢

            <p className="mt-3 font-bold">

              Departments

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;