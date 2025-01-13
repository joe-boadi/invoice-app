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
	})
		.then((res) => {
			console.log(res.data);
		})
		.catch((error) => {
			console.error(error);
		});
}
