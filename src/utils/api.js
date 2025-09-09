/*const baseUrl = "http://localhost:3001";
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}
export { getItems };
*/
const baseUrl = "http://localhost:3001";

// ✅ GET all items
export const getItems = async () => {
  const response = await fetch(`${baseUrl}/items`);
  if (!response.ok) throw new Error(`Error fetching items: ${response.status}`);
  return response.json();
};

// ✅ POST a new item
export const addItem = async (newItem) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) throw new Error(`Error adding item: ${response.status}`);
  return response.json();
};

// ✅ DELETE an item by ID
export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/items/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Error deleting item: ${response.status}`);
  return true;
};
