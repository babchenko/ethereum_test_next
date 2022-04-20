// @ts-nocheck
import React from 'react';
import { Modal, Button, Dimmer, Loader } from 'semantic-ui-react';
import { ModalProps } from './modal.types';

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, content, title }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                { content ? content :
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                }
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalComponent;