import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import Header from '../header/header';
import { Container } from 'react-bootstrap';
import './calendar.css';
import { persistence } from '../../engine/persistence';
import '../modal/modal';
import KModal from '../modal/modal';

export default class DemoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            showModal: false,
            selectedDate: null
        };
    }

    async componentDidMount() {
        const events = await persistence.getAll()
        this.setState({events: events})
    }

    async showAddEventModal(info) {
        console.log("info", info);
        this.setState({
            showModal: true,
            selectedDate: info.dateStr
        })
    }

    showEventDetails(info) {
        console.log(info.event, info.event.extendedProps.price);
        alert(`${info.event.title} ($${info.event.extendedProps.price}) - ${info.event.start}`);
    }

    render() {
        console.log(this.state.events)
        return (
            <>
                <Header />
                <Container className='home__container'>
                    {this.state.showModal && <KModal date={this.state.selectedDate} show={this.state.showModal} handleConfirm={async (name, price, date) => {
                        persistence.add({
                            title: `${name} (R$ ${price} 💵)`,
                            date: date,
                            extendedProps: {
                                price: price,
                            }
                        })
                
                        const events = await persistence.getAll()
                        this.setState({
                            events: events,
                            showModal: false
                        })
                    }} />}
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

                    <div className='home__summary'>
                        <h2>Resumo</h2>
                        <ul>
                            <li>
                                Custos programados 2023: R$ 2500,00
                            </li>
                            <li>
                                Custos 1 semestre 2023: R$ 1500,00
                            </li>
                            <li>
                                Custos Marco 2023: R$ 500,00
                            </li>
                        </ul>
                    </div>
                </Container>
            </>
        )
    }
}