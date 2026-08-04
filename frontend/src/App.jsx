import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import EmployeeDetails from "./pages/EmployeeDetails";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Documents from "./pages/Documents";
import GraphExplorer from "./pages/GraphExplorer";
import ProjectRecommendation from "./pages/ProjectRecommendation";
import ProjectDetails from "./pages/ProjectDetails";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="employees" element={<Employees />} />

          <Route path="projects" element={<Projects />} />

          <Route path="skills" element={<Skills />} />
<Route
    path="/projects/:id"
    element={<ProjectDetails />}
/>
          <Route path="documents" element={<Documents />} />
<Route
    path="/employees/:id"
    element={<EmployeeDetails />}
/>
          <Route path="graph" element={<GraphExplorer />} />
<Route
   path="/recommendations"
   element={<ProjectRecommendation />}
/>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;