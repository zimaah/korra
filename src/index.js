import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components/home/home';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Animate.style
import 'animate.css';

// Custom CSS
import './index.css';
import Features from './components/features/features';
import Contact from './components/contact/contact';
import Calendar from './components/calendar/calendar';

ReactDOM.render(<Calendar />, document.getElementById("app"));

window.addEventListener("hashchange", async (e) => {
    console.log(e)

    const component = e.newURL.split("#")[1];

    // refreshing the page
    switch (component) {
        case 'features': {
            import('./components/calendar/calendar').then((e) => {
                ReactDOM.render(<Features />, document.getElementById("app"));
            })
            break;
        }

        case 'contato': {
            import('./components/calendar/calendar').then((e) => {
                ReactDOM.render(<Contact />, document.getElementById("app"));
            })
            break;
        }
    }
})