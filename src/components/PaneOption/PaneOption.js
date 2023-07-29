import React from 'react'
import './PaneOption.css'


const PaneOption = (props) => {
    return (
        <div className="pane-option-container" style={{backgroundColor: props.bcolor, color: props.color}}>
            {
                props.bold
                ?
                <h4>{props.name}</h4>
                :
                <p>{props.name}</p>
            }
        </div>
    )
}

export default PaneOption