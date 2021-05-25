import React, { Fragment } from "react"
import style from "../../styles.module.scss"
import {
    faEdit,
    faGraduationCap,
    faListAlt,
    faMinus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Divider, Row, Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { color, defaultValue } from "../../../../../defaultValue"
import { modalAction, tutorAction } from "../../../../../../redux/actions"
import findKeyObject from "../../../../../defaultFunction/findKeyObject"
import { sizeModal } from "../../../../../modal/SizeModal"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const checkTypeTesting = (value) => {
    return value === defaultValue.typeIdentity["testing"]
}

const ModalEducation = ({ type, data, profile, action }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const widthButton = {
        width: "6rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
    }

    const textCenter = {
        textAlign: "center"
    }

    const textAction = action === "remove" ? "ลบ" : "แก้ไข"

    const fullText = checkTypeTesting(type) && data ? (
        "ยืนยันการ"+textAction+"ผลสอบ " + (data.exam.title + " วิชา" + data.subject.title + " " + data.score) + " คะแนน"
    ) : (
        "ยืนยันการ"+textAction+"ประวัติการศึกษา " + (data.instituteText + " สาขา" + data.branchText) + " เกรดเฉลี่ย " + data.gpax
    )

    const closeModal = () =>{
        dispatch(modalAction.closeModal())
    }

    const removeVerify = () =>{
        closeModal()
        if (checkTypeTesting(type)) {
            dispatch(tutorAction.deleteTesting(data.id, profile))
        } else {
            dispatch(tutorAction.deleteEducation(data.id, profile))
        }
    }

    const editEducation = () => {
        const typeIdentity = findKeyObject(defaultValue.typeIdentity, type)
        closeModal()
        history.push(`/tutor/${profile}/add/${typeIdentity}/${data.id}`)
    }

    return (
        <div className={style.centerPage}>
            <p className={style.titleH5} style={textCenter}>{fullText}</p>
            <p>สถานะการตรวจสอบ : {findKeyObject(defaultValue.requestStatus, data.verified)} </p>
            <p className={`${style.textSmall} ${style.marginTop20}`}>
                {
                    action === "remove" ? ( 
                        "หมายเหตุ : หากทำการลบแล้ว ไม่สามารถกู้คืนได้"
                    ) : (
                        "หมายเหตุ : หากทำการแก้ไขข้อมูล จะต้องมีการตรวจสอบข้อมูลจากผู้ดูแลระบบอีกครั้ง"
                    )
                }
                </p>
            <Row >
                <Button className="buttonColor backgroundRed" shape="round" size="middle" style={widthButton} onClick={()=>action === "remove" ? removeVerify() : editEducation()}>{textAction}</Button>
                <Button className="buttonColor backgroundBlue" shape="round" size="middle" style={widthButton} onClick={()=>closeModal()}>ยกเลิก</Button>
            </Row>
        </div>
    )
}

export default function EducationTutor({ data, type, status}) {
    const dispatch = useDispatch()
    const screens = useBreakpoint();
    const { profile } = useSelector(state => state.auth)

    const remove = (type, data) => {
        dispatch(modalAction.openModal({
            body: <ModalEducation type={type} data={data} profile={profile} action="remove"/>,
            size: sizeModal.default
        }))
    }

    const edit = (data) => {
        dispatch(modalAction.openModal({
            body: <ModalEducation type={type} data={data} profile={profile} action="edit"/>,
            size: sizeModal.default
        }))
    }

    const widthIcon = (widthSize) => {
        return ({
            width: `${widthSize}rem`
        })
    }

    const colorVerify = (status) => {
        let verifyColor = color.green
        if (status === defaultValue.requestStatus["ผ่านการตรวจสอบ"]) {
            verifyColor = color.green
        } else if (status === defaultValue.requestStatus["กำลังตรวจสอบ"]) {
            verifyColor = color.yellow
        } else if (status === defaultValue.requestStatus["ไม่ผ่านการตรวจสอบ"]) {
            verifyColor = color.red
        }
        return verifyColor
    }

    const verifyButton = (status) => {
        return ({
            backgroundColor: colorVerify(status),
            paddingBottom: "1.6rem",
            marginTop: "0.5rem"
        })
    }

    const buttonAction = (colorSelect) => {
        return ({
            backgroundColor: color[colorSelect],
            paddingBottom: "1.6rem",
            marginTop: "0.5rem",
            marginLeft: "0.75rem",
            width: "4rem"
        })
    }

    return (
        <Fragment>
            {
                data && data.map((item) => {
                    return (
                        <Row key={item.id}>
                            <Col span={24} className={style.profileSet}>
                                {
                                    (screens.md && status !== "learner") && (
                                        <Fragment>
                                            <Tooltip placement="topLeft" title="แก้ไขเกียรติประวัตินี้">
                                                <button className={style.editButton} onClick={() => edit(item)} >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip placement="topLeft" title="ลบเกียรติประวัตินี้">
                                                <button className={style.removeButton} onClick={() => remove(type, item)} >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                            </Tooltip>
                                        </Fragment>
                                    )
                                }

                                <div style={!screens.md ? widthIcon(4) : widthIcon(5.5)}>
                                    <FontAwesomeIcon className={!screens.md ? style.smallSizeIcon : style.largeSizeIcon} icon={checkTypeTesting(type) ? faListAlt : faGraduationCap} />
                                </div>
                                <div className={status !== "learner" ?  style.subProfile : null}>
                                    <span>{checkTypeTesting(type) ? "ผลสอบ" : item.instituteText}</span>
                                    <br />
                                    <span>{checkTypeTesting(type) ? (item.exam.title + " : " + item.subject.title) : ("สาขา : " + item.branchText)}</span>
                                    <br />
                                    <span>{checkTypeTesting(type) ? ("คะแนน : " + item.score) : ("เกรดเฉลี่ย : " + item.gpax)}</span>
                                    <br />
                                    {
                                        (!screens.md  && status !== "learner")  && (
                                            <Fragment>
                                                <Button className="buttonColor" style={verifyButton(item.verified)} shape="round" size="small">{findKeyObject(defaultValue.requestStatus, item.verified)}</Button>
                                                <Button className="buttonColor" style={buttonAction("blue")} shape="round" size="small" onClick={() => edit(item)} >แก้ไข</Button>
                                                <Button className="buttonColor" style={buttonAction("gray")} shape="round" size="small" onClick={() => remove(type, item)} >ลบ</Button>
                                            </Fragment>
                                        )
                                    }
                                </div>
                                {
                                    (screens.md && status !== "learner") ?
                                        <div className={`${style.floatLeft} ${style.bodderBottom}`}>
                                            <span style={{ color: colorVerify(item.verified) }}>{findKeyObject(defaultValue.requestStatus, item.verified)}</span>
                                        </div> : null
                                }

                            </Col>
                            <Divider />
                        </Row>
                    )
                }
                )
            }
        </Fragment>
    )
}
