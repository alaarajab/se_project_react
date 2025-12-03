import { getToken, setToken, removeToken } from "./token";
import { checkResponse, baseUrl } from "./api";

export const register = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      avatar,
    }),
  }).then(checkResponse);
};

export const login = async ({ email, password }) => {
  const data = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

  setToken(data.jwt); // store JWT
  return data;
};

export const logout = () => {
  removeToken();
};

export const checkToken = () => {
  const token = getToken();
  if (!token) return Promise.reject("No token found");

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // send JWT
    },
  }).then(checkResponse);
};
export const updateUser = async (data, token) => {
  const res = await fetch(`${baseUrl}/users/me`, {
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
