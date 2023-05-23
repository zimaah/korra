import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './home.css';
import { Button } from "react-bootstrap";
import { getAuth } from 'firebase/auth';
import { app } from '../../engine/persistence/firebase';
import GenericModal from '../modal/generic-modal';
import Router from '../../engine/router/router';
import { checksIfLoginSuccessful } from '../../engine/auth/utils';
import KSpinner from '../spinner/spinner';

export default function Home() {
    const [showLoginSuccessfulModal, setShowLoginSuccessfulModal] = useState(false)
    const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
    const [loading, setLoading] = useState(true)

    // let authUser = null;

    // useEffect(() => {
    //     getAuth(app).onAuthStateChanged((user) => {
    //         authUser = user
    //     });
    // }, [])

    // checks if sign up process has started
    window.addEventListener("load", () => {
        console.log('load!')
        checksIfLoginSuccessful({
            setShowLoginSuccessfulModal: setShowLoginSuccessfulModal,
            setShowLoginErrorModal: setShowLoginErrorModal
        })

        const component = window.location.hash.replace('#', '');
        // refreshing the page
        Router(component)
        setLoading(false)
    })

    const loadApp = async () => {
        // Firebase
        // await import('../../engine/persistence/firebase/index');

        // Calendar
        import('../calendar/calendar').then((e) => {
            ReactDOM.render(<e.default />, document.getElementById("app"));
        })
    }

    return (
        <>
            <Header page={'home'} />
                    {
                        loading &&
                        <div className='loading-overlay'>
                            <KSpinner />
                        </div>
                    }
                <div id="home-container" className="home__container">
                    {/* SUCCESS LOGIN MODAL */}
                    {   showLoginSuccessfulModal &&
                        <GenericModal
                            show={showLoginSuccessfulModal}
                            title={"Login realizado com sucesso!"}
                            body={
                                <p>
                                    Você já pode começar a adicionar seus primeiros eventos…
                                </p>
                            }
                            btnLabel={"Começar"}
                            btnClickHandler={() => {
                                // navigate to app
                                window.location.href = `${window.location.origin}/#app`
                            }}
                        />
                    }

                    {/* ERROR LOGIN MODAL */}
                    {   showLoginErrorModal &&
                        <GenericModal
                            show={showLoginErrorModal}
                            title={"Erro ao efetuar login!"}
                            body={
                                <p>
                                    Ops, aconteceu algum erro... Por favor, tente novamente.
                                </p>
                            }
                            btnLabel={"OK"}
                            btnClickHandler={() => {
                                setShowLoginErrorModal(false)
                            }}
                        />
                    }
                    <div className="home__cta animate__animated animate__flipInX" id="home__cta">
                        <h1>
                            A plataforma Korra foi desenvolvida
                            <i> por corredores para corredores</i>.
                            <br />
                            <br />
                            Foque nas corridas e deixe o resto conosco.
                            <br />
                            <br />
                            Pronto?
                        </h1>
                        <br />
                        <Button variant="secondary" className='cta-btn' onClick={loadApp}>Comecar!</Button>
                    </div>
                </div>
            <Footer />
        </>
    )
}