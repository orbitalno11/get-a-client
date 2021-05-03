import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../redux/actions";
import style from "./styles.module.scss"
import { alertIcon } from "../alertIcon/alertIconComponent";
import { typeModal } from "./TypeModal";

const ModalComponent = () => {
  const modal = useSelector(state => state.modal)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [afterClose, setAfterClose] = useState(null)
  const dispatch = useDispatch()
  const [size, setSize] = useState(null)

  useEffect(() => {
    setIsModalVisible(modal.status)
    if (modal.status) {
      setSize(modal.size)
    }
    if (modal.afterClose) {
      setAfterClose(modal.afterClose)
    }
  }, [modal.status])

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(modalAction.closeModal())
    if (afterClose) {
      window.location.href = afterClose
    }
  };

  const checkAlert = (type) =>{
    if(type===typeModal.corrent){
      return <alertIcon.CorrectIcon/>
    }else{
      return <alertIcon.WrongIcon/>
    }
  }

  return (
    <Fragment>
      <Modal
        title={modal.header && modal.header}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        header={null}
        closable={null}
        centered={true}
        width={size}
      >
        <div className={style.alignCenter}>
          {
            modal.text && (
              <div >
                {modal.alert && checkAlert(modal.alert)}
                <p className={style.textAlert}>{modal.text && modal.text}</p>
              </div>
            )
          }
          
        </div>
        {/* for emtry modal */}
        {
          modal.body && modal.body
        }
      </Modal>
    </Fragment>
  );
};

export default ModalComponent