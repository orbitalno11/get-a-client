import React, { Fragment } from "react";
import { Row, Col } from "antd";
import RequesDetail from "./RequesDetail";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";

export default function Request() {
  const { loading } = useSelector((state) => state);
  const request = [
    {
      firstname: "จันทร์จิรา",
      lastname: "ดาวดารา",
      fullNameTaxt: "จันทร์จิรา ดาวดารา",
      date: "1 มกราคม 2563",
      amount: "156",
      bank: "ธนาคารทหารไทย",
      accountNumber: "123-1-12212-1",
    },
    {
      firstname: "หนึ่งฤดี",
      lastname: "ดาวดารา",
      fullNameTaxt: "หนึ่งฤดี ดาวดารา",
      date: "2 มกราคม 2563",
      amount: "206",
      bank: "ธนาคารทหารไทย",
      accountNumber: "123-1-12212-2",
    },
    {
      firstname: "กรกานต์",
      lastname: "ดาวดารา",
      fullNameTaxt: "กรกานต์ ดาวดารา",
      date: "5 มกราคม 2563",
      amount: "300",
      bank: "ธนาคารทหารไทย",
      accountNumber: "123-1-12212-3",
    },
  ];

  return (
    <Fragment>
      {loading.loading && <Loading />}
      <Row style={{ marginLeft: "1rem" }}>
        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faCoins} className={style.coins} />
        </Col>
        <Col xs={21} sm={21} md={17} lg={18} xl={20}>
          <span className={style.titleH4}>
            คำขอการถอนเหรียญที่ยังไม่ได้รับการอนุมัติ
          </span>
        </Col>
        <Row style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>
          {request &&
            request.map((item, index) => (
              <div key={index}>
                <RequesDetail data={item} />
              </div>
            ))}
        </Row>
      </Row>
    </Fragment>
  );
}
