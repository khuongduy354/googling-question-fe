import axios from "axios";
export const fetchScrape = async (data) => {
  const apiUrl = "http://localhost:8000";
  const endpoint = "/scrape-result";
  const header = { "Content-Type": "multipart/form-data" };
  const res = await axios.post(apiUrl + endpoint, data, header);
  return res;
};
