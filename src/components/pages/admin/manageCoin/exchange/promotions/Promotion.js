import { Row, Col, Button, Input, DatePicker, TimePicker, Form } from "antd";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
// import { defaultValue } from "../../../../../defaultValue/defaultValue";
import { yupResolver } from "@hookform/resolvers/yup";
import { faBullhorn} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
import PromotionList from "./PromotionList";
import moment from "moment";
import TimeField from 'react-simple-timefield';

export default function Promotion() {
  const { register, handleSubmit, errors,control } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const dispatch = useDispatch();

  const format = "HH:mm";

  const onSubmit = () => {
    // todo onSubmit
    // value//
  };

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem", justifyContent: "center" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className={style.titleH4}>เพิ่มโปรโมชั่น</p>
          <Row>
            <Col span={3} className={style.textNormal}>
              ชื่อโปรโมชั่น
            </Col>
            <Col span={20}>
              <Input
                type="name"
                name="name"
                ref={register}
                placeholder="กรุณาใส่ชื่อโปรโมชั่น"
                className={`${style.inputRate} ${style.textNormal}`}
              />
              {errors.name && (
                <p className="error-input">{errors.name.message}</p>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <p className={style.textNormal}>เวลา(เริ่ม)</p>
              <Controller
                as={
                  <TimeField className="input" style={{ width: "100%" }} />
                }
                name="start"
                control={control}
                defaultValue={""}
              />
            <Col
              span={4}
              style={{ textAlign: "center" }}
              className={style.textNormal}
            >
              วันที่สิ้นสุด{" "}
            </Col>
            <Col span={8}>
              <DatePicker />
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem",marginBottom:"1rem"}}>
            <Col span={3} className={style.textNormal}>
              เวลาเริ่มต้น{" "}
            </Col>
            <Col span={8}>
              <TimePicker
                defaultOpenValue={moment("00:00", format)}
                format={format}
              />
            </Col>
            <Col
              span={4}
              style={{ textAlign: "center" }}
              className={style.textNormal}
            >
              เวลาสิ้นสุด{" "}
            </Col>
            <Col span={8}>
              <TimePicker
                defaultOpenValue={moment("00:00", format)}
                format={format}
              />
            </Col>
          </Row>
          <span className={style.titleH4}>อัตราการซื้อเหรียญ</span>
          <Row style={{ marginBottom: "1.8rem",marginTop:"0.5rem" }}>
            <Col span={8}>
              <Input
                type="baht"
                name="baht"
                ref={register}
                placeholder="บาท"
                className={`${style.inputRate} ${style.textNormal}`}
              />
              {errors.baht && (
                <p className="error-input">{errors.baht.message}</p>
              )}
            </Col>
            <Col span={2} className={style.textNormal} style={{marginLeft:"1rem"}}>
              บาท
            </Col>
            <Col span={2} className={style.textNormal} style={{paddingLeft:"1rem"}}>
             =
            </Col>
            <Col span={8}>
              <Input
                type="coin"
                name="coin"
                ref={register}
                placeholder="เหรียญ"
                className={`${style.inputRate} ${style.textNormal}`}
              />
              {errors.baht && (
                <p className="error-input">{errors.coin.message}</p>
              )}
            </Col>
            <Col span={2} className={style.textNormal} style={{marginLeft:"1rem"}}>
              เหรียญ
            </Col>
          </Row>
          <Row className={style.btnRequest}>
            <Col span={4}>
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
        size: sizeModal.large,
      })
    );
  };

  return (
    <Fragment>
      <ModalComponent />
      <Row style={{ marginLeft: "1rem" }}>
        <Col md={2} lg={2} xl={1}>
          <FontAwesomeIcon icon={faBullhorn} className={style.coins} />
        </Col>
        <Col md={5} lg={4} xl={3}>
          <span className={style.titleH4}>จัดการโปรโมชั่น</span>
        </Col>
      </Row>
      <Row className={style.pagepaddingleft} style={{ marginLeft: "1rem" }}>
        <Col md={24} lg={24} xl={24}>
          <Button
            type="link"
            style={{ color: "#F5732E", textDecorationLine: "underline" }}
            onClick={() => component()}
          >
            <span className={style.textNormal}>เพิ่มโปรโมชั่น</span>
          </Button>
        </Col>
      </Row>
      <Row style={{ marginLeft: "4rem", marginTop: "1rem" }}>
        <PromotionList />
      </Row>
    </Fragment>
  );
}
