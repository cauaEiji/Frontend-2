const API_TOKEN = '24794269899724';

async function fetchIPInfo(ip = '') {
  const base = ip
    ? `https://ipinfo.io/${ip}/json`
    : `https://ipinfo.io/json`;
  const url = API_TOKEN ? `${base}?token=${API_TOKEN}` : base;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('IP não encontrado ou inválido.');
  }

  const data = await response.json();

  if (data.bogon) {
    throw new Error('Este é um IP reservado/privado e não possui informações públicas.');
  }

  return data;
}
