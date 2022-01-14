import axios from "axios";
export const fetchFormatDoc = async (data) => {
  const apiUrl = "http://localhost:8000";
  const endpoint = "/format-doc";
  const header = { "Content-Type": "multipart/form-data" };
  const res = await axios.post(apiUrl + endpoint, data, header);
  return res;
};
