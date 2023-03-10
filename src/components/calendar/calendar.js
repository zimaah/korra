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

        // Event listeners
        window.addEventListener("saveEvent", (e) => {
            this.onSaveEventHandler(e.detail)
        })
        window.addEventListener("deleteEvent", (e) => {
            this.onDeleteEventHandler(e.detail)
        })

        const events = await persistence.getAll()
        this.setState({
            events: events,
            loadingEvents: false,
            total: await this.calculateTotalPrice()
        })
    }

    async showAddEventModal(info) {
        console.log(info);
        this.setState({
            showModal: true,
            selectedDate: info.dateStr
        })
    }

    async onDeleteEventHandler(path) {
        await persistence.remove(path);        
        const events = await persistence.getAll();
        this.setState({
            events: events,
            showModalUpdateRemove: false
        })
        alert("Evento removido com sucesso!");
    }

    onSaveEventHandler(event) {
        this.setState({ showLoadingToast: true });

        persistence.add(event).then(async () => {
            const events = await persistence.getAll()
            this.setState({
                events: events,
                showModal: false,
                showModalUpdateRemove: false,
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
                        data={{
                            startStr: this.state.selectedDate
                        }}
                        show={this.state.showModal}
                        handleClose={() => {
                            this.setState({showModal: false})
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
                            console.log("editing...", info.event);
                            this.setState({
                                showModalUpdateRemove: true,
                                selectedEvent: info.event
                            })
                        }}
                        loading={(isLoading) => {
                            console.log(`isLoading`, isLoading);
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