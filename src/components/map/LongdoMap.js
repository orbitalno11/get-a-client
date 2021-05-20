import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React, { useEffect, useCallback } from "react";
import { LONGDO_MAP_KEY, LONGDO_MAP_URL } from "../../config/environmentConfig"
import isEmpty from "../defaultFunction/checkEmptyObject";
import { color } from "../defaultValue";
export let longdo;
export let map;

export function LongdoMap({ id, callbackfunction }) {
    const mapCallback = useCallback(() => {
        longdo = window.longdo
        if (!isEmpty(longdo)) {
            map = new window.longdo.Map({
                placeholder: document.getElementById(id),
                language: "th"
            })
        }
    }, [])

    useEffect(() => {
        const existingScript = document.getElementById("longdoMapScript");
        document.getElementById("warningBox").style.visibility="hidden"

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `${LONGDO_MAP_URL}/?key=${LONGDO_MAP_KEY}`;
            script.id = "longdoMapScript";
            document.body.appendChild(script);
            script.onload = () => {
                mapCallback();
                if (callbackfunction) callbackfunction();
            };

            script.onerror = () => {
               document.getElementById("warningBox").style.visibility="visible"
            }

        }

        if (existingScript) mapCallback();
        if (existingScript && callbackfunction) callbackfunction();

    }, [])

    const styleMap = {
        height: "20rem",
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }

    const iconWarning = {
        fontSize: "4rem",
        color: color.yellow,
    }

    const textWarning = {
        marginTop: "1.25rem",
        marginBottom: "2rem"
    }

    return (
        <div id={id} style={styleMap}>
            <div id="warningBox" >
                <FontAwesomeIcon icon={faExclamationTriangle} style={iconWarning} />
                <p style={textWarning}>ไม่สามารถโหลดแผนที่ได้ กรุณาลองใหม่อีกครั้ง</p>
                <Button type="primary" size="middle" onClick={() => { window.location.reload(); }}>โหลดหน้านี้ใหม่</Button>
            </div>
        </div>
    )
}