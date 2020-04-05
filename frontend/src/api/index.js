import axios from 'axios';
import { SERVER_API } from '../constants';

axios.defaults.withCredentials = true;

export const registerAPI = ({ username, password }) =>
	axios.post(`${SERVER_API}/users/register`, { username, password });

export const loginAPI = ({ username, password }) =>
	axios.post(`${SERVER_API}/users/login`, { username, password });
