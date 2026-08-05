const skillModel = require("../models/skillModel");

async function getSkills(req, res) {
    try {
        const skills = await skillModel.getAllSkills();

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    getSkills
};