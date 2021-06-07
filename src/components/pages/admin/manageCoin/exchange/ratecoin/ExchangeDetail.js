import { Row, Col, Button} from "antd";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, coinAction } from "../../../../../../redux/actions";
import ModalComponent from "../../../../../modal/ModalComponent";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
import InputComponents from "../../../../../input/InputComponets"
export default function ExchangeDetail() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    // todo onSubmit
    // value
  };

  const list = useSelector((state) => state.coin.rateCoin);

  useEffect(() => {
    dispatch(coinAction.getCoinRatesAdmin());
  }, []);

  function ComponentSample() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={style.titleH4}>แก้ไขอัตราการแลกเปลี่ยนเหรียญ</p>
          <Row style={{ marginBottom: "1rem" }}>
            <p>{errors.baht&&errors.baht}</p>
            <Col span={6} className={style.columnRate}>
              <InputComponents
                    type="number"
                    name="baht"
                    register={register}
                    error={errors.baht}
                    placeholder="บาท"
                    min="0"
                  />
            </Col>
            <Col span={3} className={`${style.textOneo25} ${style.paddingInput}`}>บาท</Col>
            <Col span={1} className={`${style.textOneo25} ${style.paddingInput}`}>=</Col>
            <Col span={6} className={style.columnRate}>
              <InputComponents
                    type="number"
                    name="coin"
                    register={register}
                    error={errors.coin}
                    placeholder="เหรียญ"
                    min="0"
                  />
            </Col>
            <Col span={3} className={`${style.textOneo25} ${style.paddingInput}`}>เหรียญ</Col>
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
        </form>
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
          <span className={style.titleH4}>อัตราการแลกเปลี่ยนปัจจุบัน</span>
        </Col>
        <ModalComponent />
        <Row className={style.pagepaddingleft}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Button
              type="link"
              style={{ color: "#F5732E", textDecorationLine: "underline" }}
              onClick={() => component()}
            >
              <span className={style.textNormal}>แก้ไข</span>
            </Button>
          </Col>
          <Col span={24} className={style.rateCoin}>
            {list &&
              list
              .filter((data) => data.type === "transfer")
              .map((data, index) => (
                <span className={style.textLarge} key={index} >                
                  {data && data.coin} เหรียญ &nbsp;= &nbsp; {data && data.baht}  บาท
                </span>
              ))}
          </Col>
        </Row>
      </Row>
    </Fragment>
  );
}
