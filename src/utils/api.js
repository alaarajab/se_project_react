const baseUrl = "http://localhost:3001";

// GET all items
export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  if (!res.ok) throw new Error(`Error fetching items: ${res.status}`);
  return res.json();
};

// POST a new item with Content-Type header
export const addItem = async (item) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Needed to properly send JSON
    },
    body: JSON.stringify(item),
    g,
  });

  if (!res.ok) throw new Error(`Error adding item: ${res.status}`);
  return res.json();
};

//DELETE an item by ID
export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Optional for DELETE, but consistent
    },
  });

  if (!res.ok) throw new Error(`Error deleting item: ${res.status}`);
  return true;
};
