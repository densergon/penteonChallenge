//Función encargada de hacer la peticion a la API de catFacts


export async function fetchCatFacts(pageParam:number) {
  const response = await fetch(`https://catfact.ninja/facts?limit=${pageParam}`);
  if (!response.ok) throw new Error("Error fetching cat facts");
  return await response.json();
}