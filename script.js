/**
 * Astea - Interatividade do Sistema
 * Funcionalidades: Toast, Filtro de Tabela e ScrollSpy
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialização de Ícones (Lucide)
    lucide.createIcons();

    // --- ELEMENTOS DO DOM ---
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuLinks = document.querySelectorAll('.sidebar nav ul li a');
    const sections = document.querySelectorAll('main section');
    const toastContainer = document.getElementById('toast-container');
    const inputBusca = document.getElementById('busca-projeto');
    const tabelaRanking = document.getElementById('tabela-ranking');

    // --- 2. LOGICA MENU MOBILE (TOGGLE & OVERLAY) ---
    function toggleSidebar() {
        const isOpened = sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open', isOpened);
        
        // Atualiza acessibilidade
        mobileToggle.setAttribute('aria-expanded', isOpened);
        
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
        lucide.createIcons();

        // Evita que o fundo do site role enquanto o menu está aberto
        document.body.style.overflow = isOpened ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', toggleSidebar);

    if (sidebarClose) {
        sidebarClose.addEventListener('click', toggleSidebar);
    }

    // Fechar ao clicar no fundo escuro
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // --- 3. SISTEMA DE NOTIFICAÇÕES (TOASTS) ---
    /**
     * @param {string} message Mensagem a ser exibida
     * @param {string} type 'success', 'warning' ou 'error'
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Define o ícone baseado no tipo
        let iconName = 'check-circle';
        if (type === 'warning') iconName = 'alert-triangle';
        if (type === 'error') iconName = 'x-circle';

        toast.innerHTML = `
            <i data-lucide="${iconName}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        lucide.createIcons(); // Atualiza ícones dinâmicos

        // Remove o toast após 4 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Intercepta envios de formulário para mostrar o Toast
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnText = form.querySelector('button').innerText;
            showToast(`${btnText} realizado com sucesso!`, 'success');
            form.reset(); // Limpa o formulário após sucesso
        });
    });

    // --- 4. FILTRO DE BUSCA NA TABELA ---
    if (inputBusca && tabelaRanking) {
        inputBusca.addEventListener('input', () => {
            const termo = inputBusca.value.toLowerCase();
            const linhas = tabelaRanking.querySelectorAll('tbody tr');

            linhas.forEach(linha => {
                const nomeProjeto = linha.cells[1].textContent.toLowerCase();
                // Mostra se o nome incluir o termo ou se o termo estiver vazio
                linha.style.display = nomeProjeto.includes(termo) ? '' : 'none';
            });
        });
    }

    // --- 5. SCROLLSPY (DESTAQUE AUTOMÁTICO DO MENU) ---
    const observerOptions = {
        root: null,
        // Detecta quando a seção entra no topo 30% da tela
        rootMargin: '-10% 0px -70% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                atualizarMenuAtivo(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Função auxiliar para atualizar a classe active
    function atualizarMenuAtivo(idSecao) {
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${idSecao}`) {
                link.classList.add('active');
            }
        });
    }

    // Gerencia cliques nos links para ativação imediata e fechamento do menu mobile
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').substring(1);
            atualizarMenuAtivo(id);

            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        });
    });

    // Destaque inicial baseado na URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        atualizarMenuAtivo(hash);
    }

    // Correção para o final da página (garante que o último item ative)
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
            const ultimaSecao = sections[sections.length - 1];
            atualizarMenuAtivo(ultimaSecao.getAttribute('id'));
        }
    });
});
