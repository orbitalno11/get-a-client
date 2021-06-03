import React, { Fragment,useState} from "react";
import { Row } from "antd";
import style from "../styles.module.scss";
// import RedeemDetail from "./RedeemDetail";
// import RedeemList from "./RedeemList";
import RedeemDetail from "./RedeemDetail";
import TableRequest from "./TableRequest";
import Request from "./Request";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
import TabHorizontal from "../../../../tab/TabHorizontal";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";


export default function Redeem() {


  const { loading } = useSelector(state => state)

  const [tabStart, setTabStart] = useState({
    key: "redeem",
    name: "แลกเหรียญ",
})

  const tabDetail = [
    {
      key: "redeem",
      name: "แลกเหรียญ",
    },
    {
      key: "history",
      name: "ประวัติเหรียญ",
    },
  ];

  const handleSetSelectTab = (key) => {
    const tabActive = tabDetail.filter(value => value.key === key)[0]
    setTabStart(tabActive)
  }

  const switchShow = () => {
    if (tabStart.key === "redeem") {
        return (
          <Fragment>
            <Row style={{marginBottom:"2rem"}}>
            <RedeemDetail />
            </Row>
            <TableRequest />
          </Fragment>
        )
    }else{
      return <Request />
    }
}

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && (
        <Header title= "จัดการเหรียญ" pageBack="/tutor/1" />
      )}
      <div className="container">
        <div className={style.bodyPaddingTopBottom}>
          {!isMobile() && (
            <div className={style.section}>
              <span className={style.headerFour}>จัดการเหรียญ</span>
            </div>
          )}
            <div
              className={`${!isMobile() && style.section} ${style.marginSection}`}
            >
              <TabHorizontal
                type="tab"
                tabStart={tabStart}
                tabDetail={tabDetail}
                style={"TabPane"}
                handleSetSelectTab={handleSetSelectTab}
              />
            </div>
        </div>
        <Row justify={"space-between"}>
          {
            switchShow()
          }
        </Row>
      </div>
    </Fragment>
  );
}
