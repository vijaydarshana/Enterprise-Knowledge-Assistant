const departmentModel = require("../models/departmentModel");

async function getDepartments(req, res) {
    try {
        const departments = await departmentModel.getDepartments();

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

module.exports = {
    getDepartments,
};