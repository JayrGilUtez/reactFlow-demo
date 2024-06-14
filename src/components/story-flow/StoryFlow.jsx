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
import '../../App.css';
import { useParams } from 'react-router-dom';
import AxiosClient from '../../config/http-client/axios-client.js';
import CustomNode from '../../CustomNode.jsx';
import { useMemo } from 'react';
import DevTools from '../../config/dev-tools/Devtools.jsx';
// Asignamos el componente CustomeNode.jsx como el tipo de nodo que utlizara el diagrama
//const nodeTypes = { customNode: CustomNode }

export default function StoryFlow() {

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
    }),
    [],
  );

  let { story_id } = useParams();

  const [story, setStory] = useState(null);
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
        //console.log(response.diagram);

      } catch (error) {
        console.error('Error trying to get the story with id: ', story_id);

      }
    }

    fetchData();

  }, []);


  const reactFlowWrapper = useRef(null);


  const [diagram, setDiagram] = useState([]);

  const saveDiagram = async () => {
    if (!reactFlowInstance) {
      console.error('React Flow instance is not initialized.');
      return;
    }

    const diagram = await reactFlowInstance.toObject();
    console.log(JSON.stringify(diagram));

    setDiagram(diagram);

    try {
      const response = await AxiosClient({
        url: `/stories/${story_id}`,
        method: 'PUT',
        data: { diagram: diagram }
      });
      console.log(response);
    } catch (error) {
      console.error('Error trying to save the story with id: ', story_id, error);
    }
  };

  const [reactFlowInstance, setReactFlowInstance] = useState(null);


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
    (changes) => {
      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges],
  );


  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  return (
    <div className='dndflow' >
      <ReactFlowProvider>

        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 690, width: 1340 }}>
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
            <DevTools />
          </ReactFlow>

        </div>
      </ReactFlowProvider>

    </div>

  )
}
