import { Button } from "antd";
import React, { Fragment } from "react"
import style from "../../styles.module.scss"
import {
    faCrosshairs
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../../headerMobile/Header";
import isMobile from "../../../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { profileAction } from "../../../../../../redux/actions";
import { useState } from "react";
import MapComponent from "../../../../../map/MapComponent";
import InputComponents from "../../../../../input/InputComponets";
import { color } from "../../../../../defaultValue";

export default function EditProfileMap({ previousAddress }) {
    const { profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(previousAddress && previousAddress)
    const [addressFixedDetail, setAddressFixedDetail] = useState("")
    const [myGeolocation, setMyGeolocation] = useState("")
    const [initLocation, setInitLocation] = useState(null)
    let addressText = ""
    let hintAddress = ""

    const warningText = {
        color: color.gray
    }

    const fetchProfile = useCallback(() => {
        if (previousAddress === undefined) {
            dispatch(profileAction.getAddress())
        }

        console.log(profile.address && (previousAddress !== profile.address))

        if (profile.address && (previousAddress !== profile.address)) {
            console.log(profile.address)
                setAddress(profile.address && profile.address)
                console.log("dd")
        }
    }, [address])

    useEffect(() => {
        fetchProfile()
        console.log(address)
        if (address) {
            addressText = address && (address.geoDistrict + " " + address.geoSubDistrict + " " + address.geoProvince + " " + address.postcode)
            hintAddress = address && (address.hintAddress ? "(" + address.hintAddress + ")" : "")
            setAddressFixedDetail(addressText + "" + hintAddress)
            setInitLocation({
                lat: 14.939293452903025,
                lon: 100.0078059732914
            })
        }

    }, [address])


    function callLocation(location, geolocation) {
        console.log(location)
        if (location && geolocation && geolocation.geocode) {
            let GeoLoacation = {
                "address": geolocation.aoi ? geolocation.aoi : "",
                "hintAddress": "",
                "road": "",
                "subDistrict": geolocation.geocode,
                "district": geolocation.geocode.substring(0, 4),
                "province": geolocation.geocode.substring(0, 2),
                "postcode": geolocation.postcode,
                "lat": location.lat,
                "lon": location.lon,
                "geoSubDistrict": geolocation.subdistrict,
                "geoDistrict": geolocation.district,
                "geoProvince": geolocation.province,
            }
            setMyGeolocation(GeoLoacation)
        }
    }

    const submitAddress = (type) => {
        let formAddress = {}
        if (type === "map") {
            formAddress = {
                "address": myGeolocation.address,
                "hintAddress": "",
                "road": "",
                "subDistrict": myGeolocation.subDistrict,
                "district": myGeolocation.district,
                "province": myGeolocation.province,
                "postcode": myGeolocation.postcode,
                "lat": myGeolocation.lat,
                "lng": myGeolocation.lon,
                "type": 1
            }
        }
        dispatch(profileAction.setAddress(formAddress))
    }

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไขข้อมูล" pageBack="/learner/1" />}
            <div className={!isMobile() ? style.paddingbody : style.body}>

                <div className={style.TitleCoin}>
                    <span className={style.titleH5}>เลือกจากแผนที่</span>
                    <div className={style.floatLeft}>
                        <Button className="buttonColor backgroundBlue" size="middle" shape="round" onClick={() => submitAddress("map")}>ใช้ที่อยู่นี้</Button>
                    </div>
                </div>
                <p style={warningText}>  (ที่อยู่ที่ได้จากแผนที่อาจไม่ละเอียด)</p>

                <InputComponents
                    name="map"
                    placeholder="ที่อยู่อย่างละเอียด"
                    defaultValue={address && address.address}
                />
                <InputComponents
                    name="map"
                    placeholder="รายละเอียดเพิ่มเติม หรือ ลักษณะพิเศษที่สามารถสังเกตได้ เช่น ต้นไม้สีแดง"
                    defaultValue={address && hintAddress}
                />
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                    {
                        myGeolocation ?
                            (
                                <span >{myGeolocation.address} {myGeolocation.road} {myGeolocation.geoSubDistrict} {myGeolocation.geoDistrict} {myGeolocation.geoProvince} {myGeolocation.postcode}</span>
                            ) :
                            (
                                <span >{addressFixedDetail}</span>
                            )
                    }
                </div>
                <div className={style.marginTop}>
                    {initLocation && <MapComponent callBackLocation={callLocation} initLocation={initLocation} />}
                </div>


            </div>
        </Fragment>
    )
}
