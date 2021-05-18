import React from "react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { color } from "../defaultValue";

const correntStyle ={
    color : color.orange,
    fontSize: '6rem'
}

const wrongStyle ={
    color : color.red,
    fontSize: '6rem'
}

const CorrectIcon = () => {
    return (
        <FontAwesomeIcon icon={faCheckCircle} style={correntStyle}/>
    )
}

const WrongIcon = () => {
    return (
        <FontAwesomeIcon icon={faTimesCircle} style={wrongStyle}/>
    )
}

export const alertIcon = {
    CorrectIcon,
    WrongIcon
}