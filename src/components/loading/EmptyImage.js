import React from 'react'
import Image from "../images/emptyImage.webp"

export default function EmptyImage({ size }) {

    const scaleImage = () => {
        if (size === "small") {
            return "10rem"
        }else if(size === "default"){
            return "12rem"
        }
    }

    const sizeImage = {
        width: scaleImage(),
        height: scaleImage()
    }

    return (
        <img
            src={Image}
            style={sizeImage}
        />
    )
}
