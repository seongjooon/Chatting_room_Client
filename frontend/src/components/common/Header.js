import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { CardImg } from 'reactstrap';
import './Header.scss';

const Header = () => {
	return (
		<div class='Header'>
			<Link to="/">
				<div class='main-logo'>
					<CardImg src={Logo} alt="Logo" />
					<span>Cloud-App</span>
				</div>
			</Link>
			<div class='header-navigation' >
				<Link to="/products">
					<div class='nav-element'>상품</div>
				</Link>
				<Link to="/cart">
					<div class='nav-element'>장바구니</div>
				</Link>
			<Link to="/login">
					<div class='nav-element'>로그인</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
