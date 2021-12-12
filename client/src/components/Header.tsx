import React from 'react';
import exampleLogo from '../assets/2fa-logo.svg';

function Header() {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<i className="navbar-brand mx-auto text-center">
				<img src={exampleLogo} width="100" height="100" alt="2FA Project"></img>
				<div>2FA Project</div>
			</i>
		</nav>
	);
}

export default Header;
