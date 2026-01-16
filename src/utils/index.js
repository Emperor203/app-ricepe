export async function fetchRecipes(query) {
  if (!query) return [];

  const url = new URL('https://www.themealdb.com/api/json/v1/1/search.php');
  url.searchParams.append('s', query); // TheMealDB expects 's' for search by name

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Ошибка при загрузке рецептов');

  const data = await response.json();
  return data.meals || [];
}

export async function fetchRecipe(id) {
  if (!id) return null;

  const url = new URL('https://www.themealdb.com/api/json/v1/1/lookup.php');
  url.searchParams.append('i', id); 

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('Ошибка при загрузке рецепта');

  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}