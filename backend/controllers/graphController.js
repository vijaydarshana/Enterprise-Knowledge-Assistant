const graphModel = require("../models/graphModel");

async function getGraph(req,res){

    try{

        const graph = await graphModel.getGraph();

        res.json(graph);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

module.exports={
    getGraph
};