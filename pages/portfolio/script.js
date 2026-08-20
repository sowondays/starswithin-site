/**
 * starswithin - JavaScript específico da página de portfólio
 *
 * Código base compartilhado está em ../../assets/js/main.js
 *
 * Este arquivo contém apenas:
 *   - openExpandModal: abre imagem da galeria em modal de ampliação
 *   - Navegação entre imagens da galeria (setas: ‹ › e teclado ← →)
 *   - Fechamento do modal de expansão (click fora, ESC, botão fechar)
 */

// Estado global da galeria de expansão
let expandImages = [];
let expandCurrentIndex = 0;

// Abrir imagem em modal de expansão
function openExpandModal(img) {
    const modal = document.getElementById('image-expand-modal');
    const expandImg = document.getElementById('expand-image');
    if (modal && expandImg) {
        // Coletar todas as imagens da galeria dentro do mesmo modal pai
        const modalGallery = img.closest('.modal-gallery');
        if (modalGallery) {
            expandImages = Array.from(modalGallery.querySelectorAll('.gallery-item'));
            expandCurrentIndex = expandImages.indexOf(img);
        }

        const src = img.getAttribute('data-original-src') || img.src;
        expandImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateExpandArrows();
    }
}

// Atualiza o estado (disabled) das setas de navegação
function updateExpandArrows() {
    const prevBtn = document.querySelector('.expand-prev');
    const nextBtn = document.querySelector('.expand-next');
    if (prevBtn) prevBtn.disabled = expandCurrentIndex === 0;
    if (nextBtn) nextBtn.disabled = expandCurrentIndex === expandImages.length - 1;
}

// Navegar entre imagens da galeria
function navigateExpand(direction) {
    const newIndex = expandCurrentIndex + direction;
    if (newIndex < 0 || newIndex >= expandImages.length) return;
    expandCurrentIndex = newIndex;
    const expandImg = document.getElementById('expand-image');
    const src = expandImages[expandCurrentIndex].getAttribute('data-original-src') || expandImages[expandCurrentIndex].src;
    expandImg.src = src;
    updateExpandArrows();
}

// Fechar modal de expansão
document.addEventListener('DOMContentLoaded', function() {
    const expandModal = document.getElementById('image-expand-modal');
    const expandClose = expandModal?.querySelector('.expand-close');
    const prevBtn = document.querySelector('.expand-prev');
    const nextBtn = document.querySelector('.expand-next');

    if (expandClose) {
        expandClose.addEventListener('click', function() {
            expandModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Navegação com setas
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateExpand(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateExpand(1);
        });
    }

    // Fechar ao clicar fora da imagem
    if (expandModal) {
        expandModal.addEventListener('click', function(e) {
            if (e.target === expandModal || e.target.classList.contains('expand-image')) {
                expandModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Fechar com ESC; navegar com ← →
    document.addEventListener('keydown', function(e) {
        if (!expandModal || !expandModal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            expandModal.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            navigateExpand(-1);
        } else if (e.key === 'ArrowRight') {
            navigateExpand(1);
        }
    });
});
