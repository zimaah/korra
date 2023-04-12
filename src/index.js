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
import Features from './components/features/features';
import Contact from './components/contact/contact';
import Calendar from './components/calendar/calendar';
import { getAuthorizedUser, reAuthenticate, signInEmailLink } from './engine/auth/firebase-email-link-auth';
import Router from './engine/router/router';

ReactDOM.render(<Home />, document.getElementById("app"));

// router
window.addEventListener("hashchange", async (e) => {
    console.log(e)
    const component = e.newURL.split("#")[1];

    // refreshing the page
    Router(component)
})