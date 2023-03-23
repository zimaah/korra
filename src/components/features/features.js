import ReactDOM from 'react-dom';
import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './features.css';
import { Button } from "react-bootstrap";

export default function Features() {

    return (
        <>
            <Header page={'features'} />
            <div className="features__container">
                <h1>Features page :)</h1>
            </div>
            <Footer />
        </>
    )
}