import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'

export default class DemoApp extends React.Component {

    showAddEventModal(info) {
        const eventName = prompt("Event name");
        const eventPrice = prompt("How much will it cost?")

        alert(`Added event ${eventName} ($${eventPrice}) on ${info.dateStr}`)
    }

    render() {
        return (
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            dateClick={(info) => {
                this.showAddEventModal(info)
            }}
            />
        )
    }
}