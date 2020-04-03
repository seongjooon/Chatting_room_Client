import axios from 'axios';
import { SERVER_API } from '../constants';

export const registerAPI = ({ username, password }) =>
	axios
		.post(`${SERVER_API}/users/register`, { username, password })
		.then(res => res)
		.catch(err => console.log(err));
