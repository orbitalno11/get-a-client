import React, { Fragment } from "react"
import { Grid, Row } from "antd"
import {
    faClock,
    faCoins,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
const { useBreakpoint } = Grid;

export default function DetailCourse() {
    const screens = useBreakpoint();

    return (
        <Fragment>
            <div className={screens.md && `${style.marginTop20} ${style.borderOrange}`} >
                <Row className={!screens.md && style.alignCenter}>
                    <span className={style.titleH2}>คณิตศาสตร์</span>
                </Row>
                <div className={screens.xs || (screens.sm && !screens.md) ? style.paddingbody : null}>
                    <div >
                        <div className={(screens.xs || (screens.sm && !screens.md)) ? style.marginTop20 : style.contrainnerProfilePubile}>
                            <div className={style.TitleCoin}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                                <span className={style.textNormal}>ม.6, Admission</span>
                            </div>
                            <div className={style.TitleCoin}>
                                <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                <span  className={style.textNormal}>จันทร์, อังคาร 13.30น. - 16.00น.</span>
                            </div>
                            <div className={style.TitleCoin}>
                                <FontAwesomeIcon icon={faCoins} className={style.iconmarker} />
                                <span  className={style.textNormal}>300 บาท/ชั่วโมง</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
