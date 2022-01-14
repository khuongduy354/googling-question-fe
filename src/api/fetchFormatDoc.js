import axios from "axios";
export const fetchFormatDoc = async (data) => {
  const apiUrl = process.env.SERVER_URL;
  const endpoint = "/format-doc";
  const header = { "Content-Type": "multipart/form-data" };
  const res = await axios.post(apiUrl + endpoint, header, data);
  return res;
};
