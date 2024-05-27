import React from 'react'
import { Handle, Position } from 'reactflow';

const ahandleStyle = { top: 20 };
const bhandleStyle = { top:40 };
import './App.css'
export default function CustomNode({data}) {

    return (
        <div className='custom-node'>
            <div style={{alignItems:'center'}}>
            <label htmlFor="text">{data.title}</label>
            </div>
            <Handle type='target' position={Position.Left} id='input'  />
            <Handle type='source' position={Position.Right} id='a' style={ahandleStyle}  />
            <Handle type='source' position={Position.Right} id='b' style={bhandleStyle}  />
        </div>
    )
}
