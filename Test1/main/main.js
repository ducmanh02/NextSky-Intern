function toggleHomeModal() {
    const modal = document.querySelector('.header-home-hover-modal');
    modal.classList.toggle('show');

  }
  function toggleShopModal() {
    const modal = document.querySelector('.header-shop-hover-modal');
    modal.classList.toggle('show');

  }

  function toggleMinicart() {
    const minicart = document.querySelector('.minicart');
    const overlay = document.querySelector('.overlay');
    minicart.classList.toggle('show');
    overlay.classList.toggle('show');
  }