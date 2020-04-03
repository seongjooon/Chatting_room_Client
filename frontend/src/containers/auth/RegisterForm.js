import React, { useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { registerAPI } from '../../api';

const RegisterForm = () => {
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const registerData = { username, password, passwordConfirm };
	
	const onChange = e => {
		const { value, name } = e.target;
		if (name === 'username') setUsername(value);
		if (name === 'password') setPassword(value);
		if (name === 'passwordConfirm') setPasswordConfirm(value);
	};
	
	const onSubmit = e => {
		e.preventDefault();
		const { username, password, passwordConfirm } = registerData;

		if ([username, password, passwordConfirm].includes('')) {
			setError('빈 칸을 모두 입력하세요.');
			return;
		}
		if (password !== passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			setPassword('');
			setPasswordConfirm('');
			return;
		}
		setError('참 잘했어요.');//api call { username, password }
		registerAPI({ username, password })
			.then(res => console.log(res))
			.catch(err => console.log(err));;
	};
	
	return (
		<AuthForm	
		type="register"
		registerData={registerData}
		onChange={onChange}
		onSubmit={onSubmit}
		error={error}
		/>
	);
}

export default RegisterForm;
