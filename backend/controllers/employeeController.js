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
async function createEmployee(req, res) {

    try {

        const employee = await employeeModel.createEmployee(req.body);

        res.status(201).json({
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
async function updateEmployee(req, res) {

    try {

        const employee = await employeeModel.updateEmployee(
            req.params.id,
            req.body
        );

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
async function deleteEmployee(req, res) {

    try {

        await employeeModel.deleteEmployee(req.params.id);

        res.json({
            success: true,
            message: "Employee deleted successfully"
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
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};