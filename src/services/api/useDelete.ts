import axios from 'axios';
/**
 * @param {string} url The URL to connect to  the server
 * @param {string} id The ID of the data from  the server
 * returns a promise that will be fulfilled
 */
export async function useDelete(url: string, id: string) {
	return await axios({
		url: `${url}/${id}`,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
	})
		.then((res) => {
			console.table(res.data);
		})
		.catch((error) => {
			console.error(error);
		});
}
