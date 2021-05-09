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
// import { useCurrentPosition } from "react-use-geolocation";

export default function EditProfileMap({ previousAddress }) {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state)
    const [address, setAddress] = useState(previousAddress && previousAddress)
    const [defineAddress, setDefineAddress] = useState("")
    const [initalLocation, setInitalLocation] = useState(null)
    const [detailAddress, setDetailAddress] = useState({})

    const warningText = {
        color: color.gray
    }

    /// fetch address from reducer and check with previos value
    const fetchProfile = useCallback(() => {

        if (address === undefined) {
            dispatch(profileAction.getAddress())
        }

        if ((profile.address !== null) && (address !== profile.address)) {
            setAddress(profile.address && profile.address)
        }
    }, [profile.address])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    useEffect(() => {
        /// set address when value not null and success in get data from db
        if (address) {
            setDetailAddress({
                "address": address.address,
                "hintAddress": address.hintAddress,
                "detail": address.geoDistrict + " " + address.geoSubDistrict + " " + address.geoProvince + " " + address.postcode
            })
            setInitalLocation({
                lat: 14.939293452903025,
                lon: 100.0078059732914,
                type: address.type
            })
            /// set address as current location when value is null and success in get data from db
        } else if (!profile.getAddress) {
            getCurrentLocation()
        }
    }, [address])

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setInitalLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    type: 1
                })
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    function callLocation(location, geolocation) {
        if (geolocation && geolocation.geocode) {
            let geoLoacationDetail = {
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
                "type": (location.lat === initalLocation.lat && location.lon === initalLocation.lon) ? 1 : 0
            }

            setDetailAddress({
                "address": geoLoacationDetail.address,
                "hintAddress": "",
                "detail": geoLoacationDetail.geoDistrict + " " + geoLoacationDetail.geoSubDistrict + " " + geoLoacationDetail.geoProvince + " " + geoLoacationDetail.postcode
            })

            console.log(geolocation)

            setDefineAddress(geoLoacationDetail)
        }
    }

    const submitAddress = (type) => {
        let formAddress = {}
        if (type === "map") {
            formAddress = {
                "address": defineAddress.address,
                "hintAddress": "",
                "road": "",
                "subDistrict": defineAddress.subDistrict,
                "district": defineAddress.district,
                "province": defineAddress.province,
                "postcode": defineAddress.postcode,
                "lat": defineAddress.lat,
                "lng": defineAddress.lon,
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
                    // value={detailAddress.address}
                />
                <InputComponents
                    name="map"
                    placeholder="รายละเอียดเพิ่มเติม หรือ ลักษณะพิเศษที่สามารถสังเกตได้ เช่น ต้นไม้สีแดง"
                    // value={detailAddress.hintAddress}
                />
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                    {
                        <span >{detailAddress.detail}</span>
                    }
                </div>
                <div className={style.marginTop}>
                    {initalLocation && <MapComponent callBackLocation={callLocation} initLocation={initalLocation} />}
                </div>


            </div>
        </Fragment>
    )
}
