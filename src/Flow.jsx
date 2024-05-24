import React, { useCallback, useState } from 'react'
import ReactFlow, { Controls, Background, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode.jsx';

const nodeTypes = { customNode: CustomNode }

export default function Flow() {
    const initialNodes = [
        {
            id: 'node-1',
            type: 'customNode',
            position: { x: 150, y: 0 },
            data: { label: 'node 1' },
        },
        {
            id: 'node-2',
            type: 'customNode',
            position: { x: 0, y: 100 },
            data: { label: 'node 2' },
        },
        {
            id: 'node-3',
            type: 'customNode',
            position: { x: 150, y: 200 },
            data: { label: 'node 3' },
        },
        {
            id: 'node-4',
            type: 'customNode',
            position: { x: 300, y: 300 },
            data: { label: 'node 4' },
        },
    ]

    const initialEdges = [
        { id: 'e1', source: 'node-2', sourceHandle: 'a', target: 'node-1' },
        { id: 'e2', source: 'node-2', sourceHandle: 'b', target: 'node-3' }
    ]

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
      );
      const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
      );

      const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
      );

    return (
        <div style={{ height: 700, width: 700 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={{ backgroundColor: 'whitesmoke' }}
                attributionPosition='top-right'
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}
