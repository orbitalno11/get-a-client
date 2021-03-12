import React, { Fragment } from "react";
import { Typography, Grid, Col, Button, Radio, Row,Divider,Image } from "antd";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import Linepay from "../../../../images/Linepay2.webp"
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function PaymentDetail() {
  const screens = useBreakpoint();
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
            <Title className={style.titleH3}>ร้านค้า</Title>
          </Col>
        )}
      </div>
      <div className={style.paymentPage}>
        <div style={{ fontSize: "30px" }}>
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
          <Title level={4}>ชำระผ่าน</Title>
          <div>            
              <Radio style={radioStyle} value={1} onChange={onChange}>
                <Image src={Linepay} preview={false} />
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
              className="backgroundMain buttonColor"
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
