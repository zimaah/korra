import React from "react";
import KModal from "../modal/modal";

export default function UpdateRemoveEventModal(props) {
    return (
        <KModal
            edit
            show={props.show}
            handleClose={() => {props.handleClose()}}
            data={props.event}
        />
    )
}