import React from 'react';
import {Route, MemoryRouter as Router, Switch, Redirect, useHistory, Link, BrowserRouter} from "react-router-dom";
import '../src/css/bootstrap.min.css';
import '../src/css/font-awesome.min.css';
import '../src/css/magnific-popup.css';
import '../src/css/style.css';
import Swap from "./pages/Swap";
import Lottery from "./pages/Lottery";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Viewer from "./pages/Viewer";


function App() {
    return (
        <Router>
            <Main/>

        </Router>
    );
}

export default App;
