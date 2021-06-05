import React, { Fragment,useState,useEffect} from "react";
import { Row , Divider } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
// import style from "../styles.module.scss";
// import RedeemDetail from "./RedeemDetail";
// import RedeemList from "./RedeemList";
// import RedeemDetail from "./RedeemDetail";
// import TableList from "./TableList";
// import Request from "./Request";
// import Header from "../../../../headerMobile/Header";
//  import isMobile from "../../../../isMobile/isMobile";
// import TabHorizontal from "../../../../tab/TabHorizontal";
// import Loading from "../../../../loading/Loading";
// import { useSelector } from "react-redux";
import TableRequest from "./TableRequest"
import Request from "./Request"
import RedeemDetail from "./RedeemDetail"
import { useDispatch, } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
// import ProfileDetail from "./ProfileDetail"


export default function RedeemCoin() {

    const dispatch = useDispatch();
    const screens = useBreakpoint();
    
    const [isShowRequest, setisShowRequest] = useState(false)

    const startKey = {
        key: "redeem"
    }
    const [redeem, setRedeem] = useState(startKey.key === "redeem")

    const onHandleChange = (show) => {     
      setisShowRequest(show)
      setRedeem(!redeem)
    }

    useEffect(() => {
      dispatch(coinAction.getCoinRatesTutor());
      dispatch(coinAction.getCoinBalance());
    }, []);
    

  return (
    <Fragment>
      <div style={{paddingBottom:"3.rem"}}>
        <Row>
        {
            redeem ? (
              <Fragment>
                <Row style={{width:"100%" , marginBottom:"1rem"}}>
                  <RedeemDetail onHandleChange={onHandleChange} />
                </Row>
              {
                !screens.md&&(
                  <Divider/>
                )
              }
                <TableRequest onHandleChange={onHandleChange}/>

              </Fragment>
             ) : (
                <Request onHandleChange={onHandleChange} showRequest={isShowRequest}/>
            )
        }
        </Row>
      </div>
    </Fragment>
  );
}
