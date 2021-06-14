import React, { Fragment } from "react";
import { Grid, Col, Button, Radio, Row,Divider } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
const { useBreakpoint } = Grid;

export default function PaymentDetail() {
  const screens = useBreakpoint();
  // When the value is used? Why declare ?
  // const [value, setValue] = React.useState(1);

  const onChange = () => {
    // param e
    // Why set this value
    // setValue(e.target.value);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    fontSize: "16px",
  };
  return (
    <Fragment>
      <div>
        {screens.md && (
          <Col lg={24} xl={24} md={24}>
            <span className={style.titleH2}>ร้านค้า</span>
          </Col>
        )}
      </div>
      <div className={style.paymentPage}>
        <div>
          <FontAwesomeIcon icon={faCoins} className={style.Big} />
          <span>169 เหรียญ</span>
        </div>
        <div className={style.subcoin}>
          <Button
            className="backgroundGreen buttonColor"
            shape="round"
            size="middle"
            style={{ width: "100px" }}
          >
            THB 59.00
          </Button>
        </div>
        <Divider type="horizontal" style={{ height: "100%" }} />
        <div>
          <span className={style.titleH5}>ชำระผ่าน</span>
          <div>            
              <Radio style={radioStyle} value={1} onChange={onChange}>
              </Radio>
          </div>
          <Row className={style.payment}>
            <Button
              className={style.buttonpayment}
              shape="round"
              size="middle"
              style={{ width: "100px",marginRight:"2rem"}}
            >
              ยกเลิก
            </Button>
            <Button
              className="backgroundOrange buttonColor"
              shape="round"
              size="middle"
              style={{ width: "100px" }}
            >
              ตกลง
            </Button>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}
