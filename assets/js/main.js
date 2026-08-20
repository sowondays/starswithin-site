/**
 * starswithin - JavaScript Base (compartilhado entre todas as páginas)
 *
 * Este arquivo contém todas as funcionalidades comuns a todo o site:
 *   - Navegação (link ativo, highlight da URL atual)
 *   - Modais de conteúdo (abrir/fechar, backdrop, ESC)
 *   - Tema claro/escuro (persiste em localStorage)
 *   - Menu Iniciar estilo taskbar
 *   - Tratamento de mídia ausente (graceful degradation)
 *   - Placeholder para cards sem imagem
 *   - Preloader
 *   - Scroll reveal (IntersectionObserver)
 *   - Smooth scroll
 *   - Back to top
 *
 * Cada página mantém seu próprio script.js com apenas as
 * functionalidades específicas (ex.: galeria de imagens, modals de portfólio).
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // ATIVAR LINK ATIVO NO MENU
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ============================================
    // FUNÇÃO PARA ATIVAR O LINK ATUAL BASEADO NA URL
    // ============================================
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === linkHref) ||
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    setActiveLink();

    // ============================================
    // MODAIS
    // ============================================
    const modalTriggers = document.querySelectorAll('.project-card');
    const closeButtons = document.querySelectorAll('.close');

    function openModal(modal) {
        if (modal.classList.contains('active')) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const close = modal.querySelector('.close');
        if (close) close.focus();
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Expose closeModal globally for Start Menu modal
    window.closeModal = closeModal;

    modalTriggers.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.tool-tag, .type-tag')) return;
            const modalId = this.getAttribute('data-modal');
            const modal = modalId ? document.getElementById(modalId) : null;
            if (modal) openModal(modal);
        });
    });

    document.querySelectorAll('.view-project[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById(this.getAttribute('data-modal'));
            if (modal) openModal(modal);
        });
    });

    // Fechar modal ao clicar fora do conteúdo (backdrop)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains('active')) {
            closeModal(e.target);
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // ============================================
    // TRATAR MÍDIA AUSENTE NOS MODAIS
    // ============================================
    function removeMissingMedia() {
        const mediaEls = document.querySelectorAll('.modal img.modal-main-image, .modal img.gallery-item');
        mediaEls.forEach(img => {
            if (img.complete && img.naturalHeight === 0) {
                const parent = img.parentElement;
                if (parent) parent.removeChild(img);
            } else {
                img.onerror = function() {
                    const parent = this.parentElement;
                    if (parent) parent.removeChild(this);
                };
            }
        });
    }
    removeMissingMedia();

    // ============================================
    // FILTRO DE PROJETOS
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    if (filterValue === 'todos' || categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================
    // ANIMAÇÕES DE ROLAGEM (Scroll Reveal)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .timeline-item, .social-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // PRELOADER
    // ============================================
    // Se a página já tem um .preloader em HTML (páginas de subdiretórios),
    // usa-o. Caso contrário (home), cria dinamicamente.
    let preloader = document.querySelector('.preloader');
    if (!preloader) {
        preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<img class="loading-star" src="assets/images/SW-MainStar.svg" alt="" aria-hidden="true">';
        document.body.prepend(preloader);
    }
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });
});

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Texto copiado para a área de transferência');
    }).catch(function(err) {
        console.error('Erro ao copiar: ', err);
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// THEME TOGGLE (claro / escuro)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    const initial = saved ? saved : 'light';
    root.setAttribute('data-theme', initial);

    if (toggles.length) {
        toggles.forEach(toggle => toggle.setAttribute('aria-pressed', initial === 'dark'));
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                toggles.forEach(t => t.setAttribute('aria-pressed', next === 'dark'));
            });
        });
    }
});

// ============================================
// MENU INICIAR (Taskbar-style modal)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button, .start-logo');
    const startModal = document.querySelector('.start-modal');
    const closeModalBtn = document.querySelector('.start-modal-close');

    if (startButton) {
        startButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (startModal) startModal.classList.add('active');
        });
    }

    function closeStartModal() {
        if (startModal) startModal.classList.remove('active');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeStartModal);
    }

    document.addEventListener('click', function(e) {
        if (startModal && !startModal.contains(e.target)) {
            closeStartModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeStartModal();
        }
    });
});

// ============================================
// PLACEHOLDER PARA CARDS SEM IMAGEM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card img').forEach(img => {
        const replace = function() {
            img.onerror = null;
            const card = img.closest('.project-card');
            const title = card.querySelector('.card-overlay h3');
            const ph = document.createElement('div');
            ph.className = 'card-placeholder';
            ph.textContent = title ? title.textContent : 'projeto';
            card.replaceChild(ph, img);
        };
        if (img.complete && img.naturalHeight === 0) {
            replace();
        } else {
            img.onerror = replace;
        }
    });
});

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var mobileNav = document.querySelector('.mobile-nav-overlay');
    var mobileNavClose = document.querySelector('.mobile-nav-close');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var isActive = mobileNav.classList.contains('active');
            mobileNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isActive);
            document.body.style.overflow = isActive ? '' : 'hidden';
        });
    }

    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            !(menuToggle && menuToggle.contains(e.target))) {
            mobileNav.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});
