import React, { useCallback, useState, useRef } from 'react'
import ReactFlow, {
    ReactFlowProvider,  // Para poder acceder al estado interno del diagrama estando fuera del componente
    Controls,           // Para mostrar los controles de zoom y centrado
    Background,         // Agrega el fondo punteado al diagrama
    addEdge,            // Para hacer nuevas conexiones 
    applyEdgeChanges,   // Para modificar las conexiones
    applyNodeChanges,   // Para modificar la posicion de los nodos nuevos nodos (arrastrar los nodos) 
    updateEdge,         // Cambiar el origen o destino de una conexion
    Panel,        

} from "reactflow";
import 'reactflow/dist/style.css';          // Estilos por defecto para los diagrams
import './App.css';                         // Estilos para los wrapers y drag and drop components
import CustomNode from './CustomNode.jsx';  // Importamos el nodo personalizdo para representar las escenas
import Sidebar from './Sidebar.jsx';        // Importamos el componente para mostrar el sidebar
import SceneCard from './SceneCard.jsx';

import flowJson from './utils/flow.json'

// Asignamos el componente CustomeNode.jsx como el tipo de nodo que utlizara el diagrama
const nodeTypes = { customNode: CustomNode }

// Esto permite asignar un id a a los nodos creados con la herramienta de drag and drop 
let id = 0;
const getId = () => `node_${id++}`;



// Creamos la funcion principal del componente Flow.jsx
export default function Flow() {
    // Inicialisamos nodos, conexiones y otros valores para mostrar un diagrama de ejemplo
    const reactFlowWrapper = useRef(null);
    const initialNodes = [
        {
            id: 'node-1',
            type: 'customNode',
            position: { x: 0, y: 100 },
            data: {
                label: 'node 1',
                title: 'Inicio'
            },
        },
        {
            id: 'node-2',
            type: 'customNode',
            position: { x: 150, y: 0 },
            data: {
                label: 'node 2',
                title: 'Escena 2'
            },
        },
        {
            id: 'node-3',
            type: 'customNode',
            position: { x: 150, y: 200 },
            data: {
                label: 'node 3',
                title: 'Escena 3'
            },
        },
        {
            id: 'node-4',
            type: 'customNode',
            position: { x: 300, y: 300 },
            data: {
                label: 'node 4',
                title: 'Final'
            },
        },
    ]
    const initialEdges = [
        { id: 'e1', source: 'node-1', sourceHandle: 'a', target: 'node-2' },
        { id: 'e2', source: 'node-1', sourceHandle: 'b', target: 'node-3' }
    ]

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);

    const [selectedNodeData, setSelectedNodeData] = useState(null);
    const onNodeClick = (event, node) => {
        if (node.type === 'customNode') {
            setSelectedNodeData(node.data);
            console.log(node.id);
        }
    };



    //const onNodeClick = (event, node) => console.log('click node', node);
    // Para agregar escenas por medio de la herramienta de drag and drop

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // Validamos si el nodo que se suelta en el diagrama es valido 
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
                data: { label: `${type} node`, title: 'Nueva escena' },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );



    /**
     * Crear, modificar y eliminar conexiones y nodos
     * 
     * Esto permite manipular libremente el flujo de la historia 
     * por medio del diagrama
     */
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

    // Con esto podemos convertir el diagrama entero a un un objeto y despues a un JSON
    const saveDiagram = () => {
        const elements = reactFlowInstance.toObject();
        console.log(JSON.stringify(elements))
        setElements(elements);
    }

    return (
        <div className="builderContainer">
            {selectedNodeData && <SceneCard data={selectedNodeData} />}


            <div className='dndflow' >
                <ReactFlowProvider>
                    <Sidebar />
                    
                    <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 400, width: 1200 }}>
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
                            onNodeClick={onNodeClick}

                            fitView

                        >
                             <Panel position="top-left">
                             <button onClick={saveDiagram}>Save Diagram</button>
                             </Panel>
                            <Controls />
                            <Background style={{ backgroundColor: 'whitesmoke' }} />
                        </ReactFlow>
                        
                    </div>
                </ReactFlowProvider>

            </div>


        </div>
    )
}
