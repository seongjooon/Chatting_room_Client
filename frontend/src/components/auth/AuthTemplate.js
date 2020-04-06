import React from 'react';
import { Link } from 'react-router-dom';
import './AuthTemplate.scss';

const AuthTemplate = ({ children }) => {
	return (
		<div class='auth-block'>
			<div className="logo-area">
				<Link to="/">Cloud-App</Link>
			</div>
			<div className="white-box">
				{children}
			</div>
		</div>
		);
};

export default AuthTemplate;
