import {  Col, Image, Row, Button} from "antd"
import React from 'react'
import styles from "./styles.module.scss"
// import ProfileSample from "../images/profile.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook,faHourglass,faCheck,faTimes } from "@fortawesome/free-solid-svg-icons"

export default function CardLearnerCourse({data}) {
    const styleCard = {
        padding: "0.5rem",
        // height: "9.8rem"
    }

    return (
        <div className={styles.card} style={styleCard} >
            <Row align="middle">
                <Col span={5}>
                    <Image
                        src={data.owner.picture}
                        className={styles.image}
                        preview={false}
                    />
                </Col>
                <Col span={16} align="start" style={{ paddingLeft: "2rem" }}>
                    <span className={styles.titleH5}>{data.name}</span>
                    <br/>
                    <span className={styles.textSmall}>
                        {data.owner.fullNameText}
                     </span>
                    <br />
                    <span className={styles.textSmall}>
                        <FontAwesomeIcon icon={faBook} className={styles.icon} />{data.subject.title}
                    </span>

                </Col>
                <Col span={2} align="start">
                    {data.status === 0 &&
                        <button className={styles.wait} >
                        <FontAwesomeIcon icon={faHourglass} className={styles.iconSmall} />
                        </button>
                    }
                    
                    {data.status === 1 &&
                        <button className={styles.approved} >
                        <FontAwesomeIcon icon={faCheck} className={styles.iconSmall} />
                        </button>
                    }
                    
                    {data.status === 2 &&
                        <button className={styles.deny} >
                        <FontAwesomeIcon icon={faTimes} className={styles.iconSmall} />
                        </button>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={15} sm={15} md={15} lg={17} xl={17}>
                    <span className={styles.textSmall}>{data.timeText}</span>
                </Col>
                <Col xs={9} sm={9} md={9} lg={7} xl={7}  align="end">
                    <Button
                        className="buttonColor backgroundBlue"
                        shape="round"
                        size="middle"
                    >
                        ให้คะแนน
                    </Button>
                </Col>
            </Row>
        </div >
    )
}
