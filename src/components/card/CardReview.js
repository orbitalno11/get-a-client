import React from "react"
import { Button, Col, Rate, Row } from "antd";
import styles from "./styles.module.scss"
import isMobile from "../isMobile/isMobile"
import { useState } from "react";
import { styleComponent } from "../defaultFunction/style";
import { color } from "../defaultValue";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function CardReview({ data, myReview, handleEdit }) {

    const [showMessage, setShowMessage] = useState(false)

    const showtext = {
        display: showMessage ? "block" : "-webkit-box"
    }

    const colorIcon = (colorIcon) =>{
        return({
            color : colorIcon
        })
    }

    return (
        <Row className={`${isMobile() && styles.card} ${isMobile() && styles.paddingOne}  ${!isMobile() && styles.section} ${styles.marginSection}`} align="middle">
            <Col lg={15} md={15} sm={18} xs={18}>
                <span className={`${styles.textOne75} ${styles.textOneLine}`}>
                    {data.reviewer.fullName}
                </span>
            </Col>
            <Col lg={8} md={8} sm={6} xs={6} align={"end"}>
                {(myReview && !isMobile()) ?
                    (
                        <Fragment>
                            <Button
                                className={`${styles.buttonColor} ${styles.textOne}`}
                                style={styleComponent.buttonFull(color.blue, "5rem")}
                                onClick={() => handleEdit(data.id, "edit")}
                                size={"middle"}>
                                แก้ไข
                                </Button>
                            <Button
                                className={`${styles.buttonColor} ${styles.textOne} ${styles.marginLeftOneHalf}`}
                                style={styleComponent.buttonFull(color.gray, "5rem")}
                                onClick={() => handleEdit(data.id, "delete")}>
                                ลบ
                                </Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <FontAwesomeIcon className={`${styles.textOne5} ${styles.cursor}`} icon={faPencilAlt} onClick={() => handleEdit(data.id, "edit")} style={colorIcon(color.blue)}/>
                            <FontAwesomeIcon className={`${styles.textOne5} ${styles.marginLeftOne} ${styles.cursor}`} icon={faMinusCircle} onClick={() => handleEdit(data.id, "delete")}style={colorIcon(color.gray)}/>
                        </Fragment>

                    )
                }
            </Col>
            <Col lg={24} md={24} sm={24} xs={24} >
                <Row align="bottom">
                    <Rate disabled value={data.rating} className={styles.rate} />
                    <span className={`${styles.textOne} ${styles.marginLeftOne}`}>วันที่ {new Date(data.reviewDate).toLocaleDateString()}</span>
                </Row>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24} id="comment" >
                <span className={`${styles.text18} ${styles.textThreeLine} ${styles.marginTopHalf}`} style={showtext}>
                    {data.review}
                </span>
                <u className={`${styles.cursor} ${styles.texxtOne}`} onClick={() => setShowMessage(!showMessage)}>{showMessage ? "ย่อความคิดเห็น" : "ดูความเห็นเพิ่มเติม"}</u>
            </Col>
        </Row>
    )
}