import React from "react";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./styles.module.scss"

const CorrectIcon = () => {
    return (
        <FontAwesomeIcon icon={faCheckCircle} className={style.correntIcon}/>
    )
}

const WrongIcon = () => {
    return (
        <FontAwesomeIcon icon={faTimesCircle} className={style.wrongIcon}/>
    )
}

export const alertIcon = {
    CorrectIcon,
    WrongIcon
}