import React from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../../components/calendar/calendar';
import Features from '../../components/features/features';
import Contact from '../../components/contact/contact';

export default function Router(component) {
    console.log(component)
    switch (component) {
        case 'app': {
            import('../../components/calendar/calendar').then((e) => {
                ReactDOM.render(<Calendar />, document.getElementById("app"));
            })
            break;
        }

        case 'features': {
            import('../../components/features/features').then((e) => {
                ReactDOM.render(<Features />, document.getElementById("app"));
            })
            break;
        }

        case 'contato': {
            import('../../components/contact/contact').then((e) => {
                ReactDOM.render(<Contact />, document.getElementById("app"));
            })
            break;
        }
    }
}