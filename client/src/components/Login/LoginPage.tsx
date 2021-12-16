import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { register, login, UserCredentials } from '../../server-requests';

function LoginPage() {
	let navigate = useNavigate();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onRegisterSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement),
			formDataObj = Object.fromEntries(formData.entries());

		const credentials: UserCredentials = {
			email: formDataObj.email as string,
			password: formDataObj.password as string,
		};
		const response = await register(credentials);

		if (response.status === 200) {
			navigate('/');
		}
	};

	const onLoginSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement),
			formDataObj = Object.fromEntries(formData.entries());

		const credentials: UserCredentials = {
			email: formDataObj.email as string,
			password: formDataObj.password as string,
		};
		const response = await login(credentials);

		if (response.status === 200) {
			if (response.data['2FA']) {
				navigate('/2FA', { state: { email: response.data.email } });
			} else {
				navigate('/dashboard', {
					state: { '2FA': false, email: response.data.email },
				});
			}
		}
	};

	return (
		<div className="container">
			<Form onSubmit={onLoginSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control name="email" type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						className="text-muted"
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button type="submit">Login</Button>
			</Form>
			<p className="text-muted m-0 mt-1">Don't have a user? Register!</p>
			<Button className="mt-2" variant="primary" onClick={handleShow}>
				Register
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Register</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="container" onSubmit={onRegisterSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="email"
								type="email"
								placeholder="Enter email"
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Register
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default LoginPage;
