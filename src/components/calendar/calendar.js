import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'

export default class DemoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: []
        };
    }

    showAddEventModal(info) {
        const eventName = prompt("Event name");
        const eventPrice = prompt("How much will it cost?")

        this.setState(
            {
                events: [
                    ...this.state.events,
                    {
                        id: this.state.events.length,
                        title: eventName,
                        date: info.dateStr,
                        extendedProps: {
                            price: eventPrice,
                        }
                    }
                ]
            }
        )
        alert(`Added event ${eventName} ($${eventPrice}) on ${info.dateStr}`)
        console.log(this.state.events);
    }

    showEventDetails(info) {
        console.log(info.event, info.event.extendedProps.price);
        alert(`${info.event.title} ($${info.event.extendedProps.price}) - ${info.event.start}`);
    }

    render() {
        console.log(`this.state.events`, this.state.events);
        return (
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            dateClick={(info) => {
                this.showAddEventModal(info)
            }}
            events={this.state.events}
            eventClick={(info) => {
                this.showEventDetails(info)
            }}
            />
        )
    }
}