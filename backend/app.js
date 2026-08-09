const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const graphRoutes = require("./routes/graphRoutes");
const searchRoutes = require("./routes/searchRoutes");
const dashboardAnalyticsRoutes = require("./routes/dashboardAnalyticsRoutes");
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
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    message: "Enterprise Knowledge Assistant API is running",
    timestamp: new Date().toISOString()
  });
});
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/graph",graphRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard",dashboardAnalyticsRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/departments", departmentRoutes);


// Serve frontend static files (if built) and provide SPA fallback for client-side routing
const path = require("path");
const fs = require("fs");

const frontendDist = path.join(__dirname, "..", "frontend", "dist");

if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));

    // For any non-API route, return the SPA entry so client-side routing works on refresh
    app.get("*", (req, res) => {
        if (req.path.startsWith("/api")) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

module.exports = app;