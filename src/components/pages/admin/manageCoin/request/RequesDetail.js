import { Card, Row, Col, Button} from "antd";
import React, { Fragment } from "react";
import style from "../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../redux/actions";
import ModalComponent from "../../../../modal/ModalComponent"
import { sizeModal } from "../../../../modal/SizeModal";
import { typeModal } from "../../../../modal/TypeModal";

export default  function RequesDetail({data}) {
    const dispatch = useDispatch()

    function ComponentSample (){
      return (
            <div style={{ paddingLeft: "1rem" }}>
              <p  className={style.titleH4}>
                คำขอการถอนเหรียญ
              </p>
              <p className={style.textNormal}>ชื่อ : {data && data.firstname}</p>
              <p className={style.textNormal}>นามสกุล : {data && data.lastname}</p>
              <p className={style.textNormal}>วันที่ส่งคำขอ : {data && data.date} </p>
              <p className={style.textNormal}>จำนวนยอด : {data && data.amount} บาท</p>
              <p className={style.textNormal}>ธนาคาร :{data && data.bank}</p>
              <p className={style.textNormal}>เลขบัญชี : {data && data.accountNumber}</p>
              <Row className={style.btnRequest}>
                <Col span={6}> 
                  <Button
                      className="backgroundGreen buttonColor"
                      shape="round"
                      size="middle"
                      style={{ width: "100px" }}
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
      )
    }
    const alert = () => {
      dispatch(modalAction.openModal({
          text: "ดำเนินการสำเร็จ",
          size: sizeModal.small,
          alert: typeModal.corrent
      }))
    }

    const component = () => {
      dispatch(modalAction.openModal({
          body: <ComponentSample />,
          size: sizeModal.default,
      }))
    }

  return (
    <Fragment>
      <Row className={style.horizontalCenter}>
        <Card className={style.cardContainer}>
          <Row>
            <Col
              span={14}
              style={{ marginTop: "-0.5rem", paddingLeft: "0.625rem" }}
            >
              <span>{data && data.fullNameTaxt}</span>
            </Col>
            <Col
              span={10}
              style={{
                marginTop: "-0.5rem",
                paddingLeft: "0.625rem",
                color: "gray",
              }}
            >
              <span className={style.textSmall}>{data && data.date}</span>
            </Col>
          </Row>
          <Row
            span={24}
            style={{ justifyContent: "center", marginTop: "0.625rem" }}
          >
            <span className={style.textNormal}>{data && data.amount} บาท</span>
          </Row>
          <ModalComponent />
          <Row
            span={24}
            style={{ justifyContent: "center", marginTop: "1rem" }}
          >
            <Button
              className="buttonColor backgroundYellow"
              style={{ width: "11rem" }}
              shape="round"
              size="middle"
              onClick={() => component()}
            >
              <span className={style.textNormal}>รายละเอียด</span>
            </Button>
          </Row>
        </Card>
      </Row>
    </Fragment>
  );
}

