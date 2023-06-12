import React from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../../components/calendar/calendar';
import Features from '../../components/features/features';
import Contact from '../../components/contact/contact';
import Home from '../../components/home/home';

// Add listener to watch for "route changes"
window.addEventListener("hashchange", async (e) => {
    const component = e.newURL.split("#")[1];

    // refreshing the page
    Router(component)
})

export default function Router(component) {
    const root = document.getElementById("app")

    switch (component) {
        case 'app': {
            import('../../components/calendar/calendar').then((e) => {
                ReactDOM.render(<Calendar />, root);
            })
            break;
        }

        case 'features': {
            import('../../components/features/features').then((e) => {
                ReactDOM.render(<Features />, root);
            })
            break;
        }

        case 'contato': {
            import('../../components/contact/contact').then((e) => {
                ReactDOM.render(<Contact />, root);
            })
            break;
        }

        default: {
            import('../../components/home/home').then((e) => {
                ReactDOM.render(<Home />, root);
            })
        }
    }
}