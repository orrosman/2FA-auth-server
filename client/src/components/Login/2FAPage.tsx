import React, { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { verifyToken } from '../../server-requests';

function AuthPage() {
	let navigate = useNavigate();
	const { state } = useLocation();

	const onAuthSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement),
			formDataObj = Object.fromEntries(formData.entries());

		const code = formDataObj.code as string;
		const response = await verifyToken(state.email, code);
		console.log(response.data);

		if (response.status === 200) {
			try {
				if (response.data.delta === 0) {
					navigate('/dashboard', {
						state: { '2FA': true, email: state.email },
					});
				} else {
					console.log('wrong token');
				}
			} catch (error) {
				console.log('wrong token');
			}
		} else {
			console.log('wrong token');
		}
	};

	return (
		<Form className="container" onSubmit={onAuthSubmit}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Authentication code</Form.Label>
				<Form.Control name="code" type="text" placeholder="Enter code" />
				<Form.Text className="text-muted">
					Each code is valid up to 4 minutes!
				</Form.Text>
			</Form.Group>
			<Button type="submit">Continue</Button>
		</Form>
	);
}

export default AuthPage;
