import { Col, Row } from "antd"
import Title from "antd/lib/typography/Title"
import React, { Fragment } from "react"
import CardCourseTutor from "../../../../../../card/CardCourseTutor"
import isMobile from "../../../../../../isMobile/isMobile"
import style from "../../../styles.module.scss"

export default function ProfileCourse() {
    // When the profile use?
    // const data = useSelector(state => state.profile)
    // const [profile, setProfile] = useState(null)
    //
    // useEffect(() => {
    //     setProfile(data.profileHandle)
    // }, [data])

    return (
        <Fragment>
            <div className={style.marginTop}>
                <Row justify="space-around" align="middle" className={isMobile() ? style.paddingbody : style.contrainnerProfilePubile}>
                    <Col span={24}>
                        <Title level={4}>วิชาที่สอน</Title>
                    </Col>
                    <Col xs={24} sm={20} md={23} lg={20} xl={12} className={style.padding}>
                        <CardCourseTutor />
                    </Col>
                    <Col xs={24} sm={20} md={23} lg={20} xl={12} className={style.padding}>
                        <CardCourseTutor />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
