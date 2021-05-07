import { Row, Col, Button, Input, DatePicker, TimePicker, Form } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { promotionSchema } from "../../../../../../validation/admin/promotionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faBullhorn, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
import PromotionList from "./PromotionList";
import moment from "moment";

export default function Promotion() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const dispatch = useDispatch();

  const format = "HH:mm";

  const onSubmit = () => {
    // todo onSubmit
    // value
  }

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem", justifyContent: "center" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className={style.titleH5}>เพิ่มโปรโมชั่น</p>
          <Row>
            <Col span={4}>ชื่อโปรโมชั่น :</Col>
            <Col span={20}>
              <Input
                type="name"
                name="name"
                ref={register}
                placeholder="กรุณาใส่ชื่อโปรโมชั่น"
                bordered={false}
                style={{ textAlign: "left" }}
              />
              {errors.name && (
                <p className="error-input">{errors.name.message}</p>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col span={3}>วันที่เริ่มต้น </Col>
            <Col span={8}>
              <DatePicker/>
            </Col>
            <Col span={4} style={{ textAlign: "center" }}>
              วันที่สิ้นสุด{" "}
            </Col>
            <Col span={8}>
              <DatePicker/>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginBottom: "1.8rem" }}>
            <Col span={3}>เวลาเริ่มต้น </Col>
            <Col span={8}>
              <TimePicker
                defaultOpenValue={moment("00:00", format)}
                format={format}
              />
            </Col>
            <Col span={4} style={{ textAlign: "center" }}>
              เวลาสิ้นสุด{" "}
            </Col>
            <Col span={8}>
              <TimePicker
                defaultOpenValue={moment("00:00", format)}
                format={format}
              />
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
          <span className={style.titleH5}>จัดการโปรโมชั่น</span>
        </Col>
        <Col md={17} lg={18} xl={20}>
          <Button
            onClick={() => component()}
            className="backgroundBlue buttonColor"
            shape="circle"
            icon={<FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />}
          />
        </Col>
      </Row>
      <Row style={{ marginLeft: "4rem", marginTop: "1rem" }}>
        <PromotionList />
      </Row>
    </Fragment>
  );
}
