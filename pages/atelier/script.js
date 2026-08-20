/**
 * starswithin - JavaScript específico da página de ateliê
 *
 * Código base compartilhado está em ../../assets/js/main.js
 *
 * Este arquivo contém apenas:
 *   - Modal de galeria do processo: abrir/expandir imagens e fechar
 */

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');
    const galleryButtons = document.querySelectorAll('.gallery-placeholder');
    const scrollContainer = document.querySelector('.atelier-wrap');

    function isMobile() {
        return window.innerWidth <= 1100;
    }

    function openGalleryModal(btn) {
        if (isMobile()) return;
        const imgSrc = btn.getAttribute('data-img');
        const imgAlt = btn.getAttribute('data-alt');
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modal.classList.add('active');
        if (scrollContainer) scrollContainer.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        modal.classList.remove('active');
        modalImg.src = '';
        if (scrollContainer) scrollContainer.style.overflow = '';
        document.body.style.overflow = '';
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    });
});
