import ReactDOM from 'react-dom';
import React from 'react';
import DemoApp from './components/calendar/calendar';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Animate.style
import 'animate.css';

// Custom CSS
import './index.css';

// Firebase
import './engine/persistence/firebase/index';

ReactDOM.render(<DemoApp/>, document.getElementById("app"));