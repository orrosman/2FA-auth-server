import React from 'react';
import githubLogo from '../assets/github.svg';
import linkedinLogo from '../assets/linkedin.svg';

function Footer() {
	return (
		<footer
			className="
			position-absolute
			bottom-0
			start-50
			translate-middle-x
			bg-dark
			text-center text-white
			w-100
		"
		>
			<div className="container p-4 pb-0">
				<a
					className="btn btn-outline-light btn-floating m-1"
					href="https://www.linkedin.com/in/orrosman/"
					role="button"
					target="_blank"
					rel="noreferrer"
				>
					<img src={linkedinLogo} alt="Linkedin"></img>
				</a>
				<a
					className="btn btn-outline-light btn-floating m-1"
					href="https://github.com/orrosman"
					role="button"
					target="_blank"
					rel="noreferrer"
				>
					<img src={githubLogo} alt="Linkedin"></img>
				</a>
			</div>

			<div className="text-center p-3">
				© 2021 Copyright:
				<span>
					{' '}
					<a className="text-white" href="https://github.com/orrosman">
						Or Rosman
					</a>
				</span>
			</div>
		</footer>
	);
}

export default Footer;
