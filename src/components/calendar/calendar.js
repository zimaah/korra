import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ptBR from '@fullcalendar/core/locales/pt-br'
import Header from '../header/header';
import { Button, Container } from 'react-bootstrap';
import './calendar.css';
import { persistence } from '../../engine/persistence';
import '../modal/modal';
import KModal from '../modal/modal';
import KToast from '../toast/toast';
import KSpinner from '../spinner/spinner';
import UpdateRemoveEventModal from './updateRemoveEventModal';
import GenericModal from '../modal/generic-modal'
import { getAuthorizedUser, sendEmailLink, signOut } from '../../engine/auth/firebase-email-link-auth'
import { getAuth, updateProfile } from 'firebase/auth'
import { app } from '../../engine/persistence/firebase'
import Router from '../../engine/router/router'

export default class Calendar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // domain data
            events: [],
            // events CRUD
            showModal: false,
            selectedDate: null,
            showLoadingToast: false,
            showToastSuccess: false,
            loadingEvents: true,
            showModalUpdateRemove: false,
            selectedEvent: undefined,
            // dashboard
            total: 0,
            totalDistance: 0,
            // login journey
            showLoginModal: false,
            showEmailSentModal: false,
            showUserProfileModal: false,
            currentUser: false,
            showToastProfileSaved: false,
            showErrorEmailSentModal: false
        };
    }

    async calculateTotal() {
        const events = await persistence.getAll()
        let total = 0;
        let distance = 0;
        for (let i = 0; i < events.length; i++) {
            const ev = events[i];
            total += Number.parseFloat(ev.price);
            distance += Number.parseFloat(ev.distance);
        }
        
        return {
            price: total,
            distance: distance
        }
    }

    async componentDidMount() {
        // Event listeners
        window.addEventListener("saveEvent", (e) => {
            this.setState({
                showModal: false,
                showModalUpdateRemove: false
            })
            this.onSaveEventHandler(e.detail)
        })
        window.addEventListener("deleteEvent", (e) => {
            this.onDeleteEventHandler(e.detail)
        })

        getAuthorizedUser(async (currentUser) => {
            
            if (currentUser) {
                const events = await persistence.getAll()
                const total = await this.calculateTotal()

                console.log(events)

                this.setState({
                    events: events,
                    loadingEvents: false,
                    total: total.price,
                    totalDistance: total.distance,
                    currentUser: currentUser
                })
            } else {
                this.setState({
                    loadingEvents: false
                })
            }
        })  
    }

    async showAddEventModal(info) {
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
            const total = await this.calculateTotal()

            this.setState({
                events: events,
                showModal: false,
                showModalUpdateRemove: false,
                showToastSuccess: true,
                showLoadingToast: false,
                total: total.price,
                totalDistance: total.distance
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
        return (
            <>
                {
                    this.state.loadingEvents &&
                    <div className='home__loading'>
                        <KSpinner />
                    </div>
                }
                <Header
                    page={"app"}
                    loginMenuClickHandler={() => {
                        this.setState({
                            showLoginModal: true
                        })
                    }}
                    userProfileClickHandler={() => {
                        this.setState({
                            showUserProfileModal: true
                        })
                    }}
                />
                <Container>
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

                    {
                        this.state.showToastProfileSaved &&
                        <KToast
                            message={"Perfil salvo!"}
                            autohide={true}
                            closeButton
                            bg={"success"}
                            show={this.state.showToastProfileSaved}
                            onClose={() => {
                                this.setState({showToastProfileSaved: false})
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

                    {/* LOGIN MODAL */}
                    {   this.state.showLoginModal && 
                        <GenericModal
                            show={this.state.showLoginModal}
                            title={"Fazer login"}
                            body={
                                <>
                                    <p>Para entrar no app, basta informar o e-mail e clicar no link que será enviado para ele.</p>
                                    <form id="generic-modal-form" onSubmit={async (e) => {
                                        try {
                                            e.preventDefault()
                                            const email = document.getElementById("email").value
                                            await sendEmailLink(email)
                                            window.localStorage.setItem('emailForSignIn', email);
                                            this.setState({
                                                showLoginModal: false,
                                                showEmailSentModal: true
                                            })
                                        } catch (error) {
                                            console.error(`sendEmailLink: `, error)
                                            this.setState({
                                                showErrorEmailSentModal: true
                                            })
                                        }
                                    }}>
                                        <input id="email" placeholder='seuemail@exemplo.com' type='email' required autoFocus></input>
                                        <input type="submit" style={{display: 'none'}} id="generic-modal-form-submit-btn"></input>
                                    </form>
                                </>
                            }
                            btnLabel={"Enviar link"}
                            btnClickHandler={() => {
                                document.getElementById("generic-modal-form-submit-btn").click()
                                
                            }}
                            onHideHandler={() => {
                                this.setState({
                                    showLoginModal: false
                                })
                            }}
                            showCloseBtn
                        />
                    }

                    {/* EMAIL SENT MODAL */}
                    { this.state.showEmailSentModal &&
                        <GenericModal
                            show={this.state.showEmailSentModal}
                            title={"E-mail enviado!"}
                            body={
                                <p>
                                    Clique no link enviado para o e-mail <b>{localStorage.getItem("emailForSignIn")}</b> para completar o login 🚀
                                </p>
                            }
                            btnLabel={"OK, entendi!"}
                            btnClickHandler={() => {
                                this.setState({
                                    showEmailSentModal: false   
                                })
                            }}
                        />
                    }

                    {/* ERROR EMAIL SENT MODAL */}
                    { this.state.showErrorEmailSentModal &&
                        <GenericModal
                            show={this.state.showErrorEmailSentModal}
                            title={"Erro ao enviar e-mail! ❌"}
                            body={
                                <>
                                    <p>
                                        Erro ao tentar enviar e-mail. Tente novamente dentro de instantes.
                                    </p>
                                    <p>
                                        Caso o erro persista, por favor <a href={`${window.location.origin}/#contato`}>entre em contato</a>.
                                    </p>
                                </>
                            }
                            btnLabel={"OK, entendi!"}
                            btnClickHandler={() => {
                                this.setState({
                                    showEmailSentModal: false   
                                })
                            }}
                        />
                    }
                    
                    {/* USER PROFILE MODAL */}
                    { this.state.showUserProfileModal &&
                        <GenericModal
                            show={this.state.showUserProfileModal}
                            title={"Perfil"}
                            body={
                                <form className='profile-modal' onSubmit={async (e) => {
                                    e.preventDefault()
                                    console.log("saving profile...", this.state.currentUser)
                                    try {
                                        await updateProfile(this.state.currentUser, {displayName: document.getElementsByName("display_name")[0].value})
                                        this.setState({
                                            showUserProfileModal: false,
                                            showToastProfileSaved: true
                                        })
                                    } catch (error) {
                                        console.error(error)
                                    }
                                }}>
                                    <input type='text' name='display_name' placeholder='Nome ou apelido' autoFocus defaultValue={this.state.currentUser?.displayName}/>
                                    <input type='text' name='email' disabled value={this.state.currentUser?.email} />
                                    <Button variant={"primary"} type="submit">Salvar</Button>
                                    <br/>
                                    <br/>
                                    <Button
                                        variant={"danger"}
                                        onClick={() => {
                                            const doLogout = confirm("Tem certeza que deseja efetuar o logout?")
                                            if (doLogout) {
                                                signOut().then(() => {
                                                    alert("Logout concluído. Esperamos você de volta em breve!")
                                                    // clear flag in localStorage to start an auth journey from scratch
                                                    localStorage.setItem("userAuth", false)
                                                    this.setState({
                                                        showUserProfileModal: false
                                                    })
                                                    Router('')
                                                })
                                            }
                                        }}
                                    >Fazer logout</Button>
                                </form>
                            }
                            showCloseBtn
                            onHideHandler={() => {
                                this.setState({
                                    showUserProfileModal: false
                                })
                            }}
                        />
                    }


                    <FullCalendar
                        plugins={[ listPlugin, dayGridPlugin, interactionPlugin ]}
                        initialView={window.innerWidth <= 440 ? 'listMonth' : 'dayGridMonth'}
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
                        locale={ptBR}
                        headerToolbar={
                            {
                                center: 'dayGridMonth,listMonth' // buttons for switching between views
                            }
                        }
                    />

                    {
                        this.state.currentUser && !this.state.loadingEvents &&
                        <div className={`home__summary animate__animated animate__bounceInLeft`}>
                            <h2>Resumo</h2>
                            <ul>
                                <li>
                                    Custos programados 2023: R$ {
                                        this.state.showLoadingToast ? <KSpinner /> : <span  id={"home__summary-total"}>{ this.state.total }</span>
                                    }
                                </li>
                                <li>
                                    Distancia total planejada 2023: {
                                        this.state.showLoadingToast ? <KSpinner /> : <span  id={"home__summary-total"}>{ this.state.totalDistance }KM</span>
                                    }
                                </li>
                            </ul>
                        </div>
                    }

                    {
                        !this.state.currentUser && !this.state.loadingEvents &&
                        <p style={{textAlign: 'center', marginTop: '10px'}}>
                            <a href='#app' onClick={() => {
                                this.setState({
                                    showLoginModal: true
                                })
                            }}>Clique aqui</a> para entrar no app e adicionar eventos
                        </p>
                    }
                </Container>
            </>
        )
    }
}