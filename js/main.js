let currentData = null;

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', open);
  });

  const qrPopup = document.querySelector('.chr-home-qr-popup');
  const arrowTab = document.querySelector('.arrow-tab');

  arrowTab.addEventListener('click', (e) => {
    e.stopPropagation();
    qrPopup.classList.toggle('chr-home-qr-popup--collapsed');
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  const btnSearch = document.getElementById('btn-search');
  const btnDetect = document.getElementById('btn-detect');
  const btnFavorite = document.getElementById('btn-favorite');
  const ipInput = document.getElementById('ip-input');
  const favoritesList = document.getElementById('favorites-list');

  renderFavorites(getFavorites());

  async function handleSearch(ip) {
    clearError();
    const activeBtn = ip ? btnSearch : btnDetect;
    showLoading(activeBtn);
    try {
      const data = await fetchIPInfo(ip);
      currentData = data;
      renderResults(data);
      setFavoriteButtonState(data.ip);
    } catch (e) {
      showError(e.message || 'Ocorreu um erro ao buscar o IP.');
    } finally {
      hideLoading(activeBtn);
    }
  }

  btnSearch.addEventListener('click', () => {
    const ip = ipInput.value.trim();
    if (!ip) {
      showError('Por favor, informe um endereço IP.');
      return;
    }
    if (ip.length < 3) {
      showError('O endereço IP deve ter pelo menos 3 caracteres.');
      return;
    }
    handleSearch(ip);
  });

  ipInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnSearch.click();
  });

  btnDetect.addEventListener('click', () => {
    handleSearch('');
  });

  btnFavorite.addEventListener('click', () => {
    if (!currentData) return;
    saveFavorite(currentData);
    renderFavorites(getFavorites());
    setFavoriteButtonState(currentData.ip);
  });

  favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      const ip = e.target.dataset.ip;
      removeFavorite(ip);
      renderFavorites(getFavorites());
      if (currentData && currentData.ip === ip) {
        setFavoriteButtonState(ip);
      }
    }
  });
});
