import React from 'react';
import { Route, Router, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import StoriesManager from '../components/stories/StoriesManager.jsx'
import Flow from '../Flow.jsx';

export default function AppRouter() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<StoriesManager />} />
                <Route path='/stories/' element={<Flow />} />
            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}
