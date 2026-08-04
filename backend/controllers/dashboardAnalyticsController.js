const dashboardAnalyticsModel=require("../models/dashboardAnalyticsModel");

async function topEmployees(req,res){

    try{

        const data=await dashboardAnalyticsModel.getTopEmployees();

        res.json({

            success:true,

            data

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

module.exports={

    topEmployees

}