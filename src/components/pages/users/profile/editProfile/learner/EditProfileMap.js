import { Button, Typography } from "antd";
import React, { Fragment } from "react"
import style from "../../styles.module.scss"
import {
    faCrosshairs
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../../headerMobile/Header";
import responseMobile from "../../../../../response/ResponseMobile";
const { Title } = Typography;

export default function EditProfileMap({ refs }) {

    return (
        <Fragment>
            {responseMobile() && <Header title="แก้ไขข้อมูล" pageBack="/learner/1"/> }
            <div className={refs ? style.paddingbody : style.body}>
                <div className={style.TitleCoin}>
                    <Title level={4}>สถานที่ปัจจุบัน</Title>
                    <div className={style.floatLeft}>
                        <Button className="buttonColor backgroundBlue" size="middle" shape="round" >ใช้ที่อยู่นี้</Button>
                    </div>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCrosshairs} className={style.iconMap} />
                    <span >126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กทม.</span>
                </div>
                <div className={style.TitleCoin}>
                    <Title level={4}>เลือกจากแผนที่</Title>
                </div>
            </div>
        </Fragment>
    )
}
