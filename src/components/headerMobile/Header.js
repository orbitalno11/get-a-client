import React from "react"
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import { Link, useHistory } from "react-router-dom";

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
                                <FontAwesomeIcon className={style.fontWhite} onClick={() => history.goBack()} icon={faChevronLeft} />
                            ) :
                            (
                                <Link to={pageBack}>
                                    <FontAwesomeIcon className={style.fontWhite} icon={faChevronLeft} />
                                </Link>
                            )
                    )
                }
                {
                    title ? <span className={style.textHeader}>{title}</span> : null
                }
            </div>
            <div className={style.rightHeader}>
                {/* dd */}
            </div>
        </div>
    )
}