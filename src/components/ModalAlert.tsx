import Modal from "./Modal";

interface ModalAlertProps {
    visible?: boolean;
    handleClose: () => void | any;
    children: JSX.Element;
    onConfirm?: () => void | any;
}

function ModalAlert({ visible=false, handleClose, children, onConfirm }: ModalAlertProps) {
    return ( 
        <Modal style={{padding: 12,width: 450, minWidth: 200}} visible={visible}  handleClose={handleClose} >
            {children}
            <div className="container d-flex flex-row align-items-center justify-content-start">
                <button onClick={onConfirm} className="btn btn-outline-success">
                    Confirm
                </button>
                <button onClick={handleClose} className="btn btn-outline-danger">
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default ModalAlert;