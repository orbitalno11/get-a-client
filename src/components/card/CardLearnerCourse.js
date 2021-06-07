import { Col, Image, Row, Button, Grid } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { styleComponent } from "../defaultFunction/style";
import { color } from "../defaultValue";
import isEmpty from "../defaultFunction/checkEmptyObject";
import { useHistory } from "react-router";
const { useBreakpoint } = Grid;

export default function CardLearnerCourse({ data, type }) {
  const screens = useBreakpoint();
  const history = useHistory()

  const redirect = () => {
    history.push(`/${type}/${data.id}`)
  }

  const statusCourse = {
    0: {
      text: "รอการอนุมัติ",
      color: color.yellow
    },
    1: {
      text: "ให้คะแนน",
      color: color.blue
    },
    2: {
      text: "ให้คะแนนแล้ว",
      color: color.green
    }
  }

  const heightCard = () => {

    const condition = () => {
      if (screens.xl){
        return  "5.5rem"
      }else if(screens.md){
        return "9rem"
      }else{
        return "12.5rem"
      }
    }

    return ({
      height: condition()
    })
  }

  const ButtonReview = () => {
    return (
      <Button
        className={`${styles.buttonColor} ${styles.textOne}`}
        style={styleComponent.buttonFull((!isEmpty(data.status) && type !== "online") ? statusCourse[data.status].color : color.blue)}
        size="small"
      >{(!isEmpty(data.status) && type !== "online") ? statusCourse[data.status].text : "ให้คะแนน"}</Button>
    )
  }

  return (
    <div className={`${!screens.md && `${styles.card} ${styles.paddingOne}`} ${styles.fullWidth} ${styles.cursor}`} onClick={() => redirect()} style={heightCard()}>
      <Row align="middle" justify={"space-around"} className={styles.fullHeight}>
        <Col align="end" xs={4} sm={2} md={3} lg={3} xl={3}>
          <Image
            src={type === "online" ? data.coverUrl : data.owner.picture}
            className={styles.imageLarge}
            preview={false}
          />
        </Col>
        <Col xs={15} sm={16} md={16} lg={16} xl={16} className={styles.marginLeftThree}>
          <Col span={24}>
            <Row justify={"space-between"}>
              <Col span={16}>
                <span className={`${styles.textOne75} ${type==="online" ? styles.textTwoLine : styles.textOneLine} ${styles.TextHeight}`}>
                  {data.name}
                </span>
              </Col>
              {
                screens.md && (
                  <Col align="end">
                    <ButtonReview />
                  </Col>
                )
              }
            </Row>
          </Col>
          {
            type !== "online" && (
              <Col span={24}>
                <span className={`${styles.textOne25} ${styles.textOneLine}`}>
                  {data.owner.fullNameText}
                </span>
              </Col>
            )
          }
          <Col span={24}>
            <Row>
              <Col className={`${styles.marginTopHalf} ${styles.textOneLine}`} xl={10} lg={24} md={24} sm={24} xs={24}>
                <FontAwesomeIcon icon={faBook} className={styles.icon} />
                <span className={`${styles.textOne25} ${styles.marginLeftOneHalf}`}>
                  {data?.subject?.title}
                </span>
              </Col>
                  <Col className={`${!screens.xl ? styles.marginTopHalf : styles.marginTopHalf} ${styles.textOneLine}`} xl={type !== "online" ? 14 : 14} lg={24} md={24} sm={24} xs={24}>
                    <FontAwesomeIcon icon={ type !== "online" ? faClock : faVideo} className={styles.icon} />
                    <span className={`${styles.textOne25} ${styles.marginLeftOneHalf}`}>
                      {type !== "online" ? data.timeText : data?.numberOfVideo}
                    </span> 
                  </Col>
              {
                !screens.md && (
                  <Col className={`${!screens.xl ? styles.marginTopHalf : styles.marginTopHalf} ${styles.textOneLine}`} span={24}>
                    <ButtonReview />
                  </Col>
                )
              }
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
}