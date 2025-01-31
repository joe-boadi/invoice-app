import axios from "axios";
/**
 *@param {string} url the url to connect to the server
 */
export const useFetchData = async (url: string) => {
  return await getData(url);
};

/**
 * @param {string} url The URL to connect to  the server
 * @param {string} params object contains the ID of the data from  the server
 *
 * returns a promise that will/should be fulfilled
 */
export const useFetchDatabyId = (
  url: string,
  params: {
    id: string;
  }
) => {
  return getData(`${url}/${params.id}`);
};
const getData = async (url: string, params = {}) => {
  const token = localStorage.getItem("token");

  return await axios({
    url: url,
    method: "GET",
    params: params,
    headers: { Authorization: "Bearer " + token },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).then((res: any) => res.data);
};
