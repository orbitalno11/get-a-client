import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";

export let longdo;
export let map;

export function LongdoMap({ id, mapKey, callbackfunction }) {

    const mapCallback = useCallback(() => {
        longdo = window.longdo
        map = new window.longdo.Map({
            placeholder: document.getElementById(id),
            language: "th"
        })
    }, [])

    useEffect(() => {
        const existingScript = document.getElementById("longdoMapScript");

        if (!existingScript) {
            const script = document.createElement("script");
            console.log( `https://api.longdo.com/map/?key=${mapKey}`)
            script.src = `https://api.longdo.com/map/?key=${mapKey}`;
            script.id = "longdoMapScript";
            document.body.appendChild(script);

            script.onload = () => {
                mapCallback();
                if (callbackfunction) callbackfunction();
            };
        }

        if (existingScript) mapCallback();
        if (existingScript && callbackfunction) callbackfunction();

    }, [])

    const styleMap = {
        height : "20rem",
        width : "auto"
    }

    return (
        <div id={id} style={styleMap}></div>
    )
}