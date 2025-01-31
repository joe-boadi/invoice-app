import axios from 'axios';
import { generateInvoiceId } from '../../utilities/GetInvoiceId';

/**
 * @param {string} url The URL to connect to  the server
 * @param {string} data The data to be served or posted to  the server to be fetched
 * returns a promise that will be fulfilled
 */
export async function usePostData(url: string, data: any) {
	return await axios({
		url: url,
		method: 'POST',
		data: { id: generateInvoiceId(), ...data },
	}).then((res) => res.data);
}

/**
 * @param {string} url The URL to connect to  the server
 * @param {umknown/any} data The data to be served or posted to  the server to be fetched
 * @param {string} id The new invoice identifier 
 * returns a promise that will be fulfilled
 */
const token = localStorage.getItem('token')
export async function usePostDataById(url: string, id: string, data: any) {
	return await axios({
		url: `${url}/${id}`,
		method: 'POST',
		data: data,
		headers: {
			Authorization: 'Bearer ' + token,
			"Content-Type": "application/json",
			'Accept': 'application/json',
		},
	})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err.response.data.message);
		});
}