import { Col, Image, Row, Button } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHourglass,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CardLearnerCourse({ data,type }) {
  const styleCard = {
    padding: "0.5rem",
    color:"black"
  };

  return (
    <div className={styles.card} style={styleCard}>
      <div style={styleCard}> 
      {
        type === "online"? (

          <Row>
          <Col xs={6} sm={5} md={6} lg={6} xl={5} className={styles.VerizontalPage}>
                <Image
                src={data.coverUrl}
                className={styles.image}
                preview={false}
              />
          </Col>
          <Col xs={18} sm={19}md={18}lg={18}xl={19} align="start"style={{ paddingLeft: "2rem" }}>
             <span className={`${styles.titleH5} ${styles.cutText1Line}`}>
               {data.name}
             </span>              
            <span className={`${styles.textSmall} ${styles.cutText1Line}`}>
              {data.grade.title}
            </span>
            <Row>
              <Col xs={11} sm={16} md={8} lg={10} xl={13}>
                  <span className={`${styles.textSmall} ${styles.cutText1Line}`}>
                    <FontAwesomeIcon icon={faBook} className={styles.icon} />
                    {data.subject.title}
                  </span>
              </Col>
              <Col align="end" xs={13} sm={8} md={16} lg={14} xl={11}>
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
          </Col>
        </Row>
        ):(        
        <Row>
          <Col xs={6} sm={5} md={6} lg={6} xl={5} className={styles.VerizontalPage}>
                <Image
                src={data.owner.picture}
                className={styles.image}
                preview={false}
              />
          </Col>
          <Col xs={18} sm={19}md={18}lg={18}xl={19} align="start"style={{ paddingLeft: "2rem" }}>
            <Row span={24}>
                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                    <span className={`${styles.titleH5} ${styles.cutText1Line}`}>
                        {data.name}
                    </span>               
                </Col>
                <Col span={2} align="start">
                    {data.status === 0 && (
                    <button className={styles.wait}>
                        <FontAwesomeIcon
                        icon={faHourglass}
                        className={styles.iconSmall}
                        />
                    </button>
                    )}

                    {data.status === 1 && (
                    <button className={styles.approved}>
                        <FontAwesomeIcon icon={faCheck} className={styles.iconSmall} />
                    </button>
                    )}

                    {data.status === 2 && (
                    <button className={styles.deny}>
                        <FontAwesomeIcon icon={faTimes} className={styles.iconSmall} />
                    </button>
                    )}
                </Col>
            </Row>
            <span className={`${styles.textSmall} ${styles.cutText1Line}`}>
              {data.owner.fullNameText}
            </span>
            <span className={styles.textSmall}>
              <FontAwesomeIcon icon={faBook} className={styles.icon} />
              {data.subject.title}
            </span>
            <Row span={24}>
                <Col xs={11} sm={16} md={8} lg={10} xl={13}>
                    <span className={`${styles.textSmall} ${styles.cutText1Line}`}>
                        {data.timeText}
                    </span>
                </Col>
                <Col align="end" xs={13} sm={8} md={16} lg={14} xl={11}>
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
          </Col>
        </Row>
        )
      }

      </div>
    </div>
  );
}
