import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { twoFactorAuth } from './server-requests';

function App() {
	const { state } = useLocation();
	const [show, setShow] = useState(false);
	const [qrData, setQrData] = useState('');

	const multiAuth = state['2FA'];
	const authText = multiAuth === true ? 'Disable 2FA' : 'Enable 2FA';

	const handleClose = () => setShow(false);
	const handleShow = async () => {
		setShow(true);

		const response = await twoFactorAuth(state.email);
		setQrData(String(response.data));
	};

	return (
		<>
			<h1 className="text-center">Dashboard</h1>
			<div className="container">
				<Button className="mt-2" variant="primary" onClick={handleShow}>
					{authText}
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>{authText}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{qrData === '2FA disabled' ? (
							'2FA disabled'
						) : (
							<img src={qrData} alt="QR code" />
						)}
					</Modal.Body>
				</Modal>
				<p className="container">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
					possimus, nam explicabo consectetur minima sint sit. Ducimus, nobis
					quia enim ratione vel unde temporibus sint voluptatem tempora optio
					iure pariatur!
				</p>
				<p className="container">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
					possimus, nam explicabo consectetur minima sint sit. Ducimus, nobis
					quia enim ratione vel unde temporibus sint voluptatem tempora optio
					iure pariatur!
				</p>
				<p className="container">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
					possimus, nam explicabo consectetur minima sint sit. Ducimus, nobis
					quia enim ratione vel unde temporibus sint voluptatem tempora optio
					iure pariatur!
				</p>
			</div>
		</>
	);
}

export default App;
