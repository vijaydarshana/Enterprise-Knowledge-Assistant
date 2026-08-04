const express=require("express");

const router=express.Router();

const controller=require("../controllers/dashboardAnalyticsController");

router.get("/top-employees",controller.topEmployees);

module.exports=router;