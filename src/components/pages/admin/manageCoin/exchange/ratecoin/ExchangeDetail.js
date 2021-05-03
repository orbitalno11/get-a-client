import { Row, Col, Button, Input, Typography, Form } from "antd";
import React, { Fragment} from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
const { Link } = Typography;

export default function ExchangeDetail() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    // todo onSubmit
    // value
  }

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <Form onSubmit={handleSubmit}>
          <p className={style.titleH5}>แก้ไขอัตราการแลกเปลี่ยนเหรียญ</p>
          <Row style={{ paddingTop: "1rem", marginBottom: "1.8rem" }}>
            <Col span={11}>1 coins </Col>
            <Col span={1}>
              <span style={{ float: "right" }}>=</span>
            </Col>
            <Col span={10}>
              <Input
                type="baht"
                name="baht"
                ref={register}
                placeholder="ใส่ค่าเงิน"
                bordered={false}
                style={{ textAlign: "center", paddingTop: "-0.3rem" }}
              />
              {errors.baht && (
                <p className="error-input">{errors.baht.message}</p>
              )}
            </Col>
            <Col span={2}>บาท</Col>
          </Row>
          <Row className={style.btnRequest}>
            <Col span={6}>
              <Button
                className="backgroundGreenAdmin buttonColor"
                shape="round"
                size="middle"
                style={{ width: "100px" }}
                htmlType="submit"
                onClick={() => alert()}
              >
                ยอมรับ
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
                ปฏิเสธ
              </Button>
            </Col>
          </Row>
        </Form>
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
      <Row style={{ marginLeft: "1rem" }}>
        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faCoins} className={style.coins} />
        </Col>
        <Col xs={21} sm={21} md={20} lg={22} xl={23}>
          <span className={style.titleH5}>อัตราการแลกเปลี่ยนปัจจุบัน</span>
        </Col>
        <ModalComponent />
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E", textDecorationLine: "underline" }}
              onClick={() => component()}
            >
              แก้ไข
            </Button>
          </Col>
          <Col span={24} className={style.rateCoin}>
            <span className={style.textLarge}>1 coin = 2 บาท</span>
          </Col>
          <Col span={24}>
            <Link href="/admin/exchagecoin/history" className={style.hisexchange}>
              ประวัติอัตราการแลกเปลี่ยน
            </Link>
          </Col>
        </Row>
      </Row>
    </Fragment>
  );
}
