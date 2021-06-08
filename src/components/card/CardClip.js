import { Col, Row, Space } from "antd"
import React from 'react'
import { useHistory, useParams } from "react-router"
import isEmpty from "../defaultFunction/checkEmptyObject"
import { styleComponent } from "../defaultFunction/style"
import { color } from "../defaultValue"
import isMobile from "../isMobile/isMobile"
import styles from "./styles.module.scss"

export default function CardClip({ data, isOwner, all }) {
    const { courseId } = useParams()
    const history = useHistory()
    const redirectClipPage = () => {
        history.push(`${isOwner ? "/tutor/" : "/"}online/${courseId}/video/${data.id}`)
    }

    const fixHeight = {
        height: isMobile() ? "8.5rem" : "6.5rem"
    }

    return (
        <Row className={(isMobile()) ? `${styles.card} ${styles.paddingOne}` : styles.fullWidth} onClick={() => redirectClipPage()} style={fixHeight}>
            <Col span={all ? 17 : 24}>
                <span className={`${styles.textTwo} ${styles.textOneLine}`}>{data.name}</span>
            </Col>
            {
                all && (
                    <Col span={7} align="end">
                        <Space align="center" direction="horizontal">
                            {(isEmpty(data?.bought) || data?.bought === false) && <styleComponent.iconCoin />}
                            <span className={styles.text18}>{(!isEmpty(data?.bought) && data?.bought === true) ? "ซื้อแล้ว" : data.cost}</span>
                        </Space>
                    </Col>
                )
            }
            <Col span={24}>
                <span className={`${styles.text18} ${styles.textTwoLine}`} style={{ color: color.gray3 }}>{data.description}</span>
            </Col>
        </Row>
    )
}