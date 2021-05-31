import { Row, Col, Button} from "antd";
import React, { Fragment,useEffect} from "react";
import { useForm } from "react-hook-form";
import { exchangeSchema } from "../../../../../../validation/admin/exchangeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles.module.scss";
import { useDispatch } from "react-redux";
import { modalAction,coinAction } from "../../../../../../redux/actions";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import InputComponents from "../../../../../input/InputComponets"
import { sizeModal } from "../../../../../modal/SizeModal";
import moment from "moment";

export default function Edit({dataRate}) {

  const { register, handleSubmit, errors,reset } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  useEffect(() => {
    reset({
      "name": (!isEmpty(dataRate)) ? dataRate.name : "",
      "baht": (!isEmpty(dataRate)) ? dataRate.baht : "",
      "coin": (!isEmpty(dataRate)) ? dataRate.coin : "",
      "startDate": (!isEmpty(dataRate)) ? dataRate.startDate : "",
      "endDate": (!isEmpty(dataRate)) ? dataRate.endDate : "",
    })
  }, [dataRate])

  const dispatch = useDispatch();
  const today = moment().format("MM/DD/YYYY")
 
  const onSubmit = (data) => {
    if(data){
      const rate ={
        "title": "std",
        "baht": data.baht,
        "coin": data.coin,
        "type": "std",
        "startDate": today,
        "endDate": today,
        "updtaeDate":today,
      }
      dispatch(modalAction.closeModal())
      dispatch(coinAction.updateCoinRate(dataRate.id,rate))
    }
  }

  function ModalUpdatePrice() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={style.headerOne35}>เพิ่มอัตราการซื้อเหรียญ</span>
          <Row style={{ marginBottom: "1rem" }}>
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
            >
              <span className={style.textOneo25}>ยอมรับ</span>
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
             <span className={style.textOneo25}>ปฏิเสธ</span>
            </Button>
          </Col>
        </Row>
        </form>
      </div>
    );
  }

  const updatePrice = () => {
    dispatch(
      modalAction.openModal({
        body: <ModalUpdatePrice />,
        size: sizeModal.default,
      })
    );
  };

  return (
    <Fragment>
      <Button
        onClick={() => updatePrice()}
        className="backgroundOrange buttonColor"
        shape="round"
        size="middle"
        style={{ width: "100px" }}
        icon={<FontAwesomeIcon icon={faPen} style={{ color: "white" }} />}
      >
        <span style={{ paddingLeft: "0.5rem" }} className={style.textNormal}>แก้ไข</span>
      </Button>
    </Fragment>
  );
}
