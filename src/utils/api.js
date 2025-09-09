const baseUrl = "http://localhost:3001";

export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  if (!res.ok) throw new Error(`Error fetching items: ${res.status}`);
  return res.json();
};

export const addItem = async (item) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) throw new Error(`Error adding item: ${res.status}`);
  return res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Error deleting item: ${res.status}`);
  return true;
};
