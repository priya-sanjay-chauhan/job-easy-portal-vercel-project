import axios from "axios";

const BASE_URL = "/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Export the base URL for direct use if needed
export const getBaseUrl = () => BASE_URL;

export const testConnection = async () => {
  try {
    // Test the root endpoint of the server
    const response = await axios.get("http://localhost:3000/", {
      withCredentials: true,
    });
    console.log("Server connection test:", response.data);
    return true;
  } catch (error) {
    console.error("Server connection error:", error.message);
    return false;
  }
};

export const getAllHandler = async (url) => {
  const res = await api.get(url);
  // If the response has a result property, return that, otherwise return the data directly
  return res.data?.result !== undefined ? res.data.result : res.data;
};

export const getSingleHandler = async (url) => {
  const res = await api.get(url);
  return res?.data?.result;
};

export const postHandler = async ({ url, body }) => {
  return await api.post(url, body);
};

export const updateHandler = async ({ url, body }) => {
  const res = await api.patch(url, body);
  return res?.data?.result;
};

export const updateHandlerPut = async ({ url, body }) => {
  return await api.put(url, body);
};

export const deleteHandler = async (url) => {
  return await api.delete(url);
};

export const logoutHandler = async () => {
  return await api.get("/auth/logout");
};
