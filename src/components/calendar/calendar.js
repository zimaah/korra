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
import KSpinner from '../spinner/spinner';
import UpdateRemoveEventModal from './updateRemoveEventModal';

export default class DemoApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            showModal: false,
            selectedDate: null,
            showLoadingToast: false,
            showToastSuccess: false,
            loadingEvents: true,
            total: 0,
            showModalUpdateRemove: false,
            selectedEvent: undefined
        };
    }

    async calculateTotalPrice() {
        const events = await persistence.getAll()
        let total = 0;
        for (let i = 0; i < events.length; i++) {
            const ev = events[i];
            total += Number.parseFloat(ev.price);
        }
        return total;
    }

    async componentDidMount() {
        this.setState({ loadingEvents: true })
        window.addEventListener("saveEvent", (e) => {
            this.onSaveEventHandler(e.detail.name, e.detail.extendedProps.price, e.detail.date, e.detail.extendedProps)
        })
        const events = await persistence.getAll()
        this.setState({
            events: events,
            loadingEvents: false,
            total: await this.calculateTotalPrice()
        })
    }

    async showAddEventModal(info) {
        this.setState({
            showModal: true,
            selectedDate: info.dateStr
        })
    }

    onSaveEventHandler(name, price, date, x) {
        this.setState({ showLoadingToast: true });
        console.log("x",x);

        persistence.add({
            title: `${name} (R$ ${price} 💵)`,
            date: date,
            extendedProps: {
                price: price,
                ...extendedProps
            }
        }).then(async () => {
            const events = await persistence.getAll()
            this.setState({
                events: events,
                showModal: false,
                showToastSuccess: true,
                showLoadingToast: false,
                total: await this.calculateTotalPrice()
            });

            // hack! (to be removed)
            setTimeout(() => {
                this.setState({showToastSuccess: false})
            }, 3000)
        });
    }

    showEventDetails(info) {
        this.setState({
            showModalUpdateRemove: true,
            selectedEvent: info
        })
    }

    render() {
        const summaryClass = !this.state.loadingEvents ? 'animate__animated animate__bounceInLeft' : '';
        return (
            <>
                <Header />
                {
                    this.state.loadingEvents &&
                    <div className='home__loading'>
                        <KSpinner />
                    </div>
                }
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
                    
                    {/* ADD */}
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
                                    showLoadingToast: false,
                                    total: await this.calculateTotalPrice()
                                });

                                // hack! (to be removed)
                                setTimeout(() => {
                                    this.setState({showToastSuccess: false})
                                }, 3000)
                            });
                        }} 
                    />

                    {/* UPDATE / REMOVE */}
                    {
                        this.state.showModalUpdateRemove &&
                        <UpdateRemoveEventModal
                            event={this.state.selectedEvent}
                            show={this.state.showModalUpdateRemove}
                            handleClose={ () => {this.setState({
                                showModalUpdateRemove: false
                            })} }
                            handleConfirm={(name, price, date) => {
                                console.log("handleConfirm callback...");
                            }}
                        />
                    }


                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        dateClick={(info) => {
                            this.showAddEventModal(info)
                        }}
                        events={this.state.events}
                        eventClick={(info) => {
                            this.setState({
                                showModalUpdateRemove: true,
                                selectedEvent: info.event
                            })
                        }}
                    />

                    <div className={`home__summary ${summaryClass}`}>
                        <h2>Resumo</h2>
                        <ul>
                            <li>
                                Custos programados 2023: R$ {
                                    this.state.showLoadingToast ? <KSpinner /> : <span  id={"home__summary-total"}>{ this.state.total }</span>
                                }

                            </li>
                        </ul>
                    </div>
                </Container>
            </>
        )
    }
}