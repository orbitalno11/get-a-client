import { Image } from "antd"
import React from "react"
import coin from "../images/coin.svg"

const buttonFull = (buttonColor, size) =>{
    return ({
        backgroundColor : buttonColor,
        width  : size ? size : "100%"
    })
}

const iconCoin = () =>{
    const coinStyle ={
        width : "21px",
        height : "21px"
    }
    return (
        <Image src={coin} preview={false} style={coinStyle}/>
    )
}

export  const styleComponent = {
    buttonFull,
    iconCoin
} 
