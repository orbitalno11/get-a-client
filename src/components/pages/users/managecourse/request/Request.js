import { Divider, Image, Button } from "antd";
import React, { Fragment } from "react";
import styles from "../styles.module.scss";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color, defaultValue } from "../../../../defaultValue";
import isMobile from "../../../../isMobile/isMobile";
import { useDispatch } from "react-redux";
import { offlineCourseAction } from "../../../../../redux/actions";

export default function Request({ id,data }) {

  const dispatch = useDispatch()

  const marginLeft = {
    marginLeft: "1rem",
  }

  const iconMarker = {
    color: color.gray,
    marginRight: "1rem"
  }

  const buttonEnroll = {
    width:"5rem",
    margin:"0.1rem 0.1rem 0.1rem 0.2rem",
  }

  const enrollCourse = (status) =>{
    dispatch(offlineCourseAction.acceptEnrollOfflineCourse(id,data.userId,status))
  }

  const ButtonEnrool = () => {
    return (
      <div className={styles.floatLeft}>
        <Button className="buttonColor backgroundOrange" size="medium" shape="round" style={buttonEnroll} onClick={()=>enrollCourse(defaultValue.enrollStatus["APPROVE"])}>อนุมัติ</Button>
        <Button className="buttonColor backgroundGray" size="medium" shape="round" style={buttonEnroll} onClick={()=>enrollCourse(defaultValue.enrollStatus["DENIED"])}>ลบคำขอ</Button>
      </div>
    )
  }



  return (
    <Fragment>
      <div className={styles.profileSet}>
        <Image
          className={styles.imageProfilesmall}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          preview={false}
        />
        <div>
          <div style={marginLeft}>
            <span className={styles.titleH5}>{data && data.fullNameText}</span>
            <br />
            <span >
              <FontAwesomeIcon icon={faMapMarkerAlt} style={iconMarker} />
              {data.address ? data.address : "ยังไม่ได้กำหนด"}
            </span>
          </div>
          {
            isMobile() && (<ButtonEnrool />)
          }
        </div>
        {
          !isMobile() && (<ButtonEnrool />)
        }
      </div>
      <Divider type="horizontal" style={{ height: "100%" }} />
    </Fragment>
  );
}
