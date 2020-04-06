import React, { useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { registerAPI } from '../../api';

const RegisterForm = () => {
	const [error, setError] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const userData = { username, password, passwordConfirm };
	
	const onChange = e => {
		const { value, name } = e.target;
		if (name === 'username') setUsername(value);
		if (name === 'password') setPassword(value);
		if (name === 'passwordConfirm') setPasswordConfirm(value);
	};
	
	const onSubmit = e => {
		e.preventDefault();
		const { username, password, passwordConfirm } = userData;

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
		 registerAPI({ username, password })
			.then(res => res)
			.catch(err => {
				if (err) {
					if (err.response.status === 409) {
						setError('이미 존재하는 계정명입니다.');
						return;
					}
					setError('회원가입 실패');
					return;
				}
		 })
	};
	
	return (
		<AuthForm	
		type="register"
		userData={userData}
		onChange={onChange}
		onSubmit={onSubmit}
		error={error}
		/>
	);
}

export default RegisterForm;
