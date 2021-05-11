import React, { Fragment, useEffect, useCallback, useState } from "react"
import { Alert, Button, Spin } from "antd";
import style from "../../styles.module.scss"
import {
    faCrosshairs
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

export default function EditProfileMap({ previousAddress }) {
    const dispatch = useDispatch()
    const { profile, loading } = useSelector(state => state)
    const [address, setAddress] = useState(previousAddress && previousAddress)
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
    const warningText = {
        color: color.gray
    }

    const marginSpin = {
        marginRight: '1.6rem'
    }

    const styleLoadingMap = {
        backgroundColor: color.gray,
        height: "20rem",
        width: "auto"
    }

    const { register, errors, handleSubmit, reset } = useForm({
        resolver: yupResolver(profileAddressSchema),
    });
    /// fetch address from reducer and check with previos value
    const fetchProfile = useCallback(() => {

        if (address === undefined) {
            dispatch(profileAction.getAddress())
        }

        if ((profile.address !== null) && (address !== profile.address)) {
            setAddress(profile.address && profile.address)
        }

        // if(!profile.address && )
    }, [profile.address])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    useEffect(() => {
        /// set address when value not null and success in get data from db
        console.log(address)
        console.log(isEmpty(address))
        if (isEmpty(address)) {
            setDetailAddress({
                "address": address.address,
                "hintAddress": address.hintAddress,
                "detail": address.geoDistrict + " " + address.geoSubDistrict + " " + address.geoProvince + " " + address.postcode
            })
            setInitalLocation({
                lat: address.lat,
                lon: address.lon,
                type: address.type,
                originalValue: true
            })
            reset({
                address: address.address,
                hintAddress: address.hintAddress
            })
            /// set address as current location when value is null and success in get data from db
        } else if (profile.getAddress && !isEmpty(address)) {
            setCurrentLocation().then((location) => {
                    setInitalLocation({
                        lat: location.lat,
                        lon: location.lon,
                        type: location.type,
                        originalValue: false
                    })
                }).catch(() => {
                    /// set default location as bangkok
                    setInitalLocation({
                        lat: 13.736717,
                        lon: 100.523186,
                        type: defaultValue.typeAddress.current,
                        originalValue: false
                    })
                })
        }
    }, [address])

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
                        type: defaultValue.typeAddress.current
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

    const callLocation = (location, geolocation, type) => {
        if (location) {
            let geoLoacationDetail = {
                "address": (geolocation.aoi && geolocation.aoi !== undefined) ? geolocation.aoi : "",
                "hintAddress": "",
                "road": "",
                "subDistrict": geolocation.geocode,
                "district": geolocation.geocode.substring(0, 4),
                "province": geolocation.geocode.substring(0, 2),
                "postcode": geolocation.postcode && geolocation.postcode !== undefined ? geolocation.postcode : "",
                "lat": location.lat,
                "lon": location.lon,
                "geoSubDistrict": geolocation.subdistrict && geolocation.subdistrict !== undefined ? geolocation.subdistrict : "",
                "geoDistrict": geolocation.district && geolocation.district !== undefined ? geolocation.district : "",
                "geoProvince": geolocation.province && geolocation.province !== undefined ? geolocation.province : "",
                "type": type
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
                "type": address.type
            }
            dispatch(profileAction.setAddress(formAddress))
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไขข้อมูล" pageBack="/learner/1" />}
            <ModalComponent />
            {
                !loading.loading ? (
                    <Fragment>
                        <div className={previousAddress !== undefined ? style.paddingbody : style.body}>
                            <form onSubmit={handleSubmit(submitAddress)}>
                                <div className={style.alignPage}>
                                    <span className={style.titleH5}>เลือกจากแผนที่</span>
                                    <div className={style.floatLeft}>
                                        <Button className="buttonColor backgroundBlue" size="middle" shape="round" htmlType="submit">ใช้ที่อยู่นี้</Button>
                                    </div>
                                </div>
                                <p style={warningText}>  (ที่อยู่ที่ได้จากแผนที่อาจไม่ละเอียด)</p>
                                {
                                    !stageCurrentLocation.permission && (
                                        <Alert
                                            description="สิทธิ์ในการเข้าถึงที่ตั้งปัจจุบันถูกปฎิเสธ สามารถตั้งค่าสิทธิ์ได้ในการตั้งค่า"
                                            type="error"
                                        />
                                    )
                                }
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
                            </form>
                            <div className={style.subTitle}>
                                {
                                    stageCurrentLocation.loading ? <Spin style={marginSpin} /> : <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                                }
                                <span >{detailAddress.detail}</span>
                            </div>
                            <div className={style.marginTop}>
                                {initalLocation ? <MapComponent callBackLocation={callLocation} initLocation={initalLocation}  getCurrentLocation={setCurrentLocation} /> : <div style={styleLoadingMap}></div>}
                            </div>
                        </div>
                    </Fragment>
                ): (<div className={style.loader}></div>)
            }
        </Fragment>
    )
}
