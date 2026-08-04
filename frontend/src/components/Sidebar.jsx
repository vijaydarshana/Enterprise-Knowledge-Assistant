import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Employees", path: "/employees" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Documents", path: "/documents" },
  { name: "Graph Explorer", path: "/graph" },
  {
   name:"Recommendations",
   path:"/recommendations"
},
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        EKA
      </div>

      <nav className="p-4">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 mb-2 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;