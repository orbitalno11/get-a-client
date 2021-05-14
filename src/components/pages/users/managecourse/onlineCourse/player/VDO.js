import React, { Fragment } from "react";
import { Row, Col,Typography,Button} from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { YoutubePlayer  } from "reactjs-media";
import isMobile from "../../../../../isMobile/isMobile"
const { Link } = Typography;

export default function ManageClip() {
  return (
    <Fragment>
      {isMobile() && (
        <Header pageBack="/tutor/online/{courseId}" />
      )}
      <Row className={`${style.body} ${style.horizontalCenter}`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={14}>  
          <YoutubePlayer  
             src="https://www.youtube.com/watch?v=jspL0OWQfEs"
             width={"100%"}
             height={450}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={21} xl={14} className={style.paddingVDO}>
          <span className={style.titleH3}>องค์ประกอบธาตุ</span>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={14}>
          โปรโมชั่นทับซ้อนปัจฉิมนิเทศความหมาย ต้าอ่วย เรซิ่นโอยัวะ มายองเนส
          ทอมลาติน พงษ์แตงกวา สโลว์น็อก
          แมมโบ้เอสเพรสโซเสกสรรค์โปรดิวเซอร์โง่เขลา มาร์คอวอร์ดซาฟารี สังโฆ
          โบ้ยคอมเมนต์มลภาวะฟลุท โบกี้อาร์พีจีโปรเจ็กเตอร์ มวลชน โต๋เต๋ซิมโฟนี่
          มาร์จินธรรมาภิบาลทิปท็อปบูต โพลล์วอลซ์คอร์สเยน
        </Col>
        <Col className={style.marginRigth} span={24}>
            <Link href="/tutor/online/{courseId}/video/{videoId}/edit">
              <Button className="backgroundBlue buttonColor" shape="circle" icon={<FontAwesomeIcon icon={faPencilAlt} style={{ color: "white"}} />} /> 
            </Link>
          </Col>
      </Row>
    </Fragment>
  );
}
