import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { loginAPI } from '../../api';

const LoginForm = ({ history }) => {
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const userData = { username, password };
	
	const onChange = e => {
		const { value, name } = e.target;
		if (name === 'username') setUsername(value);
		if (name === 'password') setPassword(value);
	};
	
	const onSubmit = e => {
		e.preventDefault();
		const { username, password } = userData;

		if ([username, password].includes('')) {
			setError('빈 칸을 모두 입력하세요.');
			return;
		}
		loginAPI({ username, password })
			.then(res => res)
			.catch(err => console.dir(err));
	};

	return (
		<AuthForm	
		type="login"
		userData={userData}
		onChange={onChange}
		onSubmit={onSubmit}
		error={error}
		/>
	);
}

export default withRouter(LoginForm);
