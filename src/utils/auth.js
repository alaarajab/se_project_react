import { getToken, setToken, removeToken } from "./token";

export const BASE_URL = "http://localhost:3001";

// Helper to handle fetch responses and throw full API error
function checkResponse(res) {
  return res.json().then((data) => {
    if (res.ok) return data;
    throw data; // throw full API error object
  });
}

export const register = ({ name, email, password, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name, // <-- map `username` to `name` for backend
      email,
      password,
      avatar,
    }),
  }).then(checkResponse);
};

export const login = async ({ email, password }) => {
  const data = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

  setToken(data.jwt); // store JWT
  return data;
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // send JWT
    },
  }).then(checkResponse);
};
export const updateUser = async (data, token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};
