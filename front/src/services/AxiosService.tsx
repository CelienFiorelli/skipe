import axios from 'axios';
import config from '../config.json'
import Cookies from 'js-cookie';

const axiosService = axios.create({
	baseURL: config.API_URL + 'api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosService.interceptors.request.use(
	(config) => {
		const token = Cookies.get('auth_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosService;