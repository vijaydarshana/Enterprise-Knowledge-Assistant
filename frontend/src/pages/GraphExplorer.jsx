import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function GraphExplorer() {

    const [nodes,setNodes]=useState([]);
    const [edges,setEdges]=useState([]);

    useEffect(()=>{
          async function fetchGraph(){

        try{

            const res=await api.get("/graph");

            const graphNodes=res.data.nodes.map(node=>({

                id:node.id,

                position:{
                    x:Math.random()*700,
                    y:Math.random()*500
                },

                data:{
                    label:`${node.type}\n${node.label}`
                }

            }));

            const graphEdges=res.data.edges.map(edge=>({

                id:edge.id,

                source:edge.source,

                target:edge.target,

                label:edge.label,

                animated:true

            }));

            setNodes(graphNodes);

            setEdges(graphEdges);

        }catch(error){

            console.log(error);

        }

    }

        fetchGraph();

    },[]);

  

    return(

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Knowledge Graph

            </h1>

            <div className="bg-white rounded-xl shadow h-[700px]">

                <ReactFlow

                    nodes={nodes}

                    edges={edges}

                    fitView

                >

                    <MiniMap/>

                    <Controls/>

                    <Background/>

                </ReactFlow>

            </div>

        </div>

    );

}

export default GraphExplorer;