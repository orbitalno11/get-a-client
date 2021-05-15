import React, { Fragment } from 'react'
import { color } from "../../../../../../defaultValue";
import style from "../../../styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent";

export default function ProfileContact({ profileDetail }) {
    return (
        <Fragment>
            <div className={style.subProfile}>
                <h3 className={style.titleH4}>ช่องทางติดต่อ</h3>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faFacebook} className={style.iconcoin} style={{ color: color.blue }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.facebookUrl ? profileDetail.contact.facebookUrl : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faLine} className={style.iconcoin} style={{ color: color.green }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.lineId ? profileDetail.contact.lineId : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={style.iconcoin} style={{ color: color.gray }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.phoneNumber ? profileDetail.contact.phoneNumber : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
