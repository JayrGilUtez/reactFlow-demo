import React from 'react';
import { Route, Router, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import StoriesManager from '../components/stories/StoriesManager.jsx'
import Flow from '../Flow.jsx';
import StoryFlow from '../components/story-flow/StoryFlow.jsx';
import SceneBuilder from '../components/scene-builder/SceneBuilder.jsx';

export default function AppRouter() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<StoriesManager />} />
                <Route path='/story/:story_id' element={<SceneBuilder />} />
                <Route path='/story/flow/:story_id' element={<StoryFlow />} />
            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}
