import React from 'react';
import { Route, Router, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import StoriesManager from '../components/stories/StoriesManager.jsx'
import Flow from '../Flow.jsx';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<StoriesManager />} />
                <Route path='/stories/:id' element={ <Flow />} />
            </Routes>

        </Router>
    )
}
