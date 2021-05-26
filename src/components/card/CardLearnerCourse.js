import {  Col, Image, Row, Button} from "antd"
import React from 'react'
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook,faHourglass,faCheck,faTimes } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

export default function CardLearnerCourse({data}) {
    const styleCard = {
        padding: "0.5rem",
    }

    return (
        <div className={styles.card} style={styleCard} >
            <Row align="center">
                <Col xs={5} sm={5} md={6} lg={5} xl={5} align="center">
                    <Image
                        src={data.owner.picture}
                        className={styles.image}
                        preview={false}
                    />
                </Col>
                <Col xs={16} sm={16} md={14} lg={16} xl={16} align="start" style={{ paddingLeft: "2rem" }}>
                    <span className={`${styles.titleH5} ${styles.cutText1Line}`}>{data.name}</span>
                
                    <span className={`${styles.textSmall} ${styles.cutText1Line}`}>
                        {data.owner.fullNameText}
                     </span>
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
                <Col xs={5} sm={5} md={6} lg={5} xl={5}>   
                </Col>
                <Col xs={11} sm={12} md={9} lg={12} xl={12} style={{ paddingLeft: "2.4rem" }}>
                    <span className={`${styles.textSmall} ${styles.cutText1Line}`}>{data.timeText}</span>
                </Col>
                <Col xs={8} sm={7} md={9} lg={7} xl={7}  align="end">
                    <Link to={`/course/${data.id}`}>
                        <Button
                            className="buttonColor backgroundBlue"
                            shape="round"
                            size="middle"
                        >
                            ให้คะแนน
                        </Button>
                    </Link>
                </Col>
            </Row>
        </div >
    )
}
