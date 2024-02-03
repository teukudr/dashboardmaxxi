import CONFIG from './config';
const { BASE_URL } = CONFIG;


const API_ENDPOINT = {
  LOGIN: async ({ email, password }) => {
    const response = await fetch(BASE_URL + "loginadmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    return await response.json();
},
  LOGOUT: `${BASE_URL}/logout`,
  SESSION: `${BASE_URL}/session`,
  PRODUCTS: `${BASE_URL}/product`,
  UPDATE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
  DETAIL_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
  DELETE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
  USERS: `${BASE_URL}/users`,
  UPDATE_USERS: (id) => `${BASE_URL}/users/${id}`,
  DETAIL_USERS: (id) => `${BASE_URL}/users/${id}`,
  DELETE_USERS: (id) => `${BASE_URL}/users/${id}`,
};

export default API_ENDPOINT;
