import { useState, useLayoutEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import {
    addUserContactInfoRequest,
    deleteContactInfoRequest,
    getUserContactInfoRequest,
    updateUserContactInfoRequest,
} from "../../services/user-contact-info";
import Modal from "../../components/Modal";
import ModalAlert from "../../components/ModalAlert";
import UserContactInfoForm from "./components/UserContactInfoForm";
import { AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import UserContactInfo from "../../interfaces/UserContactInfo";
import { MdDelete, MdEdit } from 'react-icons/md';
import ToolTip from "../../components/ToolTip";
import UserSettingsForm from "./components/UserSettingsForm";
import useUser from "../../hooks/useUser";

function UserAccountSettings() {
    // const { storedUser } = useContext<any>(AppContext);
    const { storedUser } = useUser();

    const [userContactInfoItems, setUserContactInfoItems] = useState<Array<UserContactInfo>>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState({ id: 0 });

    const getUserContactInfo = () => {
        return getUserContactInfoRequest(storedUser)
            .then((res) => setUserContactInfoItems(res))
            .catch((error) => toast.error(error.toString()));
    };

    const addUserContactInfo = (contactInfo: UserContactInfo) => {
        return addUserContactInfoRequest(storedUser, contactInfo)
            .then(getUserContactInfo)
            .catch((error) => toast.error(error.toString()));
    };

    const deleteUserContactInfo = (contactId: number | string, closeModal: () => void) => {
        return contactId && deleteContactInfoRequest(storedUser, contactId)
            .then(getUserContactInfo)
            .then(closeModal)
            .catch(error => toast.error(error.toString()));
    }

    const updateUserContactInfo = (contactInfo: UserContactInfo | any, contactId: number, closeModal: () => void) => {
        return contactId && updateUserContactInfoRequest(storedUser, contactId, contactInfo)
            .then(getUserContactInfo)
            .then(closeModal)
            .catch(error => toast.error(error.toString()));
    }

    useLayoutEffect(() => {
        getUserContactInfo();
    }, []);

    return (
        <>
            <ToastContainer />
            <h3>User settings</h3>
            <AnimatePresence>
                {addModalOpen && (
                    <Modal
                        visible={addModalOpen}
                        handleClose={() => setAddModalOpen(false)}
                    >
                        <UserContactInfoForm
                            onError={toast.error}
                            formTitle={<h3>Add contact info</h3>}
                            onSubmit={addUserContactInfo}
                        />
                    </Modal>
                )}
                {alertOpen && (
                    <ModalAlert
                        visible={alertOpen}
                        handleClose={() => setAlertOpen(false)}
                        onConfirm={() => deleteUserContactInfo(selectedContact?.id, () => setAlertOpen(false))}
                    >
                        <h3>Are you sure you want to delete this contact info?</h3>
                    </ModalAlert>
                )}
                {updateModalOpen && (
                    <Modal
                        visible={updateModalOpen}
                        handleClose={() => setUpdateModalOpen(false)}
                    >
                        <UserContactInfoForm
                            onError={toast.error}
                            defaults={selectedContact}
                            formTitle={<h3>Update contact info</h3>}
                            onSubmit={(userContactInfo) => updateUserContactInfo(userContactInfo, selectedContact?.id, () => setUpdateModalOpen(false))}
                        />
                    </Modal>
                )}
            </AnimatePresence>

            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>My contact info</Accordion.Header>
                    <Accordion.Body>
                        <ToolTip tip="Add new contact information ">
                            <Button variant="primary" onClick={() => setAddModalOpen(true)}>
                                Add contact info
                            </Button>
                        </ToolTip>
                        {userContactInfoItems && (
                            <ListUserContactInfo
                                userContactInfoItems={userContactInfoItems}
                                onUpdate={(contact) => {
                                    setUpdateModalOpen(true);
                                    setSelectedContact(contact);
                                }}
                                onDelete={(contact) => {
                                    setAlertOpen(true);
                                    setSelectedContact(contact);
                                }}
                            />
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>My account settings</Accordion.Header>
                    <Accordion.Body>
                        <UserSettingsForm />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

const ListUserContactInfo = ({
    userContactInfoItems,
    onDelete,
    onUpdate,
}: {
    userContactInfoItems: UserContactInfo[];
    onDelete?: (contact?: any) => any;
    onUpdate?: (contact?: any) => any;
}) => {
    return (
        <ListGroup>
            {userContactInfoItems &&
                userContactInfoItems.map((contact, index) => (
                    <ListGroup.Item key={index} className="d-flex flex-wrap align-items-center justify-content-between">
                        <div style={{ width: 'fit-content' }}>
                            <strong>{contact.contact_type}</strong>: {contact.contact}
                        </div>
                        <div style={{ width: 100 }}>
                            <Button variant="" onClick={() => onDelete && onDelete(contact)}>
                                <MdDelete />
                            </Button>
                            <Button variant="" onClick={() => onUpdate && onUpdate(contact)}>
                                <MdEdit />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
};

// ACCORDIONES DE USUARIO: contraseña, nombre de usuario
// ACORDIONES DE FORMAS DE CONTACT DEL USUARIO

export default UserAccountSettings;
