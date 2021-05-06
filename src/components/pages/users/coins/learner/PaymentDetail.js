import React, { Fragment } from "react";
import { Grid, Col, Button, Radio, Row,Divider,Space} from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
const { useBreakpoint } = Grid;

export default function PaymentDetail() {
  const screens = useBreakpoint();
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
   setValue(e.target.value);
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
          <div style={{marginTop:"1rem"}}>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>SCB Easy App</Radio>
                <Radio value={2}>QR CODE</Radio>
              </Space>
            </Radio.Group>
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
