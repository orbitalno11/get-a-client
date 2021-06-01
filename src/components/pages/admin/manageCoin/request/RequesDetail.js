import { Card, Row, Col, Button,Image } from "antd";
import React, { Fragment } from "react";
import style from "../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction} from "../../../../../redux/actions";
import ModalComponent from "../../../../modal/ModalComponent";
import { sizeModal } from "../../../../modal/SizeModal";

export default  function RequesDetail({data}) {
    const dispatch = useDispatch()

    const handOnApprove = (idRedeem) => {
      dispatch(coinAction.ApproveRequestsRedeem(idRedeem));
    };

    const handOnDenied = (idRedeem) => {
      dispatch(coinAction.DeniedRequestsRedeem(idRedeem));
    };

    const ModalDetailRedeem =()=>{
      return (
            <div style={{ paddingLeft: "1rem" }}>
              <Row>
              <Col span={12}>
                <p  className={style.titleH4}>
                  คำขอการถอนเหรียญ
                </p>
                <p className={style.textNormal}>ชื่อ : {data && data.owner.firstname}</p>
                <p className={style.textNormal}>นามสกุล : {data && data.owner.lastname}</p>
                <p className={style.textNormal}>วันที่ส่งคำขอ : {data && data.requestDate} </p>
                <p className={style.textNormal}>จำนวนยอด : {data && data.amount} บาท</p>
                <p className={style.textNormal}>ธนาคาร :{data && data.bank.title}</p>
                <p className={style.textNormal}>เลขบัญชี : {data && data.accountNo}</p>
                <p className={style.textNormal}>ชื่อบัญชี : {data && data.accountName}</p>
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
                      <span className={style.textNormal}>ยอมรับ</span>
                    </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="backgroundRed buttonColor"
                    shape="round"
                    size="middle"
                    style={{ width: "100px" }}
                    onClick={() => handOnDenied(data.id)}
                  >
                   <span className={style.textNormal}>ปฏิเสธ</span>
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
              <span>{data && data.owner.fullNameTaxt}</span>
            </Col>
            <Col
              span={10}
              style={{
                marginTop: "-0.5rem",
                paddingLeft: "0.625rem",
                color: "gray",
              }}
            >
              <span className={style.textSmall}>{data && data.requestDate}</span>
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
              onClick={() => DetailRedeem()}
            >
              <span className={style.textNormal}>รายละเอียด</span>
            </Button>
          </Row>
        </Card>
      </Row>
    </Fragment>
  );
}

