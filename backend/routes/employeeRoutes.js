const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

// Get all employees
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployee);
// Get employee skills
router.get("/:id/skills", employeeController.getEmployeeSkills);

module.exports = router;