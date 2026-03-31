/**
 * controller.js - Lógica de Interação e Controle de Fluxo
 * Recebe dados da tela, atualiza o HTML e comunica-se com db.js
 */

import { db } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicialização
    await db.open();
    lucide.createIcons();
    await inicializarInterface();

    // --- ELEMENTOS DO DOM ---
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const toastContainer = document.getElementById('toast-container');
    const modalOverlay = document.getElementById('modalOverlay');

    // --- 2. GERENCIAMENTO DE INTERFACE (UI) ---

    async function inicializarInterface() {
        await atualizarSelectFeiras();
        await atualizarSelectProjetos();
        await renderizarRanking();
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        let iconName = type === 'success' ? 'check-circle' : (type === 'warning' ? 'alert-triangle' : 'x-circle');
        toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);
        lucide.createIcons();
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- 3. ATUALIZAÇÃO DE COMPONENTES DINÂMICOS ---

    async function atualizarSelectFeiras() {
        const select = document.getElementById('selecao-feira');
        if (!select) return;
        const feiras = await db.getAll('feiras');
        select.innerHTML = '<option value="">Selecione uma feira...</option>' + 
            feiras.map(f => `<option value="${f.id}">${f.nome}</option>`).join('');
    }

    async function atualizarSelectProjetos() {
        const select = document.getElementById('selecao-projeto');
        if (!select) return;
        const projetos = await db.getAll('projetos');
        select.innerHTML = '<option value="">Selecione um projeto...</option>' + 
            projetos.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
    }

    async function renderizarRanking() {
        const tbody = document.querySelector('#tabela-ranking tbody');
        const emptyState = document.getElementById('empty-state');
        const projetos = await db.getAll('projetos');

        if (projetos.length === 0) {
            emptyState.style.display = 'table-row';
            tbody.querySelectorAll('tr:not(#empty-state)').forEach(tr => tr.remove());
            return;
        }

        emptyState.style.display = 'none';
        
        // Ordena por nota decrescente
        const sorted = projetos.sort((a, b) => (b.notaFinal || 0) - (a.notaFinal || 0));
        
        const rowsHtml = sorted.map((p, index) => `
            <tr>
                <td>${index + 1}º</td>
                <td>${p.nome}</td>
                <td>${p.notaFinal ? p.notaFinal.toFixed(1) : '---'}</td>
                <td class="${p.notaFinal >= 7 ? 'status-success' : 'status-warning'}">
                    ${p.notaFinal >= 7 ? 'Classificado' : 'Em Revisão'}
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('tr:not(#empty-state)').forEach(tr => tr.remove());
        tbody.insertAdjacentHTML('beforeend', rowsHtml);
        lucide.createIcons();
    }

    // --- 4. HANDLERS DE FORMULÁRIOS ---

    // 4.1 Gestão de Feiras
    document.getElementById('form-feira').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const feira = {
            nome: formData.get('nome-feira'),
            descricao: formData.get('descricao-feira'),
            dataInicio: formData.get('data-inicio-inscricoes'),
            dataFim: formData.get('data-fim-inscricoes'),
            estado: formData.get('estado')
        };

        try {
            await db.add('feiras', feira);
            showToast('Feira cadastrada com sucesso!');
            e.target.reset();
            await atualizarSelectFeiras();
        } catch (err) {
            showToast('Erro ao salvar feira.', 'error');
        }
    });

    // 4.2 Submissão de Projetos
    document.getElementById('form-projeto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        
        const saveProject = async () => {
            const formData = new FormData(e.target);
            const projeto = {
                nome: formData.get('nome-projeto'),
                feiraId: parseInt(formData.get('feiraId')),
                resumo: formData.get('resumo'),
                notaFinal: 0,
                status: 'Pendente'
            };

            try {
                btn.classList.add('btn-loading');
                await db.add('projetos', projeto);
                setTimeout(async () => {
                    btn.classList.remove('btn-loading');
                    showToast('Projeto submetido com sucesso!');
                    e.target.reset();
                    document.getElementById('file-info').style.display = 'none';
                    await atualizarSelectProjetos();
                    await renderizarRanking();
                }, 1000);
            } catch (err) {
                showToast('Erro ao submeter projeto.', 'error');
                btn.classList.remove('btn-loading');
            }
        };

        const confirmMsg = btn.dataset.confirm;
        document.getElementById('modalTitle').textContent = 'Confirmar Submissão';
        document.getElementById('modalMessage').textContent = confirmMsg;
        modalOverlay.style.display = 'flex';
        
        document.getElementById('modalConfirm').onclick = () => {
            modalOverlay.style.display = 'none';
            saveProject();
        };
    });

    // 4.3 Avaliação
    document.getElementById('form-avaliacao').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const projetoId = parseInt(formData.get('projetoId'));
        const nota = parseFloat(formData.get('nota-criterio1'));

        try {
            // Salva a avaliação
            await db.add('avaliacoes', { projetoId, nota });
            
            // Atualiza a nota do projeto (simplificado: pegando a última nota)
            const projetos = await db.getAll('projetos');
            const projeto = projetos.find(p => p.id === projetoId);
            projeto.notaFinal = nota;
            await db.update('projetos', projeto);

            showToast('Avaliação enviada com sucesso!');
            e.target.reset();
            document.getElementById('valor-nota').textContent = '5.0';
            await renderizarRanking();
        } catch (err) {
            showToast('Erro ao processar avaliação.', 'error');
        }
    });

    // --- 5. UTILITÁRIOS E UI (CONSERVAR DO SCRIPT.JS) ---
    
    // Toggle Sidebar
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });

    document.getElementById('sidebarClose').addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });

    document.getElementById('modalCancel').addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    // Contadores de Caracteres
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        const counter = document.querySelector(`.char-count[data-for="${textarea.id}"]`);
        textarea.addEventListener('input', () => {
            counter.textContent = `${textarea.value.length} / ${textarea.getAttribute('maxlength')}`;
        });
    });

    // Validação de Datas
    const inputInicio = document.getElementById('data-inicio-inscricoes');
    const inputFim = document.getElementById('data-fim-inscricoes');
    inputInicio.addEventListener('change', () => {
        inputFim.disabled = !inputInicio.value;
        inputFim.min = inputInicio.value;
    });

    // Preview de Arquivo
    document.getElementById('arquivo-pdf').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const fileInfo = document.getElementById('file-info');
        if (file) {
            fileInfo.innerHTML = `<i data-lucide="file-check"></i> <span>${file.name}</span>`;
            fileInfo.style.display = 'flex';
            lucide.createIcons();
        }
    });

    // Slider Nota
    document.getElementById('nota-criterio1').addEventListener('input', (e) => {
        document.getElementById('valor-nota').textContent = parseFloat(e.target.value).toFixed(1);
    });
});
