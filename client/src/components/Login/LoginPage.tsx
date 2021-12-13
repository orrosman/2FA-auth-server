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
			navigate('/');
		}
	};

	return (
		<>
			<Form className="container" onSubmit={onLoginSubmit}>
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
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button type="submit">Login</Button>
			</Form>

			<>
				<Button variant="primary" onClick={handleShow}>
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
			</>
		</>
	);
}

export default LoginPage;
