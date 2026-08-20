/**
 * starswithin - JavaScript específico da página de ateliê
 *
 * Código base compartilhado está em ../../assets/js/main.js
 *
 * Este arquivo contém apenas:
 *   - Modal de galeria do processo: abrir/expandir imagens e fechar
 *   - Navegação entre imagens da galeria (setas: ‹ › e teclado ← →, desktop)
 */
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');
    const galleryButtons = document.querySelectorAll('.gallery-placeholder');
    const scrollContainer = document.querySelector('.atelier-wrap');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    // Estado da galeria (usado apenas no desktop)
    let currentImageIndex = 0;

    function isMobile() {
        return window.innerWidth <= 1100;
    }

    function openGalleryModal(btn) {
        if (isMobile()) return;
        const imgSrc = btn.getAttribute('data-img');
        const imgAlt = btn.getAttribute('data-alt');
        currentImageIndex = Array.from(galleryButtons).indexOf(btn);
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modal.classList.add('active');
        if (scrollContainer) scrollContainer.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        updateNavArrows();
    }

    function closeGalleryModal() {
        modal.classList.remove('active');
        modalImg.src = '';
        if (scrollContainer) scrollContainer.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Atualiza o estado (disabled) das setas de navegação
    function updateNavArrows() {
        if (!prevBtn || !nextBtn) return;
        const total = galleryButtons.length;
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === total - 1;
    }

    // Navegar entre imagens da galeria (desktop apenas)
    function navigateGallery(direction) {
        if (isMobile()) return;
        const newIndex = currentImageIndex + direction;
        if (newIndex < 0 || newIndex >= galleryButtons.length) return;
        currentImageIndex = newIndex;
        const btn = galleryButtons[currentImageIndex];
        modalImg.src = btn.getAttribute('data-img');
        modalImg.alt = btn.getAttribute('data-alt');
        updateNavArrows();
    }

    galleryButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            openGalleryModal(this);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeGalleryModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }

    // Navegação com setas
    if (prevBtn) {
        prevBtn.addEventListener('click', function() { navigateGallery(-1); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() { navigateGallery(1); });
    }

    // Teclado: ESC fecha; ← → navega (desktop apenas)
    document.addEventListener('keydown', function(e) {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (!isMobile()) {
            if (e.key === 'ArrowLeft') navigateGallery(-1);
            if (e.key === 'ArrowRight') navigateGallery(1);
        }
    });
});
