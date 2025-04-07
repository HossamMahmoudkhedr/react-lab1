import axios from 'axios';

const URL = 'http://localhost:3000';
export async function getData(endpoint) {
	try {
		const res = await axios.get(`${URL}${endpoint}`);
		return res;
	} catch (error) {
		console.log(error);
	}
}
