function showError(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.hidden = false;
}

function clearError() {
  const el = document.getElementById('error-msg');
  el.textContent = '';
  el.hidden = true;
}

function renderResults(data) {
  document.getElementById('res-ip').textContent       = data.ip        || '—';
  document.getElementById('res-city').textContent     = data.city      || '—';
  document.getElementById('res-region').textContent   = data.region    || '—';
  document.getElementById('res-country').textContent  = data.country   || '—';
  document.getElementById('res-loc').textContent      = data.loc       || '—';
  document.getElementById('res-org').textContent      = data.org       || '—';
  document.getElementById('res-timezone').textContent = data.timezone  || '—';

  document.getElementById('results-card').hidden = false;
}

function setFavoriteButtonState(ip) {
  const btn = document.getElementById('btn-favorite');
  if (isFavorite(ip)) {
    btn.textContent = 'Já está nos Favoritos';
    btn.disabled = true;
    btn.classList.add('btn-favorite--saved');
  } else {
    btn.textContent = 'Adicionar aos Favoritos';
    btn.disabled = false;
    btn.classList.remove('btn-favorite--saved');
  }
}

function renderFavorites(list) {
  const section = document.getElementById('favorites-section');
  const ul = document.getElementById('favorites-list');

  ul.innerHTML = '';

  if (list.length === 0) {
    section.hidden = true;
    return;
  }

  list.forEach(item => {
    const li = document.createElement('li');
    li.className = 'favorite-item';
    li.innerHTML = `
      <div class="favorite-info">
        <span class="favorite-ip">${item.ip}</span>
        <span class="favorite-detail">${[item.city, item.region, item.country].filter(Boolean).join(', ')}</span>
      </div>
      <button class="btn-remove" data-ip="${item.ip}">Remover</button>
    `;
    ul.appendChild(li);
  });

  section.hidden = false;
}

function showLoading(btn, loadingText = 'Buscando...') {
  btn.disabled = true;
  btn.dataset.originalText = btn.textContent;
  btn.textContent = loadingText;
}

function hideLoading(btn) {
  btn.disabled = false;
  btn.textContent = btn.dataset.originalText || btn.textContent;
}
