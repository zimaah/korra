import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './home.css';
import { Button } from "react-bootstrap";
import { reAuthenticate, sendEmailLink, signInEmailLink, signOut } from '../../engine/auth/firebase-email-link-auth';
import { getAuth } from 'firebase/auth';
import { app } from '../../engine/persistence/firebase';
import GenericModal from '../modal/generic-modal';

export default function Home() {
    const [showLoginSuccessfulModal, setShowLoginSuccessfulModal] = useState(false)
    const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
    let authUser = null;

    useEffect(() => {
        getAuth(app).onAuthStateChanged((user) => {
            authUser = user
        });
    }, [])

    // checks if sign up process has started
    window.addEventListener("load", () => {
        console.log("load!")
        const signPromise = signInEmailLink()
        if (signPromise) {
            signPromise.then((result) => {
                // Clear email from storage.
                // window.localStorage.removeItem('emailForSignIn');

                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
                console.log(result.user);

                setShowLoginSuccessfulModal(true)
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.error(error)
                setShowLoginErrorModal(true)
            });
        }
    })

    const loadApp = async () => {
        // Firebase
        // await import('../../engine/persistence/firebase/index');

        // Calendar
        import('../calendar/calendar').then((e) => {
            ReactDOM.render(<e.default />, document.getElementById("app"));
        })
    }

    const isDisabled = () => {
        return authUser !== null;
    }

    const sendEmail = () => {
        sendEmailLink('zimaah@gmail.com')
    }

    const logout = () => {
        signOut()
    }

    const login = () => {
        signInEmailLink()
    }

    return (
        <>
            <Header />
            <div className="home__container">
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
                            window.location.hash = 'app'
                        }}
                    />
                }
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
                            // navigate to app
                            setShowLoginErrorModal(false)
                        }}
                    />
                }
                <div className="home__cta">
                    <h1>
                        A plataforma Korra foi desenvolvida
                        <i> por corredores para corredores</i>.
                        <br />
                        <br />
                        Foque nos treinos e corridas e deixe o resto conosco.
                        <br />
                        <br />
                        Pronto?
                    </h1>
                    <br />
                    <Button variant="secondary" onClick={loadApp}>Comecar!</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}