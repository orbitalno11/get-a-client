import { Row, Col, Button, Input} from "antd";
import React, { Fragment} from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../../redux/actions";
import ModalComponent from "../../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../../modal/SizeModal";
import { typeModal } from "../../../../../../modal/TypeModal";


export default function Add() {
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={style.titleH5}>เพิ่มอัตราการซื้อเหรียญ</p>
          <Row style={{ paddingTop: "1rem", marginBottom: "1.8rem" }}>
            <Col span={9}>
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
            <Col span={9}>
              <Input
                type="coin"
                name="coin"
                ref={register}
                placeholder="coins"
                bordered={false}
                style={{ textAlign: "center", paddingTop: "-0.3rem" }}
              />
              {errors.baht && (
                <p className="error-input">{errors.coin.message}</p>
              )}
            </Col>
            <Col span={2}>coins</Col>
          </Row>
        </form>
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
      <Row>
        <ModalComponent />
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E" }}
              onClick={() => component()}
            >
              เพิ่มการซื้อเหรียญ
            </Button>
          </Col>
        </Row>
      </Row>
    </Fragment>
  );
}
