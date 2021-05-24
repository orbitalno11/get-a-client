import React from "react"
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import { NavLink, useHistory } from "react-router-dom";

export default function Header({ title, pageBack }) {
    const history = useHistory();

    return (
        <div className={style.header}>
            <div className={style.leftHeader}>
                {
                    pageBack &&
                    (
                        pageBack === "goback" ?
                            (
                                <FontAwesomeIcon onClick={() => history.goBack()} className={style.icon} icon={faChevronLeft} />
                            ) :
                            (
                                <NavLink to={pageBack}>
                                    <FontAwesomeIcon onClick={() => history.goBack()} className={style.icon} icon={faChevronLeft} />
                                </NavLink>
                            )
                    )
                }
                {
                    title ? <span className={style.h1}>{title}</span> : null
                }
            </div>
            <div className={style.rightHeader}>
                {/* dd */}
            </div>
        </div>
    )
}
