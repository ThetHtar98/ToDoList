// src/App.js

import React from 'react';
import Weather from './components/Weather';
import TodoList from './TodoList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

function App() {
    return ( <
        div className = "App" >
        <
        Weather / > < TodoList / > <
        /div>
    );
}

export default App;