import { Row, Col, Button} from "antd";
import React, { Fragment } from "react";
import { faTrashAlt,faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";

const ModaldeleteRateCoin = ({data}) => {
    // console.log(data)
    const dispatch = useDispatch()

    const closeModal = () =>{
      dispatch(modalAction.closeModal())
  }

  const removeRate = () =>{
      closeModal()
      dispatch(coinAction.deleteCoinRate(data.id))
  }
  return (
    <div style={{ paddingLeft: "1rem" }}>
      <p className={style.titleH4}>ยืนยันลบอัตราการซื้อเหรียญ</p>
      <Row style={{marginTop:"2rem",marginBottom:"2rem",textAlign:"center"}}> 
        <Col span={11} className={style.textNormal}>ซื้อ {data.baht} บาท </Col>
        <Col span={2}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} className={style.coins} />
        </Col>
        <Col span={10} className={style.textNormal}>{data.coin} coin</Col>
      </Row>
      <Row className={style.btnRequest}>
        <Col span={6}>
          <Button
            className="backgroundGreen buttonColor"
            shape="round"
            size="middle"
            style={{ width: "100px" }}
            htmlType="submit"
            onClick={() => removeRate()}
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
            onClick={() => closeModal()}
          >
           <span className={style.textNormal}>ปฏิเสธ</span>
          </Button>
        </Col>
      </Row>
    </div>
  );

}

export default function Delete({data}) {

  const dispatch = useDispatch();

  const remove = (data) => {
    dispatch(
      modalAction.openModal({
        body: <ModaldeleteRateCoin data={data} />,
        size: sizeModal.default,
      })
    );
  };

  return (
    <Fragment>
      <ModalComponent />
      <Button
        onClick={() => remove(data)}
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
