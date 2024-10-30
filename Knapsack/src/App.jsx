import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome'; 
import Solution from './pages/Solution'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/solution" element={<Solution />} /> 
            </Routes>
        </Router>
    );
};

export default App;
