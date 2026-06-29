const STORAGE_KEY = 'ipinfo_favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorite(ipData) {
  const favorites = getFavorites();
  const alreadySaved = favorites.some(f => f.ip === ipData.ip);
  if (alreadySaved) return;
  favorites.push(ipData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function removeFavorite(ip) {
  const filtered = getFavorites().filter(f => f.ip !== ip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function isFavorite(ip) {
  return getFavorites().some(f => f.ip === ip);
}
