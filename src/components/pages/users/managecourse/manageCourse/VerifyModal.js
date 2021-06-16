import { Button } from "antd";
import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { modalAction } from "../../../../../redux/actions";
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import style from "../styles.module.scss";

export default function VerifyModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const onHandleRedirect = () =>{
        dispatch(modalAction.closeModal())
        history.push("/tutor/edit/identity")
    }

    return (
        <div align="center">
            <span className={style.headerTwo5}>คุณยังไม่ได้ยืนยันตัวตน</span>
            <br/>
            <span className={style.textOne25}>กรุณายืนยันตัวตนก่อนเริ่มสร้างบทเรียน</span>
            <br/>
            <span className={style.textOne}>หากยืนยันตัวตนแล้ว กรุณารอการตรวจสอบข้อมูลจากผู้ดูแลระบบ</span>
            <div className={style.marginSection}>
                <Button className={`${style.buttonColor} ${style.textOne25}`} size="middle" style={styleComponent.buttonFull(color.gray,"auto")} onClick={()=>dispatch(modalAction.closeModal())}>ไว้ที่หลัง</Button>
                <Button className={`${style.buttonColor} ${style.textOne25} ${style.marginLeftOne}`} size="middle" style={styleComponent.buttonFull(color.orange,"auto")} onClick={()=>onHandleRedirect()}>ยืนยันตัวตนทันที</Button>
            </div>
        </div>
    )
}
