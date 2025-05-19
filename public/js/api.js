const API_BASE_URL = '/api';

export async function searchProducts(query) {
  const res = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}