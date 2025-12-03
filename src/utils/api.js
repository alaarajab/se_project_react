export const baseUrl = "http://localhost:3001";
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return checkResponse(res);
};

export const addItem = async (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItem = async (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
export const addCardLike = async (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
export const removeCardLike = async (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
export const updateUser = async ({ name, avatar }) => {
  const token = localStorage.getItem("jwt"); // get JWT token

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH", // PATCH to update partial fields
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`, // send JWT in header
    },
    body: JSON.stringify({ name, avatar }), // updated data
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user"); //handle errors
  }

  return res.json(); // ✅ return updated user
};
