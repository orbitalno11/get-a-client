import { Card, Row, Col, Button,Image } from "antd";
import React, { Fragment } from "react";
import style from "../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction} from "../../../../../redux/actions";
import ModalComponent from "../../../../modal/ModalComponent";
import { sizeModal } from "../../../../modal/SizeModal";
import moment from "moment"

export default  function RequesDetail({data}) {

    const dispatch = useDispatch()

    const handOnApprove = (idRedeem) => {
      dispatch(coinAction.ApproveRequestsRedeem(idRedeem));
    };

    const handOnDenied = (idRedeem,user) => {
      dispatch(coinAction.DeniedRequestsRedeem(idRedeem,user));
    };

    const ModalDetailRedeem =()=>{
      return (
            <div style={{ paddingLeft: "1rem" }}>
              <Row>
              <Col span={12}>
                <p  className={style.headerOne35}>
                  คำขอการถอนเหรียญ
                </p>
                <p className={style.textOne35}>ชื่อ : {data && data.owner.firstname}</p>
                <p className={style.textOne35}>นามสกุล : {data && data.owner.lastname}</p>
                <p className={style.textOne35}>วันที่ส่งคำขอ : {moment(data && data.requestDate).format("DD/MM/YYYY")} </p>
                <p className={style.textOne35}>จำนวนยอด : {data && data.amount} บาท</p>
                <p className={style.textOne35}>ธนาคาร : {data && data.bank.title}</p>
                <p className={style.textOne35}>เลขบัญชี : {data && data.accountNo}</p>
                <p className={style.textOne35}>ชื่อบัญชี : {data && data.accountName}</p>
              </Col>
              <Col span={7} className={style.imageRedeem}>
                <Image
                  width={200}
                  src={data && data.accountPic}
                />
              </Col>
              </Row>
              <Row className={style.btnRequest}>
                <Col span={6}> 
                  <Button
                      className="backgroundGreen buttonColor"
                      shape="round"
                      size="middle"
                      style={{ width: "100px" }}
                      onClick={() => handOnApprove(data.id)}
                    >
                      <span className={style.textOne35}>ยอมรับ</span>
                    </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="backgroundRed buttonColor"
                    shape="round"
                    size="middle"
                    style={{ width: "100px" }}
                    onClick={() => handOnDenied(data.id,data.owner.id)}
                  >
                   <span className={style.textOne35}>ปฏิเสธ</span>
                  </Button>
                </Col>
              </Row>
          </div>
      )
    }

    const DetailRedeem = () => {
      dispatch(modalAction.openModal({
          body: <ModalDetailRedeem />,
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
              <span className={style.textOne25}>{data && data.owner.fullNameText}</span>
            </Col>
            <Col
              span={10}
              style={{
                marginTop: "-0.5rem",
                paddingLeft: "0.625rem",
                color: "gray",
              }}
            >
              <span className={style.textOne}>{moment(data && data.requestDate).format("DD/MM/YYYY")}</span>
            </Col>
          </Row>
          <Row
            span={24}
            style={{ justifyContent: "center", marginTop: "0.625rem" }}
          >
            <span className={style.textOne5}>{data && data.amount} บาท</span>
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
              onClick={() => DetailRedeem()}
            >
              <span className={style.textOne35}>รายละเอียด</span>
            </Button>
          </Row>
        </Card>
      </Row>
    </Fragment>
  );
}

