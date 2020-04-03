import React from 'react';

const textMap = {
  login: '로그인',
  register: '회원가입'
};

const AuthForm = ({ type, registerData, onChange, onSubmit, error }) => {
	const text = textMap[type];
	
	return (
		<form onSubmit={onSubmit}>
			<h3>{text}</h3>
			<input
			  autoComplete="username"
			  name="username"
			  placeholder="아이디"
			  value={registerData.username}
			  onChange={onChange}
			/>
			<input
			  autoComplete="new-password"
			  name="password"
			  placeholder="비밀번호"
			  type="password"
			  value={registerData.password}
			  onChange={onChange}
			/>
			{type === 'register' && (
			  <input
				autoComplete="new-password"
				name="passwordConfirm"
				placeholder="비밀번호 확인"
				type="password"
				value={registerData.passwordConfirm}
			    onChange={onChange}
			  />
			)}
			{error && <h1>{error}</h1>}
			<button>{text}</button>
		</form>
	);
}

export default AuthForm;
