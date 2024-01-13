import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Logo from './Logo'
import success from '../../../public/success.svg'
import error from '../../../public/error.svg'



type IProps ={
    showModal : boolean,
    handleClose:  () => void, 
    btnColor :string,
    infoMsg:string,
    status : "success" | "failure" | "Alert" | null
    handleConfirm? :()=>void
}
const InfoPopup:React.FC<IProps> = ({handleConfirm,handleClose,showModal,btnColor,infoMsg,status}) => {
    const getIcon =() =>{
        if(status == "success"){
            return success
        }
        return error
    }
  return (
    <Modal show={showModal} onHide={handleClose} centered>

    <Modal.Body className='custom-modal'>
      <div className='custom-modal-icon'>
        <img src={getIcon()}  alt="Info Icon" />
      </div>
      <div className='custom-modal-msg'>
        {infoMsg}
      </div>
      <div className='custom-modal-btn d-flex justify-content-between w-100'>
   
      <Button variant={btnColor} onClick={handleClose}>
        Close
      </Button>
      {handleConfirm && (
        <Button onClick={handleConfirm} variant='yellow'  className='text-black'>
          Confirm
        </Button>
      )}
      </div>
      <Logo />

    </Modal.Body>
    
  </Modal>
  )
}

export default InfoPopup