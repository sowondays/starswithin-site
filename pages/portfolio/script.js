/**
 * starswithin - JavaScript específico da página de portfólio
 *
 * Código base compartilhado está em ../../assets/js/main.js
 *
 * Este arquivo contém apenas:
 *   - openExpandModal: abre imagem da galeria em modal de ampliação
 *   - Fechamento do modal de expansão (click fora, ESC, botão fechar)
 */

// Abrir imagem em modal de expansão
function openExpandModal(img) {
    const modal = document.getElementById('image-expand-modal');
    const expandImg = document.getElementById('expand-image');
    if (modal && expandImg) {
        const src = img.getAttribute('data-original-src') || img.src;
        expandImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fechar modal de expansão
document.addEventListener('DOMContentLoaded', function() {
    const expandModal = document.getElementById('image-expand-modal');
    const expandClose = expandModal?.querySelector('.expand-close');

    if (expandClose) {
        expandClose.addEventListener('click', function() {
            expandModal.classList.remove('active');
            document.body.style.overflow = '';
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

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && expandModal && expandModal.classList.contains('active')) {
            expandModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
