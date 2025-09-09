/*const baseUrl = "http://localhost:3001";
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}
export { getItems };
*/
const baseUrl = "http://localhost:3001"; // ✅ Previously you had baseUrl including /items

// ✅ GET all items
export const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`);
  if (!res.ok) throw new Error(`Error fetching items: ${res.status}`);
  return res.json();
};

// ✅ POST a new item with Content-Type header
export const addItem = async (item) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ Needed to properly send JSON
    },
    body: JSON.stringify(item), // ✅ Previously body was stringified but header may have been missing
  });

  if (!res.ok) throw new Error(`Error adding item: ${res.status}`);
  return res.json();
};

// ✅ DELETE an item by ID
export const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE", // ✅ Use DELETE method
    headers: {
      "Content-Type": "application/json", // ✅ Optional for DELETE, but consistent
    },
  });

  if (!res.ok) throw new Error(`Error deleting item: ${res.status}`);
  return true;
};
