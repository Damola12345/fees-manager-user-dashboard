import React from 'react'
import './displayMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'


const DisplayMessage = (props) => {

    const CloseMessage = () => {
        const message = document.getElementById("message-box")
        message.style.display = "none"
    }

    return (
        <div id="message-box">
            <p id='alert-message'>{props.message}</p>
            <div id="cancel-message" onClick={CloseMessage} >
                <FontAwesomeIcon icon={faXmarkCircle} color="purple" />
            </div>
        </div>
    )
}

export default DisplayMessage