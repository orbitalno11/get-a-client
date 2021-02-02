import React from 'react'
import style from './styles.module.scss'
import { faGraduationCap, faPlus ,faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { removeHistory } from '../../redux/actions/profileActions'
import { useDispatch } from 'react-redux'


export default function EducationTutor({ data, addData, status, size ,index}) {
    const dispatch = useDispatch()

    const removeEducation = (key) =>{
        dispatch(removeHistory(key))
    }

    return (
        <div className={style.educationRow}>
            {
                addData ? <Button className="backgroundGray buttonColor" size="middle" shape="circle" icon={<FontAwesomeIcon icon={faMinus} onClick={()=>removeEducation(index)}/>} /> : null
            }
            <FontAwesomeIcon className={size==='small'?style.smallSizeIcon:style.largeSizeIcon} icon={faGraduationCap} />
            <div className={style.subProfile}>
                <span>{data ? data.name : null}</span>
                <br />
                <span>{data ? data.brance : null}</span>
                <br />
                <span>{data ? data.grade : null}</span>
            </div>
            {
                status ?
                    <div className={style.floatLeft}>
                        <span>กำลังตรวจสอบ</span>
                    </div> : null
            }
        </div>
    )
}