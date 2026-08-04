const employeeModel = require("../models/employeeModel");

// Get all employees
async function getEmployees(req, res) {
    try {
        const employees = await employeeModel.getAllEmployees();

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get employee skills
async function getEmployeeSkills(req, res) {
    try {

        const data = await employeeModel.getEmployeeSkills(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function getEmployee(req, res) {
    try {
        const employee = await employeeModel.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.json({
            success: true,
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getEmployees,
    getEmployeeSkills,
    getEmployee
};