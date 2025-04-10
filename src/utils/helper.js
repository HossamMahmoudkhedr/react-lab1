import axios from 'axios';

const URL = 'http://localhost:3000';
export async function getData(endpoint, method = 'get', body = {}) {
	try {
		const params = body ? [`${URL}${endpoint}`, body] : [`${URL}${endpoint}`];
		const res = await axios[method](...params);
		return res;
	} catch (error) {
		console.log(error);
	}
}
