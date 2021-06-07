import React, { Fragment } from "react"
import { longdo, map, LongdoMap } from "./LongdoMap";
import { apiURL } from "../../utils/setAxios"
import { LONGDO_MAP_KEY } from "../../config/environmentConfig"
import isEmpty from "../defaultFunction/checkEmptyObject";


export default function MapComponent({ callBackLocation, initLocation, getCurrentLocation }) {
    let location = {
        lon: initLocation && initLocation.lon,
        lat: initLocation && initLocation.lat
    }
    let geolocation = null

    const focusMarker = () => {
        map.location({ lon: location.lon, lat: location.lat }, true);
    }

    const onClickMenubar = () => {
        getCurrentLocation().then((res) => {
            if (res && res.current) {
                location = {
                    lon: res.lon,
                    lat: res.lat
                }
                rerverseGeocoding(res.current)
                focusMarker()
            }
        })
    }

    const setMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
        map.Ui.Geolocation.visible(false)
        map.Ui.Fullscreen.visible(false)
        map.Ui.Toolbar.visible(false)
        map.zoom(17, true);
        focusMarker()

        // set button current location
        const menuBarControl = new longdo.MenuBar({
            button: [
                { label: 'ตำแหน่งปัจจุบัน', type: longdo.ButtonType.Push },
            ], change: onClickMenubar
        })
        map.Ui.add(menuBarControl);
    }

    const setLocation = () => {
        location = map.location()
    }

    const rerverseGeocoding = (current) => {
        apiURL.apiMap.get("/services/address?", {
            params: {
                key: LONGDO_MAP_KEY,
                locale: "th",
                lon: location.lon,
                lat: location.lat,
            }
        })
            .then(res => {
                const dataAddress = res.data
                if (dataAddress.country === "ประเทศไทย" && Number(dataAddress.geocode)) {
                    geolocation = dataAddress
                    callBackLocation(location, geolocation, current)
                }
            }).catch(() => {
                callBackLocation()
                geolocation = null
            })
    }

    const initMap = () => {
        if (!isEmpty(map)) {
            setMap()
            /// fisrt time marker with default location ~ current location or fixed location
            if (!isEmpty(initLocation.current) && !initLocation.originalValue) {
                rerverseGeocoding(true)
            }
            focusMarker()

            map.Event.bind("drop", function () {
                setLocation()
                rerverseGeocoding(false)
            })
        }
    }

    return (
        <Fragment>
             <LongdoMap id="longdo-map" callbackfunction={initMap} />
        </Fragment>

    )
}