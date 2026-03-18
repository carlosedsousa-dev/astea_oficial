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
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconName = 'check-circle';
        if (type === 'warning') iconName = 'alert-triangle';
        if (type === 'error') iconName = 'x-circle';

        toast.innerHTML = `
            <i data-lucide="${iconName}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- 4. NOVAS FUNCIONALIDADES DE UX ---

    // 4.1 Contadores de Caracteres
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        const counter = document.querySelector(`.char-count[data-for="${textarea.id}"]`);
        if (counter) {
            textarea.addEventListener('input', () => {
                const current = textarea.value.length;
                const max = textarea.getAttribute('maxlength');
                counter.textContent = `${current} / ${max}`;
                counter.classList.toggle('limit', current >= max * 0.9);
            });
        }
    });

    // 4.2 Validação de Datas
    const inputInicio = document.getElementById('data-inicio-inscricoes');
    const inputFim = document.getElementById('data-fim-inscricoes');

    if (inputInicio && inputFim) {
        inputInicio.addEventListener('change', () => {
            inputFim.disabled = !inputInicio.value;
            inputFim.min = inputInicio.value;
            if (inputFim.value && inputFim.value < inputInicio.value) {
                inputFim.value = '';
                showToast('A data de fim foi resetada pois era anterior ao início.', 'warning');
            }
        });
    }

    // 4.3 Preview de Upload de Arquivo
    const inputFile = document.getElementById('arquivo-pdf');
    const fileInfo = document.getElementById('file-info');

    if (inputFile && fileInfo) {
        inputFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const size = (file.size / 1024 / 1024).toFixed(2);
                fileInfo.innerHTML = `<i data-lucide="file-check"></i> <span>${file.name} (${size} MB)</span>`;
                fileInfo.style.display = 'flex';
                lucide.createIcons();
            } else {
                fileInfo.style.display = 'none';
            }
        });
    }

    // 4.4 Slider de Avaliação
    const sliderNota = document.getElementById('nota-criterio1');
    const valorNota = document.getElementById('valor-nota');

    if (sliderNota && valorNota) {
        sliderNota.addEventListener('input', (e) => {
            valorNota.textContent = parseFloat(e.target.value).toFixed(1);
        });
    }

    // 4.5 Ordenação de Tabela
    document.querySelectorAll('th.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const index = Array.from(header.parentElement.children).indexOf(header);
            const type = header.dataset.sort;
            const isAscending = header.classList.contains('asc');

            // Reset headers
            table.querySelectorAll('th').forEach(th => {
                th.classList.remove('asc', 'desc');
                const icon = th.querySelector('i');
                if (icon) icon.setAttribute('data-lucide', 'chevrons-up-down');
            });

            const rows = Array.from(tbody.querySelectorAll('tr:not(#empty-state)'));
            const sortedRows = rows.sort((a, b) => {
                let valA = a.children[index].textContent.trim();
                let valB = b.children[index].textContent.trim();

                if (type === 'number') {
                    valA = parseFloat(valA.replace(/[^\d.-]/g, ''));
                    valB = parseFloat(valB.replace(/[^\d.-]/g, ''));
                }

                if (valA < valB) return isAscending ? 1 : -1;
                if (valA > valB) return isAscending ? -1 : 1;
                return 0;
            });

            header.classList.toggle('asc', !isAscending);
            header.classList.toggle('desc', isAscending);
            const newIcon = header.querySelector('i');
            newIcon.setAttribute('data-lucide', isAscending ? 'chevron-down' : 'chevron-up');
            
            tbody.append(...sortedRows);
            lucide.createIcons();
        });
    });

    // 4.6 Modal de Confirmação e Loading
    const modalOverlay = document.getElementById('modalOverlay');
    const modalConfirmBtn = document.getElementById('modalConfirm');
    const modalCancelBtn = document.getElementById('modalCancel');
    let pendingForm = null;

    function showModal(title, message, onConfirm) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        modalOverlay.style.display = 'flex';
        modalConfirmBtn.onclick = () => {
            modalOverlay.style.display = 'none';
            onConfirm();
        };
    }

    modalCancelBtn.addEventListener('click', () => modalOverlay.style.display = 'none');

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const confirmMsg = submitBtn.dataset.confirm;

            const executeSubmit = () => {
                submitBtn.classList.add('btn-loading');
                submitBtn.disabled = true;

                // Simula processamento de 1.5s
                setTimeout(() => {
                    submitBtn.classList.remove('btn-loading');
                    submitBtn.disabled = false;
                    showToast(`${submitBtn.innerText} realizado com sucesso!`, 'success');
                    form.reset();
                    if (fileInfo) fileInfo.style.display = 'none';
                    if (valorNota) valorNota.textContent = '5.0';
                }, 1500);
            };

            if (confirmMsg) {
                showModal('Confirmar Submissão', confirmMsg, executeSubmit);
            } else {
                executeSubmit();
            }
        });
    });

    // 4.7 Notification Drawer
    const btnNotif = document.getElementById('btn-notifications');
    const drawer = document.getElementById('notificationDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');

    const toggleDrawer = () => {
        const isOpen = drawer.classList.toggle('open');
        drawerOverlay.style.display = isOpen ? 'block' : 'none';
    };

    if (btnNotif) btnNotif.addEventListener('click', toggleDrawer);
    if (drawerClose) drawerClose.addEventListener('click', toggleDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleDrawer);

    // --- 5. FILTRO DE BUSCA NA TABELA (COM EMPTY STATE) ---
    if (inputBusca && tabelaRanking) {
        inputBusca.addEventListener('input', () => {
            const termo = inputBusca.value.toLowerCase();
            const linhas = tabelaRanking.querySelectorAll('tbody tr:not(#empty-state)');
            const emptyState = document.getElementById('empty-state');
            let encontrou = false;

            linhas.forEach(linha => {
                const nomeProjeto = linha.cells[1].textContent.toLowerCase();
                const matches = nomeProjeto.includes(termo);
                linha.style.display = matches ? '' : 'none';
                if (matches) encontrou = true;
            });

            emptyState.style.display = encontrou ? 'none' : 'table-row';
        });
    }

    // --- 6. SKELETON SCREENS (SIMULAÇÃO INICIAL) ---
    const allSections = document.querySelectorAll('section > *');
    allSections.forEach(el => el.classList.add('skeleton'));

    setTimeout(() => {
        allSections.forEach(el => el.classList.remove('skeleton'));
    }, 1200);

    // --- 7. SCROLLSPY (MANTER EXISTENTE) ---
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
