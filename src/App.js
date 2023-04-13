import { useState, useCallback } from 'react';
import ReactFlow, { addEdge, applyNodeChanges, applyEdgeChanges, Background, Controls } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import CustomNode from './components/CustomNode';
import TextUpdaterNode from "./components/TextUpdaterNode";
import Cavity from "./components/Cavity";

const initialElements = [];


const Toolbar = ({ onAddNode, onAddEdge }) => (
    <div
        style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1000,
        }}
    >
        <button onClick={onAddNode}>Add Node</button>
        <button onClick={onAddEdge}>Add Edge</button>
    </div>
);

const nodeTypes = { textUpdater: TextUpdaterNode, cavity: Cavity };

const App = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    const onAddNode = () => {
        const id = uuidv4();
        const newNode = {
            id,
            type: 'cavity',
            data: { label: `Node ${id}` },
            position: { x: 250, y: 250 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    const onAddEdge = (connection) => {
        const newEdge = {
            id: uuidv4(),
            source: connection.source,
            target: connection.target,
        };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };

    // const onNodesChange = useCallback(
    //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    //     []
    // );
    //
    // const onEdgesChange = useCallback(
    //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    //     []
    // );
    //
    // const onConnect = useCallback(
    //     (params) =>
    //         setEdges((eds) =>
    //             addEdge(
    //                 {
    //                     id: uuidv4(),
    //                     ...params,
    //                 },
    //                 eds
    //             )
    //         ),
    //     []
    // );
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );


    return (
        <div style={{ height: '100vh' }}>
            <Toolbar onAddNode={onAddNode} onAddEdge={onAddEdge} />
            <div style={{ height: '90vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView

                >
                    <Background />
                    <Controls />
                </ReactFlow>

            </div>
        </div>
    );
};

export default App;
