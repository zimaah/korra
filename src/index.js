import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components/home/home';

// Firebase setup
import './engine/persistence/firebase/index';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Animate.style
import 'animate.css';

// Custom CSS
import './index.css';

ReactDOM.render(<Home />, document.getElementById("app"));