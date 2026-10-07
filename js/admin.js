/* =========================================================
   PS4 Games Library - Painel Administrativo + Autenticação
   Protegido por senha. Dados persistentes em LocalStorage.
   ========================================================= */

const ADMIN_PASS_KEY = 'ps4games_admin_password';
const ADMIN_SESSION_KEY = 'ps4games_admin_session';
const DEFAULT_ADMIN_PASSWORD = 'admin123';

let ADMIN_CURRENT_EDIT_ID = null;
let ADMIN_SEARCH_TERM = '';

/* ================= AUTENTICAÇÃO ================= */

function getAdminPassword() {
    try {
        const stored = localStorage.getItem(ADMIN_PASS_KEY);
        return stored || DEFAULT_ADMIN_PASSWORD;
    } catch (e) {
        return DEFAULT_ADMIN_PASSWORD;
    }
}

function setAdminPassword(newPass) {
    try {
        localStorage.setItem(ADMIN_PASS_KEY, newPass);
        return true;
    } catch (e) {
        return false;
    }
}

function isAdminLoggedIn() {
    try {
        const session = localStorage.getItem(ADMIN_SESSION_KEY);
        if (!session) return false;
        const data = JSON.parse(session);
        if (!data || !data.expires) return false;
        if (Date.now() > data.expires) {
            localStorage.removeItem(ADMIN_SESSION_KEY);
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

function createAdminSession() {
    try {
        const session = {
            loggedAt: Date.now(),
            expires: Date.now() + (1000 * 60 * 60 * 24 * 7)
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
        return true;
    } catch (e) {
        return false;
    }
}

function destroyAdminSession() {
    try {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        return true;
    } catch (e) {
        return false;
    }
}

function initAdminAuth() {
    updatePasswordIndicator();
}

function updatePasswordIndicator() {
    const el = document.getElementById('currentPassIndicator');
    if (!el) return;
    const pass = getAdminPassword();
    const stars = Array(Math.min(pass.length, 12) + 1).join('•');
    el.textContent = stars;
}

function doLogin(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('passwordInput');
    const errorBox = document.getElementById('loginError');
    if (!input) return false;
    const typedPass = input.value;
    const correctPass = getAdminPassword();
    if (typedPass === correctPass) {
        createAdminSession();
        if (errorBox) errorBox.classList.remove('show');
        showAdminContent();
        loadGamesData().then(function() {
            initAdminPanel();
        });
        showToast('Login efetuado com sucesso!', 'success');
    } else {
        if (errorBox) errorBox.classList.add('show');
        input.value = '';
        input.focus();
        showToast('Senha incorreta', 'error');
    }
    return false;
}

function doLogout() {
    if (!confirm('Tem a certeza que deseja terminar a sessão?')) return;
    destroyAdminSession();
    showLoginScreen();
    showToast('Sessão terminada', 'info');
}

function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const adminContent = document.getElementById('adminContent');
    const searchBox = document.getElementById('adminSearchBox');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminContent) adminContent.style.display = 'none';
    if (searchBox) searchBox.style.display = 'none';
    const passInput = document.getElementById('passwordInput');
    if (passInput) passInput.value = '';
}

function showAdminContent() {
    const loginScreen = document.getElementById('loginScreen');
    const adminContent = document.getElementById('adminContent');
    const searchBox = document.getElementById('adminSearchBox');
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    if (searchBox) searchBox.style.display = '';
    updatePasswordIndicator();
}

function openChangePassword() {
    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('newPass2').value = '';
    openModal('passwordModal');
}

function saveNewPassword(event) {
    if (event) event.preventDefault();
    const oldVal = document.getElementById('oldPass').value;
    const newVal = document.getElementById('newPass').value;
    const newVal2 = document.getElementById('newPass2').value;

    if (oldVal !== getAdminPassword()) {
        showToast('Senha atual incorreta', 'error');
        return false;
    }
    if (newVal.length < 6) {
        showToast('A nova senha deve ter pelo menos 6 caracteres', 'error');
        return false;
    }
    if (newVal !== newVal2) {
        showToast('As senhas novas não coincidem', 'error');
        return false;
    }
    if (newVal === oldVal) {
        showToast('A nova senha deve ser diferente da atual', 'error');
        return false;
    }
    setAdminPassword(newVal);
    updatePasswordIndicator();
    closeModal('passwordModal');
    showToast('Senha alterada com sucesso!', 'success');
    return false;
}

/* ================= PAINEL ADMIN (CRUD) ================= */

function initAdminPanel() {
    if (!isAdminLoggedIn()) {
        showLoginScreen();
        return;
    }
    renderAdminTable();
    renderBackupsList();
    setupAdminSearch();
}

function switchAdminTab(tabName, btnEl) {
    if (!isAdminLoggedIn()) return;
    const listarSec = document.getElementById('tab-listar');
    const adicionarSec = document.getElementById('tab-adicionar');
    const backupsSec = document.getElementById('tab-backups');
    if (listarSec) listarSec.style.display = (tabName === 'listar' ? 'block' : 'none');
    if (adicionarSec) adicionarSec.style.display = (tabName === 'adicionar' ? 'block' : 'none');
    if (backupsSec) {
        backupsSec.style.display = (tabName === 'backups' ? 'block' : 'none');
        if (tabName === 'backups') renderBackupsList();
    }

    const tabs = document.querySelectorAll('#adminTabs .admin-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    if (btnEl) btnEl.classList.add('active');

    if (tabName === 'adicionar') {
        ADMIN_CURRENT_EDIT_ID = null;
        resetForm();
        document.getElementById('formTitle').innerHTML = '<i class="fas fa-plus"></i> Adicionar Novo Jogo';
        const btn = document.getElementById('formSubmitBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-plus"></i> Adicionar Jogo';
    }
}

function renderBackupsList() {
    const container = document.getElementById('backupsList');
    const totalEl = document.getElementById('totalBackups');
    if (!container) return;
    const backups = listBackups() || [];
    if (totalEl) totalEl.textContent = backups.length;
    if (backups.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-box-open" style="font-size:56px;opacity:0.3;margin-bottom:14px;"></i><h3 style="color:var(--text-secondary);margin-bottom:8px;">Nenhum backup criado ainda</h3><p style="font-size:14px;">Ao editar, adicionar, excluir ou restaurar os dados, os backups serão criados automaticamente aqui (até os últimos 10).</p></div>';
        return;
    }
    let html = '';
    backups.forEach(function(b, idx) {
        const d = b.date;
        const dataStr = d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const horaStr = d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        html += '<div class="backup-card">' +
            '<div class="backup-info">' +
              '<div class="backup-title">' +
                '<i class="fas fa-clock-rotate-left"></i> ' + dataStr + ' <span style="color:var(--text-muted);font-weight:400;">às ' + horaStr + '</span>' +
                (idx === 0 ? ' <span class="backup-badge latest">Mais Recente</span>' : '') +
              '</div>' +
              '<div class="backup-meta">' +
                '<span><i class="fas fa-folder-open"></i> ' + b.count + ' jogo' + (b.count === 1 ? '' : 's') + ' salvo' + (b.count === 1 ? '' : 's') + '</span>' +
                '<span><i class="fas fa-key"></i> ' + b.key + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="backup-actions">' +
              '<button class="table-btn edit" onclick="restoreBackupClick(\'' + b.key + '\')"><i class="fas fa-rotate-left"></i> Restaurar</button>' +
              '<button class="table-btn export" onclick="downloadBackupJSON(\'' + b.key + '\')"><i class="fas fa-download"></i> Exportar</button>' +
              '<button class="table-btn delete" onclick="deleteBackupClick(\'' + b.key + '\')"><i class="fas fa-trash"></i> Apagar</button>' +
            '</div>' +
          '</div>';
    });
    container.innerHTML = html;
}

function restoreBackupClick(key) {
    if (!isAdminLoggedIn()) return;
    const backupList = listBackups() || [];
    const bk = backupList.filter(function(b) { return b.key === key; })[0];
    const qtd = bk ? bk.count : 0;
    if (!confirm('⚠️ ATENÇÃO: RESTAURAR BACKUP\n\nVocê perderá TODOS os jogos cadastrados atualmente e substituirá por este backup com ' + qtd + ' jogo(s) de ' + (bk ? bk.date.toLocaleString('pt-PT') : '') + '.\n\nO estado ATUAL será salvo automaticamente como backup antes de restaurar.\n\nTem certeza absoluta que deseja continuar?')) return;
    createBackup();
    if (restoreBackup(key)) {
        showToast('Backup restaurado com sucesso! Recarregando dados...', 'success');
        setTimeout(function() {
            loadGamesData().then(function() {
                renderAdminTable();
                renderBackupsList();
            });
        }, 600);
    } else {
        showToast('Erro ao restaurar backup', 'error');
    }
}

function deleteBackupClick(key) {
    if (!isAdminLoggedIn()) return;
    if (!confirm('Tem certeza que deseja APAGAR este backup permanentemente?')) return;
    if (deleteBackup(key)) {
        renderBackupsList();
        showToast('Backup apagado', 'success');
    } else {
        showToast('Erro ao apagar backup', 'error');
    }
}

function downloadBackupJSON(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const data = JSON.parse(raw);
        const dateStr = (data && data[0] && data[0].dataPublicacao ? data[0].dataPublicacao : new Date().toISOString().split('T')[0]).replace(/\//g,'-');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'ps4games-backup-' + key.split('_').pop() + '-jogos-' + (data.length) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    } catch (e) {
        showToast('Erro ao exportar backup', 'error');
    }
}

function setupAdminSearch() {
    const input = document.getElementById('adminSearchInput');
    if (!input) return;
    input.addEventListener('input', function() {
        ADMIN_SEARCH_TERM = input.value.trim().toLowerCase();
        renderAdminTable();
    });
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    const totalEl = document.getElementById('totalJogos');
    const games = getAllGames() || [];
    let list = games;
    if (ADMIN_SEARCH_TERM) {
        list = list.filter(function(g) {
            return (g.nome || '').toLowerCase().indexOf(ADMIN_SEARCH_TERM) > -1 ||
                   (g.categoria || '').toLowerCase().indexOf(ADMIN_SEARCH_TERM) > -1;
        });
    }

    if (totalEl) totalEl.textContent = games.length;

    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">' +
            'Nenhum jogo encontrado.' +
            '</td></tr>';
        return;
    }

    let rowsHTML = '';
    list.forEach(function(g) {
        rowsHTML +=
            '<tr>' +
                '<td>' +
                    '<div class="game-cell">' +
                        '<img class="game-thumb" src="' + (g.imagem || '') + '" alt="' + (g.nome || '') + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/48x60/1a1a1a/0055FF?text=-\'">' +
                        '<div>' +
                            '<div style="font-weight: 600;">' + (g.nome || 'Sem nome') + '</div>' +
                            '<small style="color: var(--text-muted);">ID: ' + g.id + '</small>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td>' + (g.categoria || '-') + '</td>' +
                '<td>v' + (g.versao || '1.0') + '</td>' +
                '<td>' + (g.tamanho || '-') + '</td>' +
                '<td style="color: var(--success); font-weight: 600;">' + formatDownloads(g.downloads) + '</td>' +
                '<td>Servidor 1</td>' +
                '<td>' +
                    '<div class="table-actions">' +
                        '<button class="table-btn edit" onclick="editGame(' + g.id + ')">' +
                            '<i class="fas fa-edit"></i> Editar' +
                        '</button>' +
                        '<button class="table-btn delete" onclick="deleteGame(' + g.id + ')">' +
                            '<i class="fas fa-trash"></i> Excluir' +
                        '</button>' +
                    '</div>' +
                '</td>' +
            '</tr>';
    });
    tbody.innerHTML = rowsHTML;
}

function editGame(gameId) {
    if (!isAdminLoggedIn()) return;
    const games = getAllGames() || [];
    const game = games.find(function(g) { return g.id === gameId; });
    if (!game) {
        showToast('Jogo não encontrado', 'error');
        return;
    }

    ADMIN_CURRENT_EDIT_ID = gameId;
    document.getElementById('gameIdInput').value = String(game.id);
    document.getElementById('gameNome').value = game.nome || '';
    document.getElementById('gameCategoria').value = game.categoria || '';
    document.getElementById('gameVersao').value = game.versao || '';
    document.getElementById('gameTamanho').value = game.tamanho || '';
    document.getElementById('gameData').value = game.dataPublicacao || '';
    document.getElementById('gameDownloads').value = game.downloads || 0;
    document.getElementById('gameImagem').value = game.imagem || '';
    document.getElementById('gameBanner').value = game.banner || '';
    document.getElementById('gameLink').value = game.link || '';
    const servidorEl = document.getElementById('gameServidor');
    if (servidorEl) servidorEl.value = 'Servidor 1';
    document.getElementById('gameTrailer').value = game.trailer || '';
    document.getElementById('gameReqEspaco').value = (game.requisitos && game.requisitos.espaco) ? game.requisitos.espaco : '';
    document.getElementById('gameReqFirmware').value = (game.requisitos && game.requisitos.firmware) ? game.requisitos.firmware : '';
    document.getElementById('gameSinopse').value = game.sinopse || '';
    document.getElementById('gameScreenshots').value = (game.screenshots || []).join(', ');

    document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Jogo #' + game.id;
    const btn = document.getElementById('formSubmitBtn');
    if (btn) btn.innerHTML = '<i class="fas fa-check"></i> Guardar Alterações';

    const tabs = document.querySelectorAll('#adminTabs .admin-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    if (tabs[1]) tabs[1].classList.add('active');
    document.getElementById('tab-listar').style.display = 'none';
    document.getElementById('tab-adicionar').style.display = 'block';
    document.getElementById('tab-adicionar').scrollIntoView({ behavior: 'smooth' });
}

function deleteGame(gameId) {
    if (!isAdminLoggedIn()) return;
    const games = getAllGames() || [];
    const target = games.filter(function(g) { return g.id === gameId; })[0];
    if (!target) { showToast('Jogo não encontrado', 'error'); return; }
    const p1 = confirm('⚠️ EXCLUIR JOGO\n\nNome: ' + target.nome + '\nCategoria: ' + target.categoria + '\n\nA exclusão é permanente mas UM BACKUP será criado automaticamente antes.\n\nContinuar?');
    if (!p1) return;
    const p2 = confirm('Última confirmação: realmente EXCLUIR "' + target.nome + '"?');
    if (!p2) return;
    createBackup();
    const originalLength = games.length;
    const newList = games.filter(function(g) { return g.id !== gameId; });
    if (newList.length === originalLength) {
        showToast('Jogo não encontrado para excluir', 'error');
        return;
    }
    saveGamesData(newList, true);
    renderAdminTable();
    renderBackupsList();
    showToast('Jogo excluído. Backup criado antes.', 'success');
}

function resetForm() {
    const form = document.getElementById('gameForm');
    if (form) form.reset();
    document.getElementById('gameIdInput').value = '';
    document.getElementById('gameDownloads').value = '0';
    const servidorInput = document.getElementById('gameServidor');
    if (servidorInput) servidorInput.value = 'Servidor 1';
    ADMIN_CURRENT_EDIT_ID = null;
}

function saveGameSubmit(event) {
    if (!isAdminLoggedIn()) return false;
    if (event) event.preventDefault();
    const nome = document.getElementById('gameNome').value.trim();
    const categoria = document.getElementById('gameCategoria').value.trim();

    if (!nome || !categoria) {
        showToast('Nome e Categoria são obrigatórios', 'error');
        return false;
    }

    const screenshotsStr = document.getElementById('gameScreenshots').value;
    const screenshots = screenshotsStr
        ? screenshotsStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean)
        : [];

    const reqEspaco = document.getElementById('gameReqEspaco').value.trim();
    const reqFirmware = document.getElementById('gameReqFirmware').value.trim();
    const requisitos = {};
    if (reqEspaco) requisitos.espaco = reqEspaco;
    if (reqFirmware) requisitos.firmware = reqFirmware;

    const gameData = {
        nome: nome,
        categoria: categoria,
        versao: document.getElementById('gameVersao').value.trim() || '1.0',
        tamanho: document.getElementById('gameTamanho').value.trim() || '-',
        dataPublicacao: document.getElementById('gameData').value || new Date().toISOString().split('T')[0],
        downloads: parseInt(document.getElementById('gameDownloads').value, 10) || 0,
        imagem: document.getElementById('gameImagem').value.trim(),
        banner: document.getElementById('gameBanner').value.trim(),
        link: document.getElementById('gameLink').value.trim(),
        servidor: 'Servidor 1',
        trailer: document.getElementById('gameTrailer').value.trim(),
        sinopse: document.getElementById('gameSinopse').value.trim(),
        screenshots: screenshots,
        requisitos: requisitos
    };

    let games = getAllGames() || [];

    if (ADMIN_CURRENT_EDIT_ID) {
        const idx = games.findIndex(function(g) { return g.id === ADMIN_CURRENT_EDIT_ID; });
        if (idx < 0) {
            showToast('Jogo não encontrado', 'error');
            return false;
        }
        games[idx] = Object.assign({}, games[idx], gameData);
        saveGamesData(games);
        renderAdminTable();
        showToast('Jogo atualizado com sucesso', 'success');
    } else {
        const maxId = games.reduce(function(max, g) { return g.id > max ? g.id : max; }, 0);
        gameData.id = maxId + 1;
        games.push(gameData);
        saveGamesData(games);
        renderAdminTable();
        showToast('Jogo adicionado com sucesso #' + gameData.id, 'success');
        resetForm();
    }
    return false;
}

function exportJSON() {
    if (!isAdminLoggedIn()) return;
    const games = getAllGames() || [];
    const jsonStr = JSON.stringify(games, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jogos_' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('JSON exportado com sucesso', 'success');
}

function createManualBackup() {
    if (!isAdminLoggedIn()) return;
    const key = createBackup();
    if (key) {
        renderBackupsList();
        showToast('Backup criado com sucesso', 'success');
    } else {
        showToast('Nenhum jogo para salvar em backup', 'error');
    }
}

function importJSONBackup() {
    if (!isAdminLoggedIn()) return;
    const input = document.getElementById('backupFileInput');
    if (input) input.click();
}

function handleBackupFileImport(event) {
    if (!isAdminLoggedIn()) return;
    const input = event.target;
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (file.type !== 'application/json' && file.name.toLowerCase().indexOf('.json') === -1) {
        showToast('Por favor selecione um ficheiro .json', 'error');
        input.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data || !Array.isArray(data) || data.length === 0) {
                showToast('Ficheiro JSON inválido ou vazio', 'error');
                input.value = '';
                return;
            }
            const confirmar = confirm('Importar ' + data.length + ' jogo(s) do ficheiro "' + file.name + '"?\n\nIsto irá substituir TODOS os jogos atuais.\nUm backup automático será criado antes.');
            if (!confirmar) { input.value = ''; return; }
            createBackup();
            saveGamesData(data, true);
            renderAdminTable();
            renderBackupsList();
            showToast(data.length + ' jogo(s) importado(s) com sucesso!', 'success');
        } catch (err) {
            showToast('Erro a ler ficheiro JSON', 'error');
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file, 'UTF-8');
}

function resetToDefault() {
    if (!isAdminLoggedIn()) return;
    const currentCount = (getAllGames() || []).length;
    const msg1 = '⚠️ RESTAURAR PADRÃO (ATENÇÃO)\n\nVocê tem ' + currentCount + ' jogo(s) cadastrado(s) atualmente.\n\nUm BACKUP AUTOMÁTICO será criado ANTES de restaurar os 20 jogos padrão.\n\nDepois basta ir na aba BACKUPS para recuperar seus dados se precisar.\n\nContinuar?';
    if (!confirm(msg1)) return;
    const palavra = prompt('CONFIRMAÇÃO DE SEGURANÇA:\n\nDigite a palavra abaixo para confirmar:\n\nRESTAURAR\n\n(atenção: letras maiúsculas)');
    if (palavra !== 'RESTAURAR') {
        showToast('Confirmação incorreta. Operação cancelada.', 'error');
        return;
    }
    createBackup();
    try {
        localStorage.removeItem('ps4games_admin_data');
    } catch (e) {}
    showToast('A restaurar dados padrão...', 'info');
    const defaults = (typeof getDefaultGames === 'function') ? getDefaultGames() : [];
    if (defaults && defaults.length > 0) {
        ALL_GAMES = defaults;
        try { localStorage.setItem('ps4games_admin_data', JSON.stringify(defaults)); } catch(e){}
        renderAdminTable();
        renderBackupsList();
        showToast('Dados restaurados com sucesso (' + defaults.length + ' jogos). Backup criado antes.', 'success');
    } else {
        ALL_GAMES = [];
        loadGamesData().then(function() {
            renderAdminTable();
            renderBackupsList();
            showToast('Dados restaurados com sucesso. Backup criado antes.', 'success');
        });
    }
}
