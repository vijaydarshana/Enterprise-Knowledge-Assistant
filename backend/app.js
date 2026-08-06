const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const graphRoutes=require("./routes/graphRoutes");
const searchRoutes = require("./routes/searchRoutes");
const dashboardAnalyticsRoutes=require("./routes/dashboardAnalyticsRoutes");
const skillRoutes = require("./routes/skillRoutes");
const documentRoutes = require("./routes/documentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Enterprise Knowledge Assistant API"
    });
});

app.use("/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/graph",graphRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard",dashboardAnalyticsRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/departments", departmentRoutes);



module.exports = app;