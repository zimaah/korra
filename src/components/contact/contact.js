import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './contact.css';

export default function Contact() {

    return (
        <>
            <Header page={'contact'} />
            <div className="contact__container">
                <h1>Contact page :)</h1>
            </div>
            <Footer />
        </>
    )
}