//Función encargada de hacer la peticion a la API de Random Users


export async function fetchUsers() {
  const response = await fetch(`https://randomuser.me/api/?results=10`);
  if (!response.ok) throw new Error("Error fetching users");
  return await response.json();
}