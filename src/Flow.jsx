import React, { useCallback, useState, useRef } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    Controls,
    Background,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    updateEdge,

} from "reactflow";
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './CustomNode.jsx';
import Sidebar from './Sidebar.jsx';


const nodeTypes = { customNode: CustomNode }

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Flow() {
    const reactFlowWrapper = useRef(null);
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
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }


            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

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

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    );

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <Sidebar />

                <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 800, width: 1200 }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onEdgeUpdate={onEdgeUpdate}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Controls />
                        <Background style={{ backgroundColor: 'whitesmoke' }} />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    )
}
