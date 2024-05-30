import React, { useCallback, useState, useRef, useEffect } from 'react'
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
import { useParams } from 'react-router-dom';
import AxiosClient from './config/http-client/axios-client.js';
// Asignamos el componente CustomeNode.jsx como el tipo de nodo que utlizara el diagrama
const nodeTypes = { customNode: CustomNode }

// Esto permite asignar un id a a los nodos creados con la herramienta de drag and drop 
// TODO arreglar esta funcion que esta causando que no se puedan agregar nuevos nodos en un principio
/**
 * Sucede que el id generado comienza en 0 e incrementa de 1 en 1
 * Esto causa que los primeros ids generados coincidan con el id de los nodos existentes
 * Es por eso que solo se agrega un nuevo nodo si el numero de intentos que hacemos para agregar un nodo
 * es mayor al numero de nodos que existen.
 * 
 * Ejemplo: 
 * En diagrama con 3 nodos deberiamos realizar el drag and drop 4 veces para agregar un nuevo nodo
 * es por eso que se debe arreglar esta funcion.
 * 
 * Posible solucion: generar el id con ayuda de un generador de numeros aleatorios.
 *  
 */
let id = 0;
const getId = () => `node_${id++}`;

function generateCustomID() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36);
    return `${timestamp}-${random}`;
}

const uniqueID = generateCustomID();
console.log(uniqueID)

// TODO arreglar el problema de las historias con diagrama undefined
/**
 * Las historias que que aun no tienen un diagrama -> diagrama : {} / undefined
 * causan un problema a la hora de querer agregar nuevos nodos.
 * 
 * Parece que no se pueden concatenar elementos a una propiedad con valor undefined
 * 
 * Posible solucion, inicializar todos los diagrams con valores vacios
 *  pero no nulos o indefinidos
 * 
 * Se pueden inicializar asi:
 
 "diagram": {
    "nodes": [],
    "edges": [],
    "viewport": {}
  }


 */

// Creamos la funcion principal del componente Flow.jsx
export default function Flow() {

    const [story, setStory] = useState(null);
    let { story_id } = useParams();

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);



    // Para traer todos los datos de una historia
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await AxiosClient({
                    url: `story/${story_id}`,
                    method: 'GET'
                });
                setStory(response);
                setNodes(response.diagram.nodes);
                setEdges(response.diagram.edges);
                console.log(response.diagram);

            } catch (error) {
                console.error('Error trying to get the story with id: ', story_id);

            }
        };

        fetchData();

    }, []);

    
    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [diagram, setDiagram] = useState([]);

    const saveDiagram = async () => {
        const diagram = reactFlowInstance.toObject();
        console.log(JSON.stringify(diagram))

        setDiagram(diagram);

        try {
            const response = await AxiosClient({
                url: `/stories/${story_id}`,
                method: 'PUT',
                data: { diagram: diagram }
            });
            console.log(response);
        } catch (error) {
            console.error('Error trying to get the story with id: ', story_id);
        }
    }


    const [selectedNodeData, setSelectedNodeData] = useState(null);
    const onNodeClick = (event, node) => {
        if (node.type === 'customNode') {
            setSelectedNodeData(node.data);
            //console.log(node.id);

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
                id: generateCustomID(),
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
        (params) => {
          setEdges((eds) => addEdge(params, eds));
          saveDiagram();
        },
        [],
      );

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    );

    // Con esto podemos convertir el diagrama entero a un un objeto y despues a un JSON
    // const elements = reactFlowInstance.toObject();
    // console.log(JSON.stringify(elements))




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
                            maxZoom={1}

                            fitView

                        >
                            <Panel position="top-left">
                                <button onClick={saveDiagram}>Guardar</button>
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
