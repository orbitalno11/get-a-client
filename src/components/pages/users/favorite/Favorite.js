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
import isEmpty from "../../../defaultFunction/checkEmptyObject";
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

  const paddingCard = {
    paddingBottom: "1rem",
  };

  const CourseSection = () => {
    return (
      !isEmpty(list) &&
      !loading.loading && (
        <Fragment>
            <Row
              gutter={[16, 0]}
              className={`${style.marginSection}`}
              justify={"space-between"}
            >
              {list &&
                list.map((item) => (
                  <Col
                    align="center"
                    xl={12}
                    lg={12}
                    md={24}
                    sm={24}
                    xs={24}
                    key={item.id}
                    style={paddingCard}
                  >
                    <CardCourseLearner
                      data={item}
                      verizontal="true"
                      type="course"
                      ranking={!screens.md ? false : true}
                    />
                  </Col>
                ))}
            </Row>
        </Fragment>
      )
    );
  };

  return (
    <Fragment>
      {loading.loading && <Loading />}
      {isMobile() && <Header title="ที่คุณถูกใจ" />}
      <div className="container">
        <div className={style.bodyPaddingTopBottom}>
          {screens.md && (
            <div className={style.section}>
              <span className={style.headerFour}>
                รายการที่คุณถูกใจ
              </span>
            </div>
          )}
          <Row justify={"space-between"}>
            <Col xl={17} lg={17} md={14} sm={24} xs={24}>
            {list && list.length ? (
              <CourseSection />
              ) : (
                <div align="center">
                  <EmptyImage size="default" />
                  <p className={style.textNormal}>
                    คุณยังไม่ได้กดถูกใจติวเตอร์ &nbsp;
                  </p>
                </div>
              )}
            </Col>
            {screens.md && (
              <div
                className={
                  !screens.lg
                    ? style.contentRecommend
                    : style.contentRecommendXl
                }
              >
                <b className={style.textOne75}>เป็นที่นิยม</b>
                {home.offlineCourseRank &&
                  home.offlineCourseRank.map((item) => (
                    <Row key={item.id}>
                      <TutorCard data={item} />
                    </Row>
                  ))}
              </div>
            )}
          </Row>
        </div>
      </div>
    </Fragment>
  );
}
