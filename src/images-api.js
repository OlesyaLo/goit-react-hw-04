import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "0HZsnhF0eGTg4Z-8uEOqz8aaniSmI_t9e2hfVKE5Yvk";
export const fetchImagesWithData = async (query, page) => {
  const { data } = await axios.get("/search/photos/", {
    params: {
      client_id: API_KEY,
      query,
      per_page: 12,
      page,
    },
  });

  return data;
};