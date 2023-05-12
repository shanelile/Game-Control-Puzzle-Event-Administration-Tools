import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = Readonly<{}>;

export const SubmittablePopup = ({}: Props) => {
    const [show, setShow] = useState(false);

    return (
        <Modal
            show={show}
            centered>

        </Modal>
    )
};