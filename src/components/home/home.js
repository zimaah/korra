import ReactDOM from 'react-dom';
import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './home.css';
import { Button } from "react-bootstrap";

export default function Home() {
    return (
        <>
            <Header />
            <div className="home__container">
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
                    <Button variant="secondary" onClick={async () => {
                        // Firebase
                        await import('../../engine/persistence/firebase/index');

                        // Calendar
                        import('../calendar/calendar').then((e) => {
                            ReactDOM.render(<e.default />, document.getElementById("app"));
                        })
                    }}>Comecar!</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}