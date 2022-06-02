import Modal from "../../../components/Modal";
import ModalAlert from "../../../components/ModalAlert";
import Form from './../../../components/Form';
import { useContext } from 'react';
import { AppContext } from './../../../App';
import { Link } from 'react-router-dom';
import { reportProductRequest } from "../../../services/products-requests";

interface ReportModalFormProps {
    visible: boolean;
    handleClose: () => void | any;
    productId: number | string | undefined;
    onError?:(error: string) => void | any;
    onSuccess?: (success: string) => void | any;
}

export default function ReportModalForm({visible, handleClose, productId, onError, onSuccess}: ReportModalFormProps){
    const { storedUser } = useContext<any>(AppContext);

    const formFields = [
        {   
            name: "report_reason",
            pattern: "^[\\w\\s]{5,255}$",
            placeholder: "Why are you reporting this item?",
            required: true,
            alertMessage: "Please enter why you are reporting this item, at least 5 characters long",
        }
    ];

    const handleError = (error: string) => (onError && onError(error.toString())) || console.log(error.toString)

    const submitReport = (data: any) => {
        if(productId &&  storedUser) return reportProductRequest(storedUser, productId, data)
            .then(res =>{
                handleClose()
                if(res.error) handleError(res.error)
            })
            .catch(handleError);
    }

    if(!storedUser.user){
        return <Modal handleClose={handleClose} visible={visible}>
            <Link className="btn btn-link" to="/login">To report a item you need to log in</Link>
        </Modal>
    }

    return (
        <Modal handleClose={handleClose} visible={visible}>
            <Form
                fields={formFields}
                onSubmit={submitReport}
                formTitle={<h3>Report product</h3>}
                buttonText="Report"
            />
        </Modal>
    )
}

