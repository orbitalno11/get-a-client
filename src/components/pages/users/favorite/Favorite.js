import React, { Fragment, useEffect } from "react";
import { Grid, Col, Row } from "antd";
import style from "./styles.module.scss";
import Header from "../../../headerMobile/Header";
import CardCourseLearner from "../../../card/CardCourseLearner";
import TutorCard from "../../../card/TutorCard";
import isMobile from "../../../isMobile/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { favoriteAction, homeActions } from "../../../../redux/actions";
import Loading from "../../../loading/Loading";
import EmptyImage from "../../../loading/EmptyImage";
const { useBreakpoint } = Grid;

export default function Favorite() {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const { loading, home } = useSelector((state) => state);
  const list = useSelector((state) => state.favorite.favoritelist);

  useEffect(() => {
    dispatch(favoriteAction.getFavoriteList());
    dispatch(homeActions.getRank(5));
  }, []);

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header title="ที่คุณถูกใจ" />}
        <div className={style.container}>
          {screens.md && (
            <div className={style.titleFav}>
              <span className={`${style.headerFour} ${style.paddingTitel}`}>
                รายการที่คุณถูกใจ
              </span>
            </div>
          )}
          {isMobile() ? (                      
            <div>
              {list && list.length ? (
              <Row>
                {list &&
                  list.map((item, index) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={12}
                      className={style.padding}
                      key={index}
                    >
                      <CardCourseLearner data={item} verizontal="true"  type="course"/>
                    </Col>
                  ))}
              </Row>
              ): (
                <div align="center" className={style.container}>
                  <EmptyImage size="default" />
                  <p className={style.textOneo25}>คุณยังไม่ได้กดถูกใจติวเตอร์ &nbsp;</p>
                </div>
              )}
            </div>                    
          ):(
            <Row>
              <div className={!screens.xl ? style.contentFav : style.contentFavXl}>
                {list && list.length ? (
                <Row>
                  {list &&
                    list.map((item, index) => (
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={12}
                        className={style.padding}
                        key={index}
                      >
                        <CardCourseLearner data={item} verizontal="true" type="course" ranking={true}/>
                      </Col>
                    ))}
                </Row>
                ): (
                  <div align="center">
                    <EmptyImage size="default" />
                    <p className={style.textNormal}>คุณยังไม่ได้กดถูกใจติวเตอร์ &nbsp;</p>
                  </div>
                )}
              </div>
              <div
                className={!screens.xl? style.contentRecommend: style.contentRecommendXl}>
                <span className={style.headerOne75}>เป็นที่นิยม</span>
                {home.offlineCourseRank &&
                  home.offlineCourseRank.map((item) => (
                    <Row key={item.id}>
                      <TutorCard data={item} />
                    </Row>
                  ))}
              </div>
            </Row>
            )}
        </div>
    </Fragment>
  );
}
