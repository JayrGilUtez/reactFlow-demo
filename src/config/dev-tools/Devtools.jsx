import { useState } from 'react';
import { Panel } from 'reactflow';

import NodeInspector from './NodeInspector.jsx';


export default function DevTools() {
    const [nodeInspectorActive, setNodeInspectorActive] = useState(true);

    return (
        <div className="react-flow__devtools">
            <Panel position="top-right">
                <DevToolButton
                    setActive={setNodeInspectorActive}
                    active={nodeInspectorActive}
                    title="Toggle Node Inspector"
                >
                    Node Inspector
                </DevToolButton>
            </Panel>
            {nodeInspectorActive && <NodeInspector />}
        </div>
    );
}

function DevToolButton({ active, setActive, children, ...rest }) {
    return (
        <button
            onClick={() => setActive((a) => !a)}
            className={active ? 'active' : ''}
            {...rest}
        >
            {children}
        </button>
    );
}
