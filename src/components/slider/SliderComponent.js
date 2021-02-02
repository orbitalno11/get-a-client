import React from "react"
import Slider from "react-slick"

const chunksArray = (array, size) => {
    const results = []
    while (array.length) {
        results.push(array.splice(0, size));
    }
    return results
}

const SliderComponent = ({ dot,item }) => {

    const settings = {
        dots: dot,
        speed: 1000,
        slidesToShow: 1,
        infinite: true,
      };

      
    return (
        <Slider {...settings} >
            {item}
        </Slider>
    )
}

export {
    chunksArray,
    SliderComponent
}