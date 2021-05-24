import { Row, Col, Button} from "antd";
import React, { Fragment } from "react";
import { faTrashAlt,faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";

export default function Delete() {

  const dispatch = useDispatch();

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <p className={style.titleH4}>ยืนยันลบอัตราการซื้อเหรียญ</p>
        <Row style={{marginTop:"2rem",marginBottom:"2rem",textAlign:"center"}}> 
          <Col span={11} className={style.textNormal}>ซื้อ 100 บาท </Col>
          <Col span={2}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} className={style.coins} />
          </Col>
          <Col span={10} className={style.textNormal}>500 coin</Col>
        </Row>
        <Row className={style.btnRequest}>
          <Col span={6}>
            <Button
              className="backgroundGreen buttonColor"
              shape="round"
              size="middle"
              style={{ width: "100px" }}
              htmlType="submit"
              onClick={() => alert()}
            >
              <span className={style.textNormal}>ยอมรับ</span>
            </Button>
          </Col>
          <Col span={6}>
            <Button
              className="backgroundRed buttonColor"
              shape="round"
              size="middle"
              style={{ width: "100px" }}
              onClick={() => dispatch(modalAction.closeModal())}
            >
             <span className={style.textNormal}>ปฏิเสธ</span>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  const alert = () => {
    dispatch(
      modalAction.openModal({
        text: "ดำเนินการสำเร็จ",
        size: sizeModal.small,
        alert: typeModal.corrent,
      })
    );
  };

  const component = () => {
    dispatch(
      modalAction.openModal({
        body: <ComponentSample />,
        size: sizeModal.default,
      })
    );
  };

  return (
    <Fragment>
      <ModalComponent />
      <Button
        onClick={() => component()}
        className="backgroundRed buttonColor"
        shape="round"
        size="middle"
        style={{ width: "100px" }}
        icon={<FontAwesomeIcon icon={faTrashAlt} style={{ color: "white" }} />}
      >
        <span style={{ paddingLeft: "0.5rem" }} className={style.textNormal}>ลบ</span>
      </Button>
    </Fragment>
  );
}
