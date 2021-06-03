import React, { Fragment,useState} from "react";
import { Row } from "antd";
// import style from "../styles.module.scss";
// import RedeemDetail from "./RedeemDetail";
// import RedeemList from "./RedeemList";
// import RedeemDetail from "./RedeemDetail";
// import TableList from "./TableList";
// import Request from "./Request";
// import Header from "../../../../headerMobile/Header";
// import isMobile from "../../../../isMobile/isMobile";
// import TabHorizontal from "../../../../tab/TabHorizontal";
// import Loading from "../../../../loading/Loading";
// import { useSelector } from "react-redux";
import ProfileCourse from "./ProfileCourse"
import ProfileDetail from "./ProfileDetail"


export default function RedeemCoin() {


    const tabStart = {
        key: "redeem"
    }
    const [redeem, setRedeem] = useState(tabStart.key === "redeem")

    const onHandleChange = () => {
        setRedeem(!redeem)
    }




  return (
    <Fragment>
      <div className="container">
        <Row justify={"space-between"}>
        {
            redeem ? (
                <ProfileDetail onHandleChange={onHandleChange} />
             ) : (
                <ProfileCourse onHandleChange={onHandleChange} />
            )
        }
        </Row>
      </div>
    </Fragment>
  );
}
