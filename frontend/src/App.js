import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
	return (
		<div class='App'>
			<Header />
			<Route path='/' render={() => <Redirect to='/home' />} />
			<Route path="/register" component={RegisterPage} />
			<Route  path="/login" component={LoginPage} />
			<Route exact path='/home' component={MainPage} />
		</div>
	);
};

export default App;
