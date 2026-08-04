const express = require("express");

const router = express.Router();

const projectController = require("../controllers/projectController");

router.get("/",projectController.getProjects);
router.get("/:id", projectController.getProject);

router.get("/:id/recommend", projectController.recommendEmployees);


module.exports = router;