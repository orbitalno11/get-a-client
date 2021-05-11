import axios from "axios";
import React from "react"
import { Fragment } from "react";
import { mapKey } from "../../config/map/index";
import { longdo, map, LongdoMap } from "./LongdoMap";

export default function MapComponent({ callBackLocation, initLocation, getCurrentLocation }) {
    let location = {
        lon: initLocation && initLocation.lon,
        lat: initLocation && initLocation.lat
    }
    let geolocation = null

    let statusSelectedLocation = false

    const focusMarker = () => {
        map.location({ lon: location.lon, lat: location.lat }, true);
    }

    const setStatusSelectedLocation = (status) => {
        statusSelectedLocation = status
        if (statusSelectedLocation) {
            setMarker()
        }
    }

    const onClickMenubar = (event) => {
        if (event.value === "current") {
            getCurrentLocation().then((res) => {
                console.log(res)
                if (res && res.type === 1) {
                    location = {
                        lon: res.lon,
                        lat: res.lat
                    }
                    rerverseGeocoding()
                    focusMarker()
                }
            })
        } else {
            focusMarker()
        }
    }

    const setMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
        // map.Ui.DPad.visible(false)
        map.Ui.Geolocation.visible(false)
        map.Ui.Fullscreen.visible(false)
        map.Ui.Toolbar.visible(false)
        map.zoom(17, true);
        focusMarker()

        // set button currnt location

        const menuBarControl = new longdo.MenuBar({
            button: [
                { label: 'ตำแหน่งปัจจุบัน', type: longdo.ButtonType.Push, value: "current" },
                { label: 'ตำแหน่งที่สนใจ', type: longdo.ButtonType.Push, value: "fucus" }
            ], change: onClickMenubar
        })
        map.Ui.add(menuBarControl);
    }

    const setLocation = () => {
        location = map.location(longdo.LocationMode.Pointer)
    }

    const setMarker = () => {
        const marker = new longdo.Marker({ lon: location.lon, lat: location.lat })
        map.Overlays.clear();
        map.Overlays.add(marker)
    }

    const rerverseGeocoding = () => {
        setStatusSelectedLocation(false)
        axios.get("https://api.longdo.com/map/services/address?", {
            params: {
                key: mapKey,
                locale: "th",
                lon: location.lon,
                lat: location.lat,
            }
        })
            .then(res => {
                const dataAddress = res.data
                if (dataAddress.country === "ประเทศไทย" && Number(dataAddress.geocode)) {
                    console.log(dataAddress)
                    geolocation = dataAddress
                    callBackLocation(location, geolocation)
                    setStatusSelectedLocation(true)
                }
            }).catch(() => {
                callBackLocation()
                geolocation = null
            })
    }

    const initMap = () => {
        setMap()
        /// fisrt time marker with default location ~ current location or fixed location
        if (initLocation.type === 1) {
            rerverseGeocoding()
        }
        setMarker()

        map.Event.bind("click", function () {
            setLocation()
            rerverseGeocoding()
        })
    }

    return (
        <Fragment>
            <LongdoMap id="longdo-map" mapKey={mapKey} callbackfunction={initMap} />
        </Fragment>

    )
}