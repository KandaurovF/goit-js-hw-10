const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'api_key=live_ieCJZsHZ4DlUOID07wVYoEt27yy9H3n85oU4rzTtF1V2k1jfYMXGGBVjcBEqkvbJ';

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
