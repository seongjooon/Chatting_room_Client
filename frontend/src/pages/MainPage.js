import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const MainPage = () => {
	return (
		<>
			<Link to="/register" >
				<Badge color="danger">파일 매니저</Badge>
			</Link>
			<Link to="/login" >
				<Badge color="info">채팅</Badge>
			</Link>
		</>
	);
};

export default MainPage;
