import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Image } from "antd"
import React from "react"
import { color } from "../defaultValue"
import coin from "../images/coin.svg"
import style from "../../stylesDefault.module.scss";

const buttonFull = (buttonColor, size) =>{
    return ({
        backgroundColor : buttonColor,
        width  : size ? size : "100%"
    })
}

const iconCoin = (size) =>{
    const coinStyle ={
        width  : size ? size+"px" : "21px",
        height : size ? size+"px" : "21px"
    }
    return (
        <Image src={coin} preview={false} style={coinStyle}/>
    )
}

const iconStar = () =>{
    const colorStart = {
        color: color.yellow
    }

    return (
        <FontAwesomeIcon icon={faStar} className={style.iconSmall} style={colorStart} />
    )
}

export  const styleComponent = {
    buttonFull,
    iconCoin,
    iconStar
} 