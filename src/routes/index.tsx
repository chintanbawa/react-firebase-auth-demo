import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

//services
import { AuthState } from 'services/auth';
//types
import { TAuthContext } from 'types';
//pages
import Register from 'pages/Register';
import Login from 'pages/Login';
import Home from 'pages/Home';
//route-wrapper
import { ProtectedRoute, PublicRoute } from './RouteWrappers';


const AppRoutes = () => {

    const { state: { isAuthenticated } } = useContext(AuthState) as TAuthContext
    return (
        <Router>
            <Routes>
                <Route path='*' element={<Navigate to='/login' />} />
                <Route path='/login' element={<PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>} />
                <Route path='/register' element={<PublicRoute isAuthenticated={isAuthenticated}><Register /></PublicRoute>} />
                <Route path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 