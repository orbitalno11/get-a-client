import React, { Fragment,useState} from "react";
import style from "../styles.module.scss";
import RedeemCoin from "./RedeemCoin";
import TableHistory from "./TableHistory";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
import TabHorizontal from "../../../../tab/TabHorizontal";
import Loading from "../../../../loading/Loading";
//import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
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
         < RedeemCoin/>
        )
    }else{
      return <TableHistory/>
    }
}

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && (
        <Header title= "จัดการเหรียญ" pageBack="/me" />
      )}
      <div className="container">
        <div className={style.paddingTopBody}>
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
        <div>
          {
            switchShow()
          }
        </div>
      </div>
    </Fragment>
  );
}
