import React, { Fragment } from "react";
import { Col, Row, Button, Grid} from "antd";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile";
import { styleComponent } from "../../../../defaultFunction/style";
import { paymentSchema } from "../../../../../validation/coin/paymentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { modalAction} from "../../../../../redux/actions";
import ModalComponent from "../../../../modal/ModalComponent";
import { sizeModal } from "../../../../modal/SizeModal";
const { useBreakpoint } = Grid;

export default function BuyCoin({ rateData }) {
  const { handleSubmit, errors,register} = useForm({
    resolver: yupResolver(paymentSchema),
  });
  const screens = useBreakpoint()
  const dispatch = useDispatch();
  const history = useHistory();
  const Scb = ({param})=>{
    return(
      <div>
          <Row style={{paddingTop:"1rem"}}>
              {screens.xs? (
              <div className={style.textAlert}>
                <span>การชำระผ่าน SCB Easy App จะต้องทำการชำระบน</span><br/>
                <span>โทรศัพท์มือถือที่ติดตั้งแอพลิเคชั่น</span><br/>
                <span>SCB Easy App เท่านั้น</span>
              </div>
              ):(
                <div className={style.textAlert}>
                  <span>การชำระผ่าน SCB Easy App จะต้องทำการชำระบนโทรศัพท์มือถือ</span><br/>
                  <span>ที่ติดตั้งแอพลิเคชั่น SCB Easy App เท่านั้น</span>
                </div>
              )}

              { !screens.md? (
              <Row style={{ paddingTop: "1.5rem",width:"100%" }} className={style.horizontalCenter}>
                <Col xs={9} sm={9} md={7} lg={7} xl={6}>
                  <Button
                    className= {style.buttonCancel}
                    shape="round"
                    size="middle"
                    style={{ width: "6rem" }}
                    onClick={() => dispatch(modalAction.closeModal())}
                  >
                    <span className={screens.md ? style.textOne5 : style.textOne35}>
                      ยกเลิก
                    </span>
                  </Button>
                </Col>
                {!screens.md && (   <Col>
                  <Button
                    className="backgroundOrange buttonColor"
                    shape="round"
                    size="middle"
                    style={{ width: "6rem" }}
                    onClick={()=>history.push("/payment"+param)}
                  >
                    <span className={screens.md ? style.textOne5 : style.textOne35}>
                      ตกลง
                    </span>
                  </Button>
                </Col>)}
              </Row>
              ):(
                <Row style={{ paddingTop: "1.5rem",width:"100%"}} className={style.horizontalCenter}>
                  <Col>
                      <Button
                        className="backgroundOrange buttonColor"
                        shape="round"
                        size="middle"
                        style={{ width: "6rem" }}
                        onClick={() => dispatch(modalAction.closeModal())}
                      >
                        <span className={screens.md ? style.textOne5 : style.textOne25}>
                          ปิด
                        </span>
                      </Button>
                  </Col>
                </Row>
              )}
          </Row>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (data) {
      const param = (data.payment === "scbEasy"?"/scbeasy":"")+"?type="+ data.payment+"&rateId="+rateData.id+"&rateBaht="+rateData.baht+"&rateCoin="+rateData.coin
     if(data.payment === "scbEasy"){
      dispatch(modalAction.openModal({
        body: <Scb param = {param}/>,
        size: sizeModal.medium,
        })
      )}else{
        history.push("/payment"+param)
      }
    }
  };

  return (
    <Fragment>
      <ModalComponent />
      <div className={`${!isMobile()?style.section:null} ${!isMobile()?style.marginSection:null}`}>
        <div className={!isMobile()? style.coinlist:null}>
          <Row>
              <span className={style.headerTwo}>ชำระเงิน</span>
          </Row>
          <Row className={style.horizontalCenter} style={{ paddingTop: "1rem" }}>
            <Col xs={3} sm={4} md={2} lg={4} xl={4} style={{ paddingTop: "0.5rem" }}>     
            { screens.md? (
                <styleComponent.iconCoin size="large" />
             ) : (
                <styleComponent.iconCoin size="medium" />
             )}
            </Col>
              <Col xs={11} sm={10} md={7} lg={10} xl={9}>
                <span className={screens.md ? style.textTwo : style.textOne65}>
                  {rateData && rateData.coin} เหรียญ
                </span>
              </Col>
            <Col xs={9} sm={10} md={7} lg={9} xl={10} style={{ paddingTop: "0.25rem" }} align="end">
              <Button
                className="backgroundOrange buttonColor"
                shape="round"
                size="middle"
                style={{ width: "6.5rem" }}
              >
                <span className={screens.md ? style.textOne5 : style.textOne35}>
                  THB {rateData && rateData.baht}
                </span>
              </Button>
            </Col>
          </Row>
          <Row className={ !screens.lg? !screens.md? style.paddingBuyCoin:style.paddingBuyCoinMd:style.paddingBuyCoin}>
            <span className={style.textOne75}>ชำระผ่าน</span>
          </Row>
          <div className={ !screens.lg? !screens.md? style.transaction:style.paddingpay:style.transaction}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row style={{ marginLeft: "2rem" ,paddingTop:"0.3rem" }} className={style.textOne5}>
                  <Col span={24}> 
                    <input type="radio" id="scbEasy" name="payment" value="scbEasy"  ref={register}/>&ensp;
                    <span>SCB Easy App</span>
                  </Col>
                  <Col span={24}>
                    <input type="radio" id="qrCode" name="payment" value="qrCode"  ref={register}/>&ensp;
                    <span>QR CODE</span>
                  </Col>
              </Row>
              {errors.payment && (
                <p className="error-input">{errors.payment.message}</p>
              )}
              <Row style={{ paddingTop: "2rem" }}>
                <Col xl={14} lg={13} md={10} sm={13} xs={13}align="center">
                  <Button
                    className= {style.buttonCancel}
                    shape="round"
                    size="middle"
                    style={{ width: "8rem" }}
                  >
                    <span className={screens.md ? style.textOne5 : style.textOne35}>
                      ยกเลิก
                    </span>
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="backgroundOrange buttonColor"
                    shape="round"
                    size="middle"
                    style={{ width: "8rem" }}
                    htmlType="submit"
                  >
                    <span className={screens.md ? style.textOne5 : style.textOne35}>
                      ตกลง
                    </span>
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
