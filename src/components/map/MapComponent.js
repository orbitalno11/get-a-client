import axios from "axios";
import React from "react"
import { mapKey } from "../../config/map/index";
import {longdo, map, LongdoMap} from "./LongdoMap";

export default function MapComponent({ callBackLocation, initLocation}) {
    let location = {
        lon : initLocation && initLocation.lon,
        lat : initLocation && initLocation.lat
    }
    let geolocation = null

    const setMap = () =>{
        map.Layers.setBase(longdo.Layers.GRAY);
    }

    const setLocation = () =>{
        location = map.location(longdo.LocationMode.Pointer)
    }

    const setMarker = () =>{
        const marker = new longdo.Marker({ lon: location.lon, lat: location.lat })
        map.Overlays.clear();
        map.Overlays.add(marker)
    }

    const rerverseGeocoding = () => {
        axios.get("https://api.longdo.com/map/services/address?", {
            params: {
                key: mapKey,
                locale : "th",
                lon: location.lon,
                lat: location.lat,
            }
        })
        .then(res => {
            geolocation = res.data
            callBackLocation( location , geolocation)
        })
        .catch(err => {
            console.log(err)
            geolocation = null
        })
    }

    const initMap = ()=>{
        setMap()
        /// fisrt time marker with default location ~ current location or fixed location
        setMarker()
        if(initLocation.type === 1){
            rerverseGeocoding()
        }
        
        map.Event.bind('click', function () {
            setLocation()
            rerverseGeocoding()
            if(geolocation){
                setMarker()
            }
        })
    }

    return (
        <LongdoMap id="longdo-map"  mapKey={mapKey} callbackfunction={initMap} />
    )
}