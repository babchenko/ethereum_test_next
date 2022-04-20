import { Citizen } from 'types';

export type ModalProps = {
    content: string;
    isOpen:boolean;
    onClose: Function;
    title: string;
}