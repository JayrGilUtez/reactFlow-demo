import React from 'react';
import './App.css'

export default () => {
  // Para arrastrar objetos del sidebar
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ backgroundColor: '#1e1e1e'}}>
      <div className="description">
        <h3>Herramientas</h3>
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
        Nueva escena
      </div>
      
    </aside>
  );
};
