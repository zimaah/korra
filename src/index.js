import ReactDOM from 'react-dom';
import React from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Animate.style
import 'animate.css';

// Custom CSS
import './index.css';

import Home from './Home';

ReactDOM.render(<Home/>, document.getElementById("app"));

window.addEventListener("DOMContentLoaded", async () => {
    // Firebase
    await import('./engine/persistence/firebase/index');

    // Calendar
    import('./components/calendar/calendar').then((e) => {
        ReactDOM.render(<e.default />, document.getElementById("app"));
    })
})