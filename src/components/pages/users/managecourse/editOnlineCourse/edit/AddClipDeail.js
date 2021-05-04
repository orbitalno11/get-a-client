import React, { Fragment} from "react";
import style from "../../styles.module.scss";
import { useForm } from "react-hook-form";
import { Col, Row, Grid} from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { clipSchema } from "../../../../../../validation/course/clipSchema";
const { useBreakpoint } = Grid;

export default function AddClipDeail() {
  const screens = useBreakpoint();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(clipSchema),
  });

  const onSubmit = () => {
    // todo onSubmit
    // value
  } 

  return (
    <Fragment>
      <div>
        <form id="addOnlineCourse" onSubmit={handleSubmit(onSubmit)}>
          {screens.md && (
            <Row>
              <span className={style.titleH2}>เพิ่มบทเรียน </span>
            </Row>
          )}
          <Row justify="space-between" align="middle">
            <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
              <p>ชื่อคลิป</p>
              <input
                className="input"
                type="title"
                name="title"
                ref={register}
              />
              {errors.title && (
                <p className="error-input">{errors.title.message}</p>
              )}
            </Col>
            <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
              <p>รายละเอียด</p>
              <input
                className="input"
                type="description"
                name="description"
                ref={register}
                style={{ height: "15rem" }}
              />
              {errors.description && (
                <p className="error-input">{errors.description.message}</p>
              )}
            </Col>
          </Row>
        </form>
      </div>
    </Fragment>
  );
}
