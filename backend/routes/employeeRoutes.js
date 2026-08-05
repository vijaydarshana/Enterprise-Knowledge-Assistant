const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

// Get all employees
router.get("/", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.get("/:id", employeeController.getEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
// Get employee skills
router.get("/:id/skills", employeeController.getEmployeeSkills);

module.exports = router;