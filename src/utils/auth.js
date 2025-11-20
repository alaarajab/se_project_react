import { getToken, setToken, removeToken } from "./token";

export const BASE_URL = "https://api.nomoreparties.co";

// Helper to handle fetch responses and throw full API error
function checkResponse(res) {
  return res.json().then((data) => {
    if (res.ok) return data;
    throw data; // throw full API error object
  });
}

/**
 * Register a new user
 * @param {Object} data - { username, email, password, avatar? }
 */
export const register = ({ username, email, password, avatar }) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, avatar }),
  }).then(checkResponse);
};

/**
 * Login user and save token
 * @param {Object} data - { email, password }
 */
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      setToken(data.jwt);
      return data;
    });
};

/**
 * Logout user (remove token)
 */
export const logout = () => {
  removeToken();
};

/**
 * Check token validity and get user info
 */
export const checkToken = () => {
  const token = getToken();
  if (!token) return Promise.reject("No token found");

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};
