import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Flow from './Flow.jsx'
import StoriesManager from './components/stories/StoriesManager.jsx';
import SceneBuilder from './components/scene-builder/SceneBuilder.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SceneBuilder />
  </React.StrictMode>,
)
