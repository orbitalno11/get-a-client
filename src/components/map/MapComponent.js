import axios from "axios";
import React from "react"
import { mapKey } from "../../config/map/index";
import {longdo, map, LongdoMap} from "./LongdoMap";

export default function MapComponent({ callBackLocation }) {
    let location = null
    let longitude = null
    let latitude = null
    let geolocation = null

    const setMap = () =>{
        map.Layers.setBase(longdo.Layers.GRAY);
    }

    const setLocation = () =>{
        location = map.location(longdo.LocationMode.Pointer)
        longitude = Number(location.lon).toFixed(6)
        latitude = Number(location.lat).toFixed(6)
    }

    const setMarker = (lon,lat) =>{
        const marker = new longdo.Marker({ lon: lon, lat: lat })
        map.Overlays.clear();
        map.Overlays.add(marker)
    }

    const rerverseGeocoding = () => {
        delete axios.defaults.headers.common['Authorization']
        axios.get("https://api.longdo.com/map/services/address?", {
            params: {
                key: mapKey,
                locale : "th",
                lon: longitude,
                lat: latitude
            }
        })
        .then(res => {
            geolocation = res.data

        })
        .catch(err => {
            console.log(err)
            geolocation = null
        })
    }

    const initMap = ()=>{
        setMap()
        // if(map && initLocation){
        //     setMarker(Number(initLocation.lon),Number(initLocation.lat))
        // }

        map.Event.bind('click', function () {
            setLocation()
            rerverseGeocoding(longitude, latitude)
            if(geolocation){
                setMarker(longitude,latitude)
            }
            callBackLocation(location,geolocation)
        })
    }

    return (
        <LongdoMap id="longdo-map"  mapKey={mapKey} callbackfunction={initMap} />
    )
}