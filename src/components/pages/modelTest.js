import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { modalAction } from "../../redux/actions"
import ModalComponent from "../modal/ModalComponent"
import { sizeModal } from "../modal/SizeModal"
import { typeModal } from "../modal/TypeModal"

export default function ModelTest() {
    const dispatch = useDispatch()

    const centerPage = {
        paddingTop: '10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    function ComponentSample (){
        return (
                <div >
                    <p>ตัวอย่าง</p>
                    <button>ยกเลิก</button>
                    <button onClick={() => alert()}>ตกลง</button>
                </div>
        )
    }

    const alert = () => {
        dispatch(modalAction.openModal({
            text: "เข้าสู่ระบบไม่สำเร็จ",
            size: sizeModal.small,
            alert: typeModal.wrong
        }))
    }

    const component = () => {
        dispatch(modalAction.openModal({
            body: <ComponentSample />,
            size: sizeModal.default,
        }))
    }

    const buttonStyle = {
        margin: ' 0rem 1rem  0rem  1rem'
    }

    return (
        <Fragment>
            <ModalComponent />
            <div style={centerPage}>
                <button style={buttonStyle} onClick={() => alert()}>ตกล</button>
                <button style={buttonStyle} onClick={() => component()}>Component</button>
            </div>
        </Fragment>
    )
}
