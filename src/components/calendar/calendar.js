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
import KToast from '../toast/toast';

export default class DemoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            showModal: false,
            selectedDate: null,
            showLoadingToast: false,
            showToastSuccess: false,
        };
    }

    async componentDidMount() {
        const events = await persistence.getAll()
        this.setState({events: events})
    }

    async showAddEventModal(info) {
        this.setState({
            showModal: true,
            selectedDate: info.dateStr
        })
    }

    showEventDetails(info) {
        alert(`${info.event.title} ($${info.event.extendedProps.price}) - ${info.event.start}`);
    }

    render() {
        console.log(`rendering calendar`,this.state)
        return (
            <>
                <Header />
                <Container className='home__container'>
                    {
                        this.state.showLoadingToast &&
                        <KToast
                            message={"Salvando evento..."}
                            autohide={false}
                            bg={"warning"}
                            show={this.state.showLoadingToast}
                            loading
                        />
                    }
                    {
                        this.state.showToastSuccess &&
                        <KToast
                            message={"Evento salvo!"}
                            autohide={true}
                            closeButton
                            bg={"success"}
                            show={this.state.showToastSuccess}
                            onClose={() => {
                                this.setState({showToastSuccess: false})
                            }}
                        />
                    }
                    
                    <KModal
                        date={this.state.selectedDate}
                        show={this.state.showModal}
                        handleClose={() => {
                            this.setState({showModal: false})
                        }}
                        handleConfirm={async (name, price, date) => {
                            this.setState({ showLoadingToast: true });

                            persistence.add({
                                title: `${name} (R$ ${price} 💵)`,
                                date: date,
                                extendedProps: {
                                    price: price,
                                }
                            }).then(async () => {
                                const events = await persistence.getAll()
                                this.setState({
                                    events: events,
                                    showModal: false,
                                    showToastSuccess: true,
                                    showLoadingToast: false
                                });

                                // hack! (to be removed)
                                setTimeout(() => {
                                    this.setState({showToastSuccess: false})
                                }, 3000)
                            });
                        }} 
                    />


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