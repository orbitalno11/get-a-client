import React, { Fragment, useEffect, useState } from "react"
import { Alert, Spin } from "antd";
import style from "../../styles.module.scss"
import {
    faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../../headerMobile/Header";
import isMobile from "../../../../../isMobile/isMobile";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../../../../../redux/actions";
import MapComponent from "../../../../../map/MapComponent";
import InputComponents from "../../../../../input/InputComponets";
import { color, defaultValue } from "../../../../../defaultValue";
import { profileAddressSchema } from "../../../../../../validation/profile/profileAddressSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalComponent from "../../../../../modal/ModalComponent";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import { useCallback } from "react";
import Loading from "../../../../../loading/Loading";
import { styleComponent } from "../../../../../defaultFunction/style";

export default function EditProfileMap() {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(state => state)
    const [address, setAddress] = useState(null)
    const [initalLocation, setInitalLocation] = useState(null)
    const [stageCurrentLocation, setStageCurrentLocation] = useState({
        loading: false,
        permission: true
    })

    const [detailAddress, setDetailAddress] = useState({
        "address": "",
        "hintAddress": "",
        "detail": ""
    })

    const marginSpin = {
        marginRight: '1.6rem'
    }

    const styleLoadingMap = {
        backgroundColor: color.gray,
        height: "20rem",
        width: "auto"
    }

    const widthForm = {
        width: isMobile() ? "100%" : "60%",
        display: "block",
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    const { register, errors, handleSubmit, reset } = useForm({
        resolver: yupResolver(profileAddressSchema),
    });

    useEffect(() => {
        dispatch(profileAction.getAddress())
    }, [])

    useEffect(() => {
        if (profile.getAddress) {
            setAddress(profile.address)
        }
    }, [profile])


    const fetchProfile = useCallback(() => {
        if (!isEmpty(address)) {
            setDetailAddress({
                "address": address.address,
                "hintAddress": address.hintAddress,
                "detail": address.geoDistrict + " " + address.geoSubDistrict + " " + address.geoProvince + " " + address.postcode
            })
            setInitalLocation({
                lat: address.lat,
                lon: address.lon,
                current: false,
                originalValue: true
            })
            reset({
                address: address.address,
                hintAddress: address.hintAddress
            })
            /// set address as current location when value is null and success in get data from db
        } else if (profile.getAddress && isEmpty(profile.address)) {
            setDetailAddress({
                "address": defaultValue.constantLocation.defaultAddress,
                "hintAddress": "",
                "detail": defaultValue.constantLocation.defaultDetailAddress
            })
            setInitalLocation({
                lat: defaultValue.constantLocation.defaultLat,
                lon: defaultValue.constantLocation.defaultLng,
                current: false,
                originalValue: true
            })
            reset({
                address: defaultValue.constantLocation.defaultAddress,
                hintAddress: ""
            })
        }
    }, [address])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const setCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            setStageCurrentLocation({
                ...stageCurrentLocation,
                loading: true,
            })
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coordinates = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        current: true,
                    }
                    setStageCurrentLocation({
                        loading: false,
                        permission: true
                    })
                    resolve(coordinates)
                },
                (error) => {
                    setStageCurrentLocation({
                        loading: false,
                        permission: false
                    })
                    reject(error)
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
            )
        })
    }

    const callLocation = (location, geolocation, current) => {
        if (location) {
            let geoLoacationDetail = {
                "address": geolocation.aoi ? geolocation.aoi : "",
                "hintAddress": "",
                "road": "",
                "subDistrict": geolocation.geocode,
                "district": geolocation.geocode.substring(0, 4),
                "province": geolocation.geocode.substring(0, 2),
                "postcode": geolocation.postcode ? geolocation.postcode : "",
                "lat": location.lat,
                "lon": location.lon,
                "geoSubDistrict": geolocation.subdistrict ? geolocation.subdistrict : "",
                "geoDistrict": geolocation.district ? geolocation.district : "",
                "geoProvince": geolocation.province ? geolocation.province : "",
                "type": current
            }
            setAddress(geoLoacationDetail)
        }
    }

    const submitAddress = (data) => {
        if (data) {
            let formAddress = {}
            formAddress = {
                "address": data.address,
                "hintAddress": data.hintAddress,
                "road": "",
                "subDistrict": address.subDistrict,
                "district": address.district,
                "province": address.province,
                "postcode": address.postcode,
                "lat": address.lat,
                "lng": address.lon,
                "type": 1
            }
            dispatch(profileAction.setAddress(formAddress))
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไขสถานที่" pageBack={"goback"} />}
            <ModalComponent />
            {
                loading.loading && (
                    <Loading />)
            }
            <Fragment>
                <div className={style.body} style={widthForm} >
                    <form onSubmit={handleSubmit(submitAddress)} >
                        <div>
                            {
                                !isMobile() && (
                                    <div className={style.section}>
                                        <span className={style.headerThree}>เลือกที่อยู่จากแผนที่</span>
                                    </div>
                                )
                            }
                            <div className={`${style.section} ${!isMobile() && style.marginSection}`}>
                                <div className={style.paddingBottom}>
                                    {
                                        !stageCurrentLocation.permission && (
                                            <Alert
                                                description="สิทธิ์ในการเข้าถึงที่ตั้งปัจจุบันถูกปฎิเสธ สามารถตั้งค่าสิทธิ์ได้ในการตั้งค่า"
                                                type="error"

                                            />
                                        )
                                    }
                                </div>
                                <div >
                                    {
                                        stageCurrentLocation.loading ? <Spin style={marginSpin} /> : <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconMap} />
                                    }
                                    <span className={style.textOne5}>{detailAddress.detail}</span>
                                </div>
                                <div className={style.marginTop20}>
                                    {initalLocation ? <MapComponent callBackLocation={callLocation} initLocation={initalLocation} getCurrentLocation={setCurrentLocation} /> : <div style={styleLoadingMap}></div>}
                                </div>
                                <div className={style.marginTop}>
                                    <InputComponents
                                        name="address"
                                        register={register}
                                        error={errors.address}
                                        placeholder="ที่อยู่อย่างละเอียด"
                                    />
                                    <InputComponents
                                        name="hintAddress"
                                        register={register}
                                        error={errors.hintAddress}
                                        placeholder="รายละเอียดเพิ่มเติม หรือ ลักษณะพิเศษที่สามารถสังเกตได้ เช่น ต้นไม้สีแดง"
                                    />
                                    <div className={style.marginTop} align="center">
                                        <button className={`${style.buttonColor} ${style.margintop20}`} style={styleComponent.buttonFull(color.orange, "7rem")} type="submit">บันทึกข้อมูล</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>

        </Fragment>
    )
}