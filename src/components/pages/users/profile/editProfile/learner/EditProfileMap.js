import { Button, Grid, Typography } from "antd";
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
const { Title } = Typography;
const { useBreakpoint } = Grid;


export default function EditProfileMap() {
    const screens = useBreakpoint();
    const { profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const detailAddress = profile.address && profile.address
    const [addressDetail, setAddressDetail] = useState("")

    const fetchProfile = useCallback(() => {
        if (screens.md !== undefined && !screens.md) {
            dispatch(profileAction.getAddress())
        }
    }, [detailAddress])

    useEffect(() => {
        fetchProfile()
        const addressText = detailAddress && (detailAddress.address + " " + detailAddress.geoDistrict + " " + detailAddress.geoSubDistrict + " " + detailAddress.geoProvince + " " + detailAddress.postcode)
        const hintAddress = detailAddress && (detailAddress.hintAddress ? "(" + detailAddress.hintAddress + ")" : "")
        setAddressDetail(addressText + "" + hintAddress)
    }, [fetchProfile])

    return (
        <Fragment>
            {isMobile() && <Header title="แก้ไขข้อมูล" pageBack="/learner/1" />}
            <div className={!isMobile() ? style.paddingbody : style.body}>
                <div className={style.TitleCoin}>
                    <Title level={4}>สถานที่ปัจจุบัน</Title>
                    <div className={style.floatLeft}>
                        <Button className="buttonColor backgroundBlue" size="middle" shape="round" >ใช้ที่อยู่นี้</Button>
                    </div>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                    <span >{addressDetail}</span>
                </div>
                <div className={style.TitleCoin}>
                    <Title level={4}>เลือกจากแผนที่</Title>
                </div>
            </div>
        </Fragment>
    )
}
