const projectModel = require("../models/projectModel");

async function recommendEmployees(req, res) {

    try {

        const data = await projectModel.recommendEmployees(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            project: data.project,
            recommendedEmployees: data.employees
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
async function getProjects(req,res){

    try{

        const projects = await projectModel.getProjects();

        res.json({
            success:true,
            data:projects
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}
async function getProject(req, res) {
    try {

        const project = await projectModel.getProjectById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            data: project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
module.exports = {
    getProjects,
    recommendEmployees,
    getProject
};