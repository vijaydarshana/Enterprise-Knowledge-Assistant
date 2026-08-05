import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 70;

function getNodeColor(type) {
  switch (type) {
    case "Employee":
      return "#2563eb";

    case "Skill":
      return "#16a34a";

    case "Project":
      return "#ea580c";

    case "Document":
      return "#9333ea";

    case "Department":
      return "#dc2626";

    default:
      return "#475569";
  }
}

function getLayoutedElements(nodes, edges) {

  dagreGraph.setGraph({
    rankdir: "LR",
    ranksep: 120,
    nodesep: 80,
  });

  nodes.forEach((node) => {

    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });

  });

  edges.forEach((edge) => {

    dagreGraph.setEdge(edge.source, edge.target);

  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {

    const position = dagreGraph.node(node.id);

    node.position = {
      x: position.x - nodeWidth / 2,
      y: position.y - nodeHeight / 2,
    };

  });

  return { nodes, edges };
}

function GraphExplorer() {

  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);

  const [edges, setEdges] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  async function fetchGraph() {

    try {

      const res = await api.get("/graph");

      let graphNodes = res.data.nodes.map((node) => ({

        id: node.id,

        data: {
          label: node.label,
          type: node.type,
        },

        position: {
          x: 0,
          y: 0,
        },

      style: {
    background: getNodeColor(node.type),
    color: "#fff",
    borderRadius: 14,
    border: "2px solid white",
    width: 190,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 14,
    boxShadow: "0 8px 18px rgba(0,0,0,.15)"
},

      }));

      let graphEdges = res.data.edges.map((edge) => ({

        id: edge.id,

        source: edge.source,

        target: edge.target,

        label: edge.label,

animated: true,

labelStyle: {
    fill: "#111827",
    fontWeight: 700,
    fontSize: 12,
},

style: {
    stroke: "#64748b",
    strokeWidth: 2,
},
      }));

      const layout = getLayoutedElements(
        graphNodes,
        graphEdges
      );

      setNodes(layout.nodes);

      setEdges(layout.edges);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }
    fetchGraph();

  }, []);


  function handleNodeClick(event, node) {

    if (node.data.type === "Employee") {

      navigate(`/employees/${node.id}`);

    }

    if (node.data.type === "Project") {

      navigate(`/projects/${node.id}`);

    }

  }

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Graph...
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <div>
<h1 className="text-4xl font-bold text-slate-800">

Enterprise Knowledge Graph Explorer

</h1>

<p className="text-gray-500 mt-2">

Explore relationships between Employees, Skills,
Projects, Departments and Documents.

</p>

        <p className="text-gray-500">

          Interactive visualization of relationships

        </p>

      </div>

      <div className="bg-white rounded-xl shadow h-[750px]">

        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={handleNodeClick}
        >
<div className="flex flex-wrap gap-4 mt-5">

    <div className="flex items-center gap-2">

        <div className="w-4 h-4 rounded bg-blue-600"></div>

        Employee

    </div>

    <div className="flex items-center gap-2">

        <div className="w-4 h-4 rounded bg-green-600"></div>

        Skill

    </div>

    <div className="flex items-center gap-2">

        <div className="w-4 h-4 rounded bg-orange-600"></div>

        Project

    </div>

    <div className="flex items-center gap-2">

        <div className="w-4 h-4 rounded bg-purple-600"></div>

        Document

    </div>

    <div className="flex items-center gap-2">

        <div className="w-4 h-4 rounded bg-red-600"></div>

        Department

    </div>

</div>
      <Background
    gap={18}
    size={1.5}
/>

        <Controls
    showZoom
    showFitView
    showInteractive
/>

         <MiniMap
    zoomable
    pannable
    nodeStrokeWidth={3}
    nodeColor={(node) => node.style?.background || "#64748b"}
/>

        </ReactFlow>

      </div>

    </div>

  );

}

export default GraphExplorer;