import { Row, Col, Button ,DatePicker} from "antd";
import React, { Fragment,useEffect} from "react";
import { useForm , Controller } from "react-hook-form";
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
import { defaultValue } from "../../../../../defaultValue";
import moment from "moment";

export default function Edit({dataRate}) {

  const { register, handleSubmit, errors,reset,control } = useForm({
    resolver: yupResolver(exchangeSchema),
  });

  useEffect(() => {
    reset({
      "name": (!isEmpty(dataRate)) ? dataRate.name : "",
      "baht": (!isEmpty(dataRate)) ? dataRate.baht : "",
      "coin": (!isEmpty(dataRate)) ? dataRate.coin : "",
      "startDate": (!isEmpty(dataRate)) ? moment((dataRate.startDate),defaultValue.dateFormat) : "",
      "endDate": (!isEmpty(dataRate)) ? moment((dataRate.endDate),defaultValue.dateFormat): "",
    })
  }, [dataRate])

  const dispatch = useDispatch();
  // const today = moment().format("MM/DD/YYYY")
  const onSubmit = (data) => {
    if(data){
      if(dataRate.type != "transfer"){
        const cost ={
          "title": "std",
          "baht": data.baht,
          "coin": data.coin,
          "type": "std",
          "startDate":data.startDate,
          "endDate": data.endDate,
          "updtaeDate":data.startDate,
        }
        dispatch(modalAction.closeModal())
        dispatch(coinAction.updateCoinRate(dataRate.id,cost))
      }else{
        const rate ={
          "title": "transfer",
          "baht": data.baht,
          "coin": data.coin,
          "type": "transfer",
          "startDate":data.startDate,
          "endDate": data.endDate,
          "updtaeDate":data.startDate,
        }
        dispatch(modalAction.closeModal())
        dispatch(coinAction.updateCoinRate(dataRate.id,rate))
      }
    }
  }


  function ModalUpdatePrice() {
    return (
      <div style={{ paddingLeft: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          { dataRate.type  != "transfer" ? (
            <span className={style.headerOne5}>แก้ไขอัตราการซื้อเหรียญ</span>
          ):(
            <span className={style.headerOne5}>แก้ไขอัตราการแลกเหรียญ</span>
          )}
          <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Col
              span={5}
              className={`${style.textOne25} ${style.paddingInputDate}`}
            >
              วันที่เริ่มต้น :
            </Col>
            <Col span={18}>
                <Controller
                  as={<DatePicker placeholder="" />}
                  name="startDate"
                  control={control}
                  defaultValue={moment()}
                  placeholder=""
                />
                {errors.startDate && (
                  <p className="error-input">{errors.startDate.message}</p>
                )}
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Col
              span={5}
              className={`${style.textOne25} ${style.paddingInputDate}`}
            >
              วันที่สิ้นสุด :
            </Col>
            <Col span={18}>
              <Controller
                as={<DatePicker placeholder="" />}
                name="endDate"
                control={control}
                defaultValue={moment()}
                placeholder=""
              />
              {errors.endDate && (
                <p className="error-input">{errors.endDate.message}</p>
              )}
            </Col>
          </Row>    
          { dataRate.type  != "transfer" ? (
            <span className={style.headerOne35}>อัตราการซื้อเหรียญ</span>
          ):(
            <span className={style.headerOne35}>อัตราการแลกเหรียญ</span>
          )}      
          <Row style={{ marginBottom: "1rem" }}>
            <Col span={7} align="start">
              <InputComponents
                    type="number"
                    name="baht"
                    register={register}
                    error={errors.baht}
                    placeholder="บาท"
                    min="0"
                  />
            </Col>
            <Col span={4} align="center" className={`${style.textOne5} ${style.paddingInput}`}>บาท</Col>
            <Col span={2} align="center" className={`${style.textOne5} ${style.paddingInput}`}>=</Col>
            <Col span={7} style={{paddingLeft:"0.8rem"}}>
              <InputComponents
                    type="number"
                    name="coin"
                    register={register}
                    error={errors.coin}
                    placeholder="เหรียญ"
                    min="0"
                  />
            </Col>
            <Col span={4} align="center" className={`${style.textOne5} ${style.paddingInput}`}>เหรียญ</Col>
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
              <span className={style.textOne25}>บันทึก</span>
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
             <span className={style.textOne25}>ยกเลิก</span>
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
        style={{ width: "50px" }}
        icon={<FontAwesomeIcon icon={faPen} style={{ color: "white" }} />}
      >
      </Button>
    </Fragment>
  );
}
