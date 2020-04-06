import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './AuthForm.scss';

const authMap = {
  login: ['로그인', 'info'],
  register: ['회원가입','danger']
};

const AuthForm = ({ type, userData, onChange, onSubmit, error }) => {
	const text = authMap[type][0];
	const authColor = authMap[type][1];
	
	return (
		<div class='auth-form-block'>
			<form onSubmit={onSubmit}>
				<h3>{text}</h3>
				<input
					autoComplete="username"
					name="username"
					placeholder="아이디"
					value={userData.username}
					onChange={onChange}
				/>
				<input
					autoComplete="new-password"
					name="password"
					placeholder="비밀번호"
					type="password"
					value={userData.password}
					onChange={onChange}
				/>
				{type === 'register' && (
					<input
					autoComplete="new-password"
					name="passwordConfirm"
					placeholder="비밀번호 확인"
					type="password"
					value={userData.passwordConfirm}
						onChange={onChange}
					/>
				)}
				{error && <div class='error-message'>{error}</div>}
				<Button color={`${authColor}`}>{text}</Button>
			</form>
			<div class='auth-footer'>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
		</div>
	);
}

export default AuthForm;
