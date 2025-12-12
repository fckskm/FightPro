document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('img'));

  if (!images.length) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" type="button" aria-label="Закрыть изображение">&times;</button>
      <img class="lightbox-image" alt="" />
    </div>
  `;

  document.body.appendChild(overlay);

  const lightboxImage = overlay.querySelector('.lightbox-image');
  const closeButton = overlay.querySelector('.lightbox-close');

  const openLightbox = (img) => {
    const fullSrc = img.getAttribute('data-full') || img.currentSrc || img.src;
    lightboxImage.src = fullSrc;
    lightboxImage.alt = img.alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    overlay.classList.remove('is-open');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
  };

  closeButton.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  images.forEach((img) => {
    img.classList.add('lightbox-trigger');

    img.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(img);
    });

    const parentLink = img.closest('a');
    if (parentLink) {
      parentLink.addEventListener('click', (event) => {
        event.preventDefault();
      });
      parentLink.style.cursor = 'zoom-in';
    }
  });
});
