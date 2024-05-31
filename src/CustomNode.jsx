import React from 'react'
import { Handle, Position } from 'reactflow';
import CustomHandle from './CustomHandle.jsx';
const ahandleStyle = { top: 20 };
const bhandleStyle = { top:40 };
import './App.css'
//  <CustomHandle type="target" position={Position.Left} id='input' isConnectable={1} />

//  <CustomHandle type="source" position={Position.Right} id='b' style={bhandleStyle} isConnectable={1} />
export default function CustomNode({data}) {

    return (
        <div className='custom-node'>
            <div style={{alignItems:'center'}}>
            <label htmlFor="text">{data.title}</label>
            </div>
            <CustomHandle type="target" position={Position.Left} id='input' isConnectable={2} />
            <CustomHandle type="source" position={Position.Right} id='a' style={ahandleStyle} isConnectable={3} />
            <CustomHandle type="source" position={Position.Right} id='b' style={bhandleStyle} isConnectable={3} />
        </div>
    )
}
