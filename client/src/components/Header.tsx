import React from 'react';
import exampleLogo from '../assets/logo.svg';

function Header() {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<i className="navbar-brand mx-auto text-center">
				<img
					src={exampleLogo}
					width="100"
					height="100"
					alt="example logo"
				></img>
				<div>header text here</div>
			</i>
		</nav>
	);
}

export default Header;
