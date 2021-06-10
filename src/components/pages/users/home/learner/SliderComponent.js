import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from 'react'
import Slider from "react-slick";

export default function SliderComponent({ data, card }) {
    const screens = useBreakpoint()

    const showCard = () => {
        let number
        if (screens.xl) {
            number = 3
        } else if (screens.lg) {
            number = 3
        } else if (screens.md) {
            number = 3
        } else if (screens.sm) {
            number = 2
        } else if (screens.xs) {
            number = 1
        }
        return number
    }

    const settings = {
        dots:true,
        infinite: card ? false : true,
        slidesToShow: card ? showCard() : (screens.xs ? 3 : 5),
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        variableWidth: card ? true : false,
    };

    return (
        <Slider {...settings} style={{ height: card ? "14rem" : "auto" }}>
            {data}
        </Slider>
    )
}