const baseUrl = "http://localhost:3001";
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

export const addItem = async (item) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return checkResponse(res);
};

export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return checkResponse(res);
};
