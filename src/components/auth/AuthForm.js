import React, { useState } from 'react';

const textMap = {
  login: '로그인',
  register: '회원가입'
};

const AuthForm = ({ type }) => {
	const text = textMap[type];
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	
	return (
		<form>
			<h3>{text}</h3>
			<input
			  autoComplete="username"
			  name="username"
			  placeholder="아이디"
			  value={username}
			  onChange={e => setUsername(e.target.value)}
			/>
			<input
			  autoComplete="new-password"
			  name="password"
			  placeholder="비밀번호"
			  type="password"
			  value={password}
			  onChange={e => setPassword(e.target.value)}
			/>
			{type === 'register' && (
			  <input
				autoComplete="new-password"
				name="passwordConfirm"
				placeholder="비밀번호 확인"
				type="password"
				value={passwordConfirm}
			    onChange={e => setPasswordConfirm(e.target.value)}
			  />
			)}
			<button>{text}</button>
		</form>
	);
}

export default AuthForm;
