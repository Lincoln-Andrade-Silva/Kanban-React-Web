import { Button, Modal } from "semantic-ui-react";

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    message: string;
    closeModal?: () => void;
    onResult?: (result: boolean) => void;
}

export const ConfirmationModal = ({ message, title, onResult, open, closeModal }: ConfirmationModalProps) => {
    const handleConfirm = (result: boolean) => {
        if (closeModal)
            closeModal();
        if (onResult)
            onResult(result);
    };

    return (
        <Modal
            open={open}
            size='tiny'
            dimmer={false}
            onClose={closeModal}
            className="confirmation-modal"
        >
            <Modal.Header className="confirmation-modal-title"> {title}</Modal.Header>
            <Modal.Content className="confirmation-modal-content">
                {message}
            </Modal.Content>
            <Modal.Actions className="confirmation-modal-actions">
                <Button negative onClick={() => handleConfirm(false)} className='create-entity-button-border'>
                    Cancelar
                </Button>
                <Button positive onClick={() => handleConfirm(true)} className='create-entity-button'>
                    Confirmar
                </Button>
            </Modal.Actions>
        </Modal>
    );
}