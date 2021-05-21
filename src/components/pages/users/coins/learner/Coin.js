import React, { Fragment , useEffect, useState } from "react";
import { Col, Row, Button, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import BuyCoin from "./BuyCoin";
import Loading from "../../../../loading/Loading";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile";
import { useSelector } from "react-redux";
import { styleComponent } from "../../../../defaultFunction/style";
import { useDispatch } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent"
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
const { useBreakpoint } = Grid;

export default function Coin() {
  const loading = useSelector((state) => state.loading.loading);
  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header title="ร้านค้าเหรียญ" pageBack="/me" />}
      <div className="container">
        <div className={style.bodyPaddingTopBottom}>
          {!isMobile() && (
            <div className={style.section}>
              <span className={style.headerFour}>ร้านค้าเหรียญ</span>
            </div>
          )}

          <Row justify={"space-between"}>
            <Col xl={12} lg={13} md={24} sm={24} xs={24}>
                <div className={`${!isMobile()?style.section:null} ${style.marginSection}`} >
                  <div className={ !isMobile()?style.coinlist:null }>
                    { !isEmpty(list) ? list.length !== 0 && list.map((data, index) => (
                      <Row className={style.horizontalCenter} style={{paddingTop:"1rem"}} key={index}>
                        <Col xs={3} sm={4} md={2} lg={3} xl={4} style={{paddingTop:"0.5rem"}}>
                          { screens.md? 
                            <styleComponent.iconCoin size="large" />
                            : 
                            <styleComponent.iconCoin size="medium" />
                          }
                        </Col>
                        <Col xs={11} sm={10} md={7} lg={11} xl={9}>
                        { (data&&data.type === "promo") ?
                          <div>
                              <span className={screens.md? style.textTwo:style.textOne65}>{data && data.coin}  เหรียญ </span>
                              <span className={`${style.textOne} ${style.textPromotion}`}>โปรโมชั่น</span>
                          </div>
                        :
                          <span className={screens.md? style.textTwo:style.textOne65}>{data && data.coin}  เหรียญ</span>
                        }
                        </Col> 
                        <Col xs={9} sm={10} md={7} lg={9} xl={10} style={{paddingTop:"0.25rem"}} align="end">
                            <Button
                              className="backgroundOrange buttonColor"
                              shape="round"
                              size="middle"
                              style={{width: "6rem"}}
                              onClick={() => onClickBuy(data.id,data.baht,data.coin)}
                            >
                              <span className={screen.md?style.textOne5:style.textOne35}>THB {data && data.baht}</span>
                            </Button>
                        </Col>
                      </Row>
                    )): 
                    <SkeletonComponent.SkeletonTextDetail/>                  
                  }
                  </div>
               </div>
            </Col>
            { !screens.lg &&
                <Divider></Divider>
            }
              <Col xl={11} lg={10} md={24} sm={24} xs={24}>
                <BuyCoin rateData={rateData}/>
              </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}