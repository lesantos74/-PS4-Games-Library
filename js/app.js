/* =========================================================
   PS4 Games Library - App Principal
   Carrega dados JSON, renderiza catálogo, banners, categorias
   ========================================================= */

const CATEGORIAS_LIST = ['Ação', 'Aventura', 'Corrida', 'Futebol', 'RPG', 'Luta', 'Shooter', 'Terror', 'Homebrew', 'Aplicações'];
let ALL_GAMES = [];
let CAROUSEL_INDEX = 0;
let CAROUSEL_TIMER = null;
let CURRENT_CATEGORY = 'Todos';

const DEFAULT_GAMES = [];

function getDefaultGames() {
    return [];
}

const JSON_SIGNATURE_KEY = 'ps4games_json_signature';

function computeTextSignature(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
    }
    return text.length + '-' + (hash >>> 0).toString(16);
}

function readLocalGames() {
    try {
        const raw = localStorage.getItem('ps4games_admin_data');
        if (!raw) return null;
        const data = JSON.parse(raw);
        return (Array.isArray(data) && data.length > 0) ? data : null;
    } catch (e) {
        console.warn('Dados admin inválidos, ignorando localStorage');
        return null;
    }
}

// data/jogos.json is the source of truth. localStorage is only kept while
// jogos.json is unchanged since the last sync (preserves local admin edits);
// a new deploy of jogos.json replaces it for every visitor.
function loadGamesData() {
    return new Promise(function(resolve, reject) {
        const localGames = readLocalGames();
        fetch('data/jogos.json?t=' + Date.now(), { cache: 'no-store' })
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(function(text) {
                const data = JSON.parse(text);
                if (!data || !Array.isArray(data) || data.length === 0) {
                    throw new Error('JSON vazio');
                }
                const signature = computeTextSignature(text);
                let storedSignature = null;
                try { storedSignature = localStorage.getItem(JSON_SIGNATURE_KEY); } catch (e) {}
                if (localGames && storedSignature === signature) {
                    ALL_GAMES = localGames;
                    resolve(localGames);
                    return;
                }
                if (localGames && JSON.stringify(localGames) !== JSON.stringify(data)) {
                    createBackup();
                }
                ALL_GAMES = data;
                try {
                    localStorage.setItem('ps4games_admin_data', JSON.stringify(data));
                    localStorage.setItem(JSON_SIGNATURE_KEY, signature);
                    console.log('[loadGamesData] data/jogos.json sincronizado com localStorage (' + data.length + ' jogos)');
                } catch (e) {
                    console.warn('[loadGamesData] Não foi possível salvar no localStorage:', e);
                }
                resolve(data);
            })
            .catch(function(err) {
                if (localGames) {
                    console.warn('[loadGamesData] data/jogos.json indisponível (' + err.message + '), usando localStorage');
                    ALL_GAMES = localGames;
                    resolve(localGames);
                    return;
                }
                const fallback = getDefaultGames();
                ALL_GAMES = fallback;
                if (fallback.length === 0) {
                    console.warn(
                        '%c⚠️ NENHUM JOGO ENCONTRADO\n' +
                        '%c localStorage vazio e data/jogos.json também está vazio.\n\n' +
                        '👉 Para publicar os SEUS jogos no GitHub Pages:\n' +
                        '   1) Abra sincronizar-jogos.html na sua pasta LOCAL (onde você editou os jogos)\n' +
                        '   2) Clique em "Baixar jogos.json"\n' +
                        '   3) Substitua o arquivo data/jogos.json pelo baixado\n' +
                        '   4) Commit + push no GitHub.\n\n' +
                        'Ou acesse o Painel Admin > Aba Backups > "Exportar p/ Deploy (jogos.json)".',
                        'color:#f59e0b;font-weight:bold;font-size:14px;',
                        'color:#94a3b8;font-size:12px;'
                    );
                } else {
                    console.warn('Fallback carregado:', err.message);
                }
                resolve(fallback);
            });
    });
}

function exportCurrentDataJSON() {
    const games = getAllGames() || [];
    const jsonStr = JSON.stringify(games, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jogos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('[Export] Arquivo jogos.json exportado com ' + games.length + ' jogo(s). Substitua o arquivo data/jogos.json por este e faça push no GitHub.');
    return games.length;
}

window.exportCurrentDataJSON = exportCurrentDataJSON;

const BACKUP_KEY_PREFIX = 'ps4games_backup_';
const BACKUP_MAX_COUNT = 10;

function listBackups() {
    try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.indexOf(BACKUP_KEY_PREFIX) === 0) {
                keys.push(k);
            }
        }
        keys.sort(function(a, b) {
            const ta = parseInt(a.substring(BACKUP_KEY_PREFIX.length), 10) || 0;
            const tb = parseInt(b.substring(BACKUP_KEY_PREFIX.length), 10) || 0;
            return tb - ta;
        });
        return keys.map(function(k) {
            try {
                const raw = localStorage.getItem(k);
                const ts = parseInt(k.substring(BACKUP_KEY_PREFIX.length), 10) || 0;
                const data = JSON.parse(raw);
                const count = (data && Array.isArray(data)) ? data.length : 0;
                return { key: k, timestamp: ts, date: new Date(ts), count: count, data: data };
            } catch (e) {
                return null;
            }
        }).filter(Boolean);
    } catch (e) {
        return [];
    }
}

function createBackup(label) {
    try {
        const current = localStorage.getItem('ps4games_admin_data');
        if (!current) return null;
        const parsed = JSON.parse(current);
        if (!parsed || !Array.isArray(parsed) || parsed.length === 0) return null;
        const key = BACKUP_KEY_PREFIX + Date.now();
        localStorage.setItem(key, current);
        let list = listBackups();
        if (list.length > BACKUP_MAX_COUNT) {
            for (let i = BACKUP_MAX_COUNT; i < list.length; i++) {
                try { localStorage.removeItem(list[i].key); } catch(e){}
            }
        }
        return key;
    } catch (e) {
        return null;
    }
}

function restoreBackup(backupKey) {
    try {
        const raw = localStorage.getItem(backupKey);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data)) return false;
        saveGamesDataWithoutBackup(data);
        return true;
    } catch (e) {
        return false;
    }
}

function deleteBackup(backupKey) {
    try {
        localStorage.removeItem(backupKey);
        return true;
    } catch (e) {
        return false;
    }
}

function normalizeGamesList(games) {
    if (!Array.isArray(games)) return [];
    let changed = false;
    const normalized = games.map(function(g) {
        if (!g || typeof g !== 'object') return g;
        if (g.servidor !== 'Servidor 1') {
            changed = true;
            return Object.assign({}, g, { servidor: 'Servidor 1' });
        }
        return g;
    });
    if (changed) {
        try {
            localStorage.setItem('ps4games_admin_data', JSON.stringify(normalized));
        } catch (e) {}
        ALL_GAMES = normalized;
    }
    return normalized;
}

function saveGamesDataWithoutBackup(games) {
    const normalized = normalizeGamesList(games);
    ALL_GAMES = normalized;
    try {
        localStorage.setItem('ps4games_admin_data', JSON.stringify(normalized));
    } catch (e) {}
}

function saveGamesData(games, skipBackup) {
    const normalized = normalizeGamesList(games);
    if (!skipBackup) {
        try {
            const prevRaw = localStorage.getItem('ps4games_admin_data');
            if (prevRaw) {
                const prev = JSON.parse(prevRaw);
                if (prev && Array.isArray(prev) && prev.length > 0) {
                    createBackup();
                }
            }
        } catch (e) {}
    }
    ALL_GAMES = normalized;
    try {
        localStorage.setItem('ps4games_admin_data', JSON.stringify(normalized));
    } catch (e) {}
}

function getAllGames() {
    return normalizeGamesList(ALL_GAMES);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) { return dateStr; }
}

function formatDownloads(n) {
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n/1000).toFixed(1) + 'K';
    return String(n || 0);
}

const ACTIVE_SLIDESHOWS = {};

function renderSmartTrailer(game) {
    if (!game) return '';
    const gameId = game.id || ('g' + Math.floor(Math.random() * 999999));
    const ssId = 'ss_' + gameId;
    const trailerUrl = String(game.trailer || '').trim();
    const isYouTube = trailerUrl && (trailerUrl.indexOf('youtube.com/embed/') > -1 || trailerUrl.indexOf('youtu.be/') > -1);
    const isVideoFile = trailerUrl && /\.(mp4|webm|ogg|m4v|mov)(\?.*)?$/i.test(trailerUrl);
    const ytWatchUrl = isYouTube ? trailerUrl.replace('/embed/', '/watch?v=').split('?')[0] : trailerUrl;
    const ytSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent((game.nome || '') + ' trailer oficial');

    let screenshots = [];
    if (Array.isArray(game.screenshots) && game.screenshots.length) {
        screenshots = game.screenshots.slice();
    }
    if (screenshots.length === 0 && game.banner) screenshots.push(game.banner);
    if (screenshots.length === 0 && game.imagem) screenshots.push(game.imagem);
    while (screenshots.length > 0 && screenshots.length < 3) screenshots.push(screenshots[0]);

    let slidesHTML = '';
    let dotsHTML = '';
    screenshots.forEach(function(src, idx) {
        slidesHTML += '<div class="ps-slide ' + (idx === 0 ? 'active' : '') + '" style="background-image:url(\'' + src + '\');"></div>';
        dotsHTML += '<button class="ps-dot ' + (idx === 0 ? 'active' : '') + '" onclick="setSlideshowSlide(\'' + ssId + '\',' + idx + ')"></button>';
    });

    const caption = game.categoria
        ? (t('trailer.galeria') + ' • ' + game.categoria + ' • ' + formatDownloads(game.downloads) + ' ' + t('trailer.downloads'))
        : (t('trailer.galeria') + ' • ' + formatDownloads(game.downloads) + ' ' + t('trailer.downloads'));

    let extraActionsHTML = '';
    if (trailerUrl) {
        if (isYouTube) {
            extraActionsHTML +=
                '<a class="btn btn-secondary btn-sm" href="' + ytWatchUrl + '" target="_blank" rel="noopener noreferrer">' +
                    '<i class="fas fa-video"></i> ' + t('trailer.abrirYouTube') +
                '</a>' +
                '<a class="btn btn-secondary btn-sm" href="' + ytSearchUrl + '" target="_blank" rel="noopener noreferrer">' +
                    '<i class="fas fa-search"></i> ' + t('trailer.procurarTrailer') +
                '</a>';
        } else if (isVideoFile) {
            extraActionsHTML +=
                '<a class="btn btn-secondary btn-sm" href="' + trailerUrl + '" target="_blank" rel="noopener noreferrer">' +
                    '<i class="fas fa-download"></i> ' + t('trailer.downloadVideo') +
                '</a>';
        } else {
            extraActionsHTML +=
                '<a class="btn btn-secondary btn-sm" href="' + trailerUrl + '" target="_blank" rel="noopener noreferrer">' +
                    '<i class="fas fa-arrow-right"></i> ' + t('trailer.abrirTrailer') +
                '</a>';
        }
    }

    const warningBadge = trailerUrl && isYouTube
        ? '<div class="ps-warning-badge"><i class="fas fa-exclamation"></i> ' + t('trailer.youtubeBloqueado') + '</div>'
        : '';

    return (
        '<section class="details-section">' +
            '<h2 class="details-section-title"><i class="fas fa-image"></i> ' + t('trailer.titulo') + '</h2>' +
            '<div class="preview-slideshow" id="' + ssId + '" data-current="0" data-playing="1" data-total="' + screenshots.length + '">' +
                slidesHTML +
                '<div class="ps-dots">' + dotsHTML + '</div>' +
                warningBadge +
                '<div class="ps-overlay-info">' +
                    '<div>' +
                        '<div class="ps-game-title">' + (game.nome || '') + '</div>' +
                        '<div class="ps-game-caption">' + caption + '</div>' +
                    '</div>' +
                    '<div class="ps-controls">' +
                        '<button class="ps-btn" title="' + t('trailer.anterior') + '" onclick="prevSlideshow(\'' + ssId + '\')"><i class="fas fa-chevron-left"></i></button>' +
                        '<button class="ps-btn play" id="' + ssId + '_playbtn" title="' + t('trailer.pausar') + '" onclick="toggleSlideshow(\'' + ssId + '\')"><span id="' + ssId + '_playicon">⏸</span></button>' +
                        '<button class="ps-btn" title="' + t('trailer.seguinte') + '" onclick="nextSlideshow(\'' + ssId + '\')"><i class="fas fa-chevron-right"></i></button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="trailer-actions">' +
                '<button class="btn btn-primary btn-sm" onclick="openFirstScreenshotModal(\'' + encodeURIComponent(screenshots[0] || '') + '\')">' +
                    '<i class="fas fa-image"></i> ' + t('trailer.verTelaCheia') +
                '</button>' +
                extraActionsHTML +
            '</div>' +
        '</section>'
    );
}

function getSlideshowState(id) {
    if (ACTIVE_SLIDESHOWS[id]) return ACTIVE_SLIDESHOWS[id];
    const root = document.getElementById(id);
    if (!root) return null;
    const total = parseInt(root.getAttribute('data-total') || '0', 10);
    const state = {
        id: id,
        current: 0,
        total: total,
        playing: true,
        timer: null
    };
    ACTIVE_SLIDESHOWS[id] = state;
    startSlideshowTimer(state);
    return state;
}

function startSlideshowTimer(state) {
    if (state.timer) clearInterval(state.timer);
    state.timer = setInterval(function() {
        if (state.playing) nextSlideshow(state.id);
    }, 3500);
}

function renderSlideshow(id) {
    const state = getSlideshowState(id);
    if (!state) return;
    const root = document.getElementById(id);
    if (!root) return;
    const slides = root.querySelectorAll('.ps-slide');
    const dots = root.querySelectorAll('.ps-dot');
    slides.forEach(function(s, i) { s.classList.toggle('active', i === state.current); });
    dots.forEach(function(d, i) { d.classList.toggle('active', i === state.current); });
    const playIcon = document.getElementById(id + '_playicon');
    if (playIcon) playIcon.textContent = state.playing ? '⏸' : '▶';
    const playBtn = document.getElementById(id + '_playbtn');
    if (playBtn) playBtn.title = state.playing ? 'Pausar' : 'Reproduzir';
}

function nextSlideshow(id) {
    const state = getSlideshowState(id);
    if (!state || state.total === 0) return;
    state.current = (state.current + 1) % state.total;
    renderSlideshow(id);
}

function prevSlideshow(id) {
    const state = getSlideshowState(id);
    if (!state || state.total === 0) return;
    state.current = (state.current - 1 + state.total) % state.total;
    renderSlideshow(id);
}

function setSlideshowSlide(id, idx) {
    const state = getSlideshowState(id);
    if (!state) return;
    state.current = Math.max(0, Math.min(idx, state.total - 1));
    renderSlideshow(id);
}

function toggleSlideshow(id) {
    const state = getSlideshowState(id);
    if (!state) return;
    state.playing = !state.playing;
    renderSlideshow(id);
}

function openFirstScreenshotModal(encodedSrc) {
    const src = decodeURIComponent(encodedSrc || '');
    if (!src) return;
    showScreenshotModal(src);
}

function loadYouTubeIframeById(wrapperId, overlayId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const ytUrl = wrapper.getAttribute('data-yt-url');
    if (!ytUrl) return;
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.remove();
    const iframe = document.createElement('iframe');
    iframe.src = ytUrl + (ytUrl.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
    iframe.title = 'Trailer';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.onerror = function() {
        try { showToast(t('msg.youtubeBloqueado'), 'warning'); } catch(e) {}
    };
    wrapper.appendChild(iframe);
}

function createGameCard(game, options) {
    options = options || {};
    const isFav = isFavorite(game.id);
    const compact = !!options.compact;
    const archiveTag = isArchiveOrgLink(game.link)
        ? '<span style="display:inline-block;position:absolute;top:10px;right:44px;z-index:3;padding:2px 8px;background:rgba(168,85,247,0.9);border-radius:20px;font-size:10px;font-weight:700;color:#fff;letter-spacing:0.3px;box-shadow:0 2px 8px rgba(168,85,247,0.4);">Archive</span>'
        : '';
    const card = document.createElement('div');
    card.className = 'game-card' + (compact ? ' game-card-compact' : '');
    card.onclick = function() {
        window.location.href = 'detalhes.html?id=' + game.id;
    };
    card.innerHTML =
        '<div class="game-card-image">' +
            '<img src="' + (game.imagem || '') + '" alt="' + (game.nome || t('game.semNome')) + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/300x420/1a1a1a/0055FF?text=Imagem\'">' +
            '<span class="game-card-badge">v' + (game.versao || '1.0') + '</span>' +
            '<span class="game-card-category">' + (game.categoria || t('game.geral')) + '</span>' +
            archiveTag +
            '<button class="favorite-btn ' + (isFav ? 'active' : '') + '" data-fav-id="' + game.id + '" onclick="return toggleFavorite(' + game.id + ', event)">' +
                '<i class="fas ' + (isFav ? 'heart' : 'heart-outline') + '"></i>' +
            '</button>' +
        '</div>' +
        '<div class="game-card-body">' +
            '<h3 class="game-card-title">' + (game.nome || t('game.semNome')) + '</h3>' +
            '<div class="game-card-meta">' +
                '<div class="meta-item">' +
                    '<span class="meta-label">' + t('game.meta.tamanho') + '</span>' +
                    '<span class="meta-value">' + (game.tamanho || '-') + '</span>' +
                '</div>' +
                '<div class="meta-item">' +
                    '<span class="meta-label">' + t('game.meta.data') + '</span>' +
                    '<span class="meta-value">' + formatDate(game.dataPublicacao) + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="game-card-footer">' +
                '<span class="game-card-downloads"><i class="fas fa-download"></i> ' + formatDownloads(game.downloads) + '</span>' +
                '<a class="game-card-btn" onclick="event.stopPropagation(); window.location.href=\'detalhes.html?id=' + game.id + '\'">' + t('game.detalhes') + ' <i class="fas fa-arrow-right"></i></a>' +
            '</div>' +
        '</div>';
    return card;
}

function renderGamesGrid(containerId, games, options) {
    options = options || {};
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!games || games.length === 0) {
        container.innerHTML =
            '<div class="empty-state" style="grid-column: 1/-1;">' +
                '<div class="empty-state-icon"><i class="fas fa-gamepad"></i></div>' +
                '<h3 class="empty-state-title">' + t('estado.vazio.titulo') + '</h3>' +
                '<p class="empty-state-desc">' + t('estado.vazio.desc') + '</p>' +
            '</div>';
        return;
    }
    games.forEach(function(g) {
        container.appendChild(createGameCard(g, options));
    });
    updateAllFavoriteButtons(games);
}

let SEARCH_DEBOUNCE_TIMER = null;
function initSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    input.addEventListener('input', function() {
        if (SEARCH_DEBOUNCE_TIMER) clearTimeout(SEARCH_DEBOUNCE_TIMER);
        SEARCH_DEBOUNCE_TIMER = setTimeout(function() {
            if (typeof applyGlobalFilter === 'function') applyGlobalFilter();
        }, 200);
    });
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') applyGlobalFilter();
    });
    try {
        const params = new URLSearchParams(window.location.search || '');
        const q = params.get('q') || params.get('search') || '';
        if (q) input.value = q;
    } catch (e) {}
}

function getCurrentSearchTerm() {
    const input = document.getElementById('searchInput');
    if (!input) return '';
    return (input.value || '').toString().trim().toLowerCase();
}

function searchGames(games, term) {
    if (!term) return games || [];
    const list = games || [];
    const palavras = term.split(/\s+/).filter(Boolean);
    if (palavras.length === 0) return list;
    return list.filter(function(g) {
        const haystack = [
            g.nome,
            g.categoria,
            g.versao,
            g.sinopse,
            (g.requisitos ? g.requisitos.firmware : ''),
            (g.requisitos ? g.requisitos.espaco : ''),
            g.servidor
        ].filter(Boolean).join(' ').toLowerCase();
        return palavras.every(function(p) { return haystack.indexOf(p) !== -1; });
    });
}

function renderBannerCarousel(games) {
    const container = document.getElementById('bannerCarousel');
    if (!container) return;
    const featuredGames = games.slice(0, 5);
    if (featuredGames.length === 0) {
        container.style.display = 'none';
        return;
    }
    let slidesHTML = '';
    featuredGames.forEach(function(g, i) {
        const archiveBadge = isArchiveOrgLink(g.link)
            ? '<span style="display:inline-block;margin-left:8px;padding:2px 8px;background:rgba(168,85,247,0.25);border:1px solid rgba(168,85,247,0.45);border-radius:20px;font-size:10px;font-weight:600;color:#c4b5fd;">Archive.org</span>'
            : '';
        slidesHTML +=
            '<div class="banner-slide ' + (i === 0 ? 'active' : '') + '">' +
                '<img src="' + (g.banner || g.imagem || '') + '" class="banner-image" alt="' + g.nome + '" onerror="this.src=\'https://via.placeholder.com/1600x480/1a1a1a/0055FF?text=' + encodeURIComponent(g.nome) + '\'">' +
                '<div class="banner-overlay"></div>' +
                '<div class="banner-content">' +
                    '<span class="banner-category">' + (g.categoria || '') + archiveBadge + '</span>' +
                    '<h1 class="banner-title">' + g.nome + '</h1>' +
                    '<p class="banner-desc">' + (g.sinopse || t('banner.semDescricao')) + '</p>' +
                    '<div class="banner-buttons">' +
                        '<a class="btn btn-primary btn-lg" href="detalhes.html?id=' + g.id + '&download=1">' +
                            '<i class="fas fa-download"></i> ' + t('banner.baixar') +
                        '</a>' +
                        '<a class="btn btn-secondary btn-lg" href="detalhes.html?id=' + g.id + '">' +
                            '<i class="fas fa-info"></i> ' + t('banner.verDetalhes') +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
    });
    let indicatorsHTML = '<div class="carousel-indicators">';
    featuredGames.forEach(function(_, i) {
        indicatorsHTML += '<button class="indicator ' + (i === 0 ? 'active' : '') + '" onclick="goToSlide(' + i + ')"></button>';
    });
    indicatorsHTML += '</div>';
    const arrowsHTML =
        '<button class="carousel-arrow prev" onclick="prevSlide()"><i class="fas fa-chevron-left"></i></button>' +
        '<button class="carousel-arrow next" onclick="nextSlide()"><i class="fas fa-chevron-right"></i></button>';
    container.innerHTML = slidesHTML + arrowsHTML + indicatorsHTML;
    CAROUSEL_INDEX = 0;
    startCarouselAuto(featuredGames.length);
}

function goToSlide(idx) {
    const slides = document.querySelectorAll('#bannerCarousel .banner-slide');
    const indicators = document.querySelectorAll('#bannerCarousel .indicator');
    if (slides.length === 0) return;
    CAROUSEL_INDEX = (idx + slides.length) % slides.length;
    slides.forEach(function(s, i) { s.classList.toggle('active', i === CAROUSEL_INDEX); });
    indicators.forEach(function(s, i) { s.classList.toggle('active', i === CAROUSEL_INDEX); });
}

function nextSlide() { goToSlide(CAROUSEL_INDEX + 1); resetCarouselAuto(); }
function prevSlide() { goToSlide(CAROUSEL_INDEX - 1); resetCarouselAuto(); }

function startCarouselAuto(total) {
    if (!total || total <= 1) return;
    stopCarouselAuto();
    CAROUSEL_TIMER = setInterval(function() {
        nextSlide();
    }, 6000);
}

function stopCarouselAuto() {
    if (CAROUSEL_TIMER) {
        clearInterval(CAROUSEL_TIMER);
        CAROUSEL_TIMER = null;
    }
}

function resetCarouselAuto() {
    const total = document.querySelectorAll('#bannerCarousel .banner-slide').length;
    stopCarouselAuto();
    startCarouselAuto(total);
}

function renderCategoriesFilter() {
    const container = document.getElementById('categoriesFilter');
    if (!container) return;
    const categories = ['Todos'].concat(CATEGORIAS_LIST);
    let html = '';
    categories.forEach(function(cat) {
        const label = (cat === 'Todos') ? t('game.todos') : cat;
        html += '<button class="category-chip ' + (CURRENT_CATEGORY === cat ? 'active' : '') + '" data-cat="' + cat + '" onclick="selectCategory(\'' + cat + '\')">' + label + '</button>';
    });
    container.innerHTML = html;
}

function selectCategory(cat) {
    CURRENT_CATEGORY = cat;
    const chips = document.querySelectorAll('#categoriesFilter .category-chip');
    chips.forEach(function(chip) {
        chip.classList.toggle('active', chip.getAttribute('data-cat') === cat);
    });
    applyGlobalFilter();
    try {
        const target = document.getElementById('maisbaixados');
        if (target && 'scrollIntoView' in target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (e) {}
}

function applyGlobalFilter() {
    const all = getAllGames() || [];
    let filtered = all;
    if (CURRENT_CATEGORY && CURRENT_CATEGORY !== 'Todos') {
        filtered = filtered.filter(function(g) { return g.categoria === CURRENT_CATEGORY; });
    }
    const term = getCurrentSearchTerm();
    filtered = searchGames(filtered, term);

    const temFiltroAtivo = (CURRENT_CATEGORY && CURRENT_CATEGORY !== 'Todos') || !!term;

    if (temFiltroAtivo) {
        renderGamesGrid('topGamesGrid', sortByDownloads(filtered, 8));
        renderGamesGrid('recentGamesGrid', sortByDate(filtered, 8));
        renderGamesGrid('allGamesGrid', filtered, { compact: true });
    } else {
        renderGamesGrid('topGamesGrid', sortByDownloads(all, 8));
        renderGamesGrid('recentGamesGrid', sortByDate(all, 8));
        renderGamesGrid('allGamesGrid', all, { compact: true });
    }

    const countEl = document.getElementById('catalogCount');
    if (countEl) {
        if (temFiltroAtivo) {
            countEl.textContent = filtered.length + ' ' + t('catalogo.de') + ' ' + all.length + ' ' + t('catalogo.jogos') +
                ((CURRENT_CATEGORY && CURRENT_CATEGORY !== 'Todos') ? ' ' + t('catalogo.em') + ' "' + CURRENT_CATEGORY + '"' : '') +
                (term ? ' (' + t('catalogo.pesquisa') + ': "' + term + '")' : '');
        } else {
            countEl.textContent = all.length + ' ' + t('catalogo.jogosTotal');
        }
    }

    const sectionRecent = document.getElementById('recentes');
    const sectionMais = document.getElementById('maisbaixados');
    if (temFiltroAtivo && filtered.length === 0) {
        if (sectionRecent) sectionRecent.style.display = 'none';
        if (sectionMais) sectionMais.style.display = 'none';
    } else {
        if (sectionRecent) sectionRecent.style.display = '';
        if (sectionMais) sectionMais.style.display = '';
    }
}

function getCategoryCount(games, cat) {
    if (cat === 'Todos') return (games || []).length;
    return (games || []).filter(function(g) { return g.categoria === cat; }).length;
}

function sortByDownloads(games, limit) {
    const sorted = games.slice().sort(function(a, b) {
        return (b.downloads || 0) - (a.downloads || 0);
    });
    return limit ? sorted.slice(0, limit) : sorted;
}

function sortByDate(games, limit) {
    const sorted = games.slice().sort(function(a, b) {
        const da = a.dataPublicacao ? new Date(a.dataPublicacao).getTime() : 0;
        const db = b.dataPublicacao ? new Date(b.dataPublicacao).getTime() : 0;
        return db - da;
    });
    return limit ? sorted.slice(0, limit) : sorted;
}

function showToast(message, type) {
    type = type || 'info';
    const container = document.getElementById('toastContainer');
    if (!container) {
        alert(message);
        return;
    }
    const icons = { success: 'check', error: 'exclamation', warning: 'exclamation', info: 'info' };
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML =
        '<div class="toast-icon"><i class="fas fa-' + (icons[type] || 'info') + '"></i></div>' +
        '<div class="toast-message">' + message + '</div>';
    container.appendChild(toast);
    setTimeout(function() {
        toast.style.transition = 'all 0.4s';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
    }, 3200);
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
}

function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
}

function showScreenshotModal(src) {
    const body = document.getElementById('modalScreenshotBody');
    const overlay = document.getElementById('screenshotModal');
    if (body) body.innerHTML = '<img src="' + src + '" alt="Screenshot">';
    if (overlay) overlay.classList.add('active');
}

function headerScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function mobileMenuToggle() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function() {
        menu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('open');
        });
    });
}

function ensureLangSelectorInNav() {
    if (typeof renderLangDropdown !== 'function') return;
    var nav = document.getElementById('navMenu');
    if (!nav) return;
    if (nav.querySelector('#lang-selector')) return;
    // Verifica se já tem o admin-secret antes
    var ref = nav.querySelector('.nav-admin-secret') || nav.lastElementChild;
    if (ref && ref.nextSibling) {
        var container = document.createElement('div');
        container.id = 'lang-selector';
        container.style.marginLeft = '6px';
        ref.parentNode.insertBefore(container, ref.nextSibling);
    } else if (ref) {
        var container2 = document.createElement('div');
        container2.id = 'lang-selector';
        container2.style.marginLeft = '6px';
        nav.appendChild(container2);
    }
    renderLangDropdown('lang-selector');
}

function ensureI18nApplied() {
    if (typeof applyI18n === 'function') applyI18n();
    ensureLangSelectorInNav();
}

// Re-renderiza os conteúdos gerados por JS ao trocar de idioma.
// Páginas específicas (categorias, favoritos, detalhes) podem sobrescrever.
function updateDynamicTitles() {
    if (!ALL_GAMES || ALL_GAMES.length === 0) return;
    if (document.getElementById('bannerCarousel')) renderBannerCarousel(ALL_GAMES);
    if (document.getElementById('categoriesFilter')) renderCategoriesFilter();
    if (typeof applyGlobalFilter === 'function') applyGlobalFilter();
}
window.updateDynamicTitles = updateDynamicTitles;

function initApp() {
    window.addEventListener('scroll', headerScrollEffect);
    headerScrollEffect();
    mobileMenuToggle();
    ensureI18nApplied();
    initSearch();

    loadGamesData().then(function(games) {
        renderBannerCarousel(games);
        renderCategoriesFilter();
        applyGlobalFilter();
    });

    const overlay = document.getElementById('screenshotModal');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeModal('screenshotModal');
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal('screenshotModal');
            closeModal('archiveModal');
        }
    });
}

/* =========================================================
   DETEÇÃO E AVISO DE DOWNLOADS NO ARCHIVE.ORG
   Avisa o usuário de forma transparente e amigável.
   ========================================================= */

function isArchiveOrgLink(url) {
    if (!url) return false;
    return /archive\.org/i.test(String(url));
}

function buildArchiveWarningHTML(game, compact) {
    compact = compact || false;
    const stepsHTML = compact ? '' :
        '<ul class="archive-warning-steps">' +
            '<li class="archive-warning-step">' +
                '<span class="archive-step-num">1</span>' +
                '<span>' + t('archive.step1') + '</span>' +
            '</li>' +
            '<li class="archive-warning-step">' +
                '<span class="archive-step-num">2</span>' +
                '<span>' + t('archive.step2') + '</span>' +
            '</li>' +
            '<li class="archive-warning-step">' +
                '<span class="archive-step-num">3</span>' +
                '<span>' + t('archive.step3') + '</span>' +
            '</li>' +
        '</ul>';

    const footerHTML = compact ? '' :
        '<p class="archive-note">' + t('archive.nota') + '</p>';

    const texto = t('archive.texto').replace('{jogo}', '<strong>' + (game ? game.nome : '') + '</strong>');

    return (
        '<div class="archive-warning" role="note" aria-label="' + t('archive.aria') + '">' +
            '<div class="archive-warning-header">' +
                '<div class="archive-warning-icon"><i class="fas fa-archive"></i></div>' +
                '<p class="archive-warning-title">' + t('archive.titulo') + '</p>' +
            '</div>' +
            '<p class="archive-warning-text">' + texto + '</p>' +
            stepsHTML +
            footerHTML +
        '</div>'
    );
}

function showArchiveModal(gameId) {
    const games = getAllGames() || [];
    const game = games.find(function(g) { return g.id === gameId; });
    if (!game) return;

    let modal = document.getElementById('archiveModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'archiveModal';
        modal.className = 'modal-overlay';
        modal.innerHTML =
            '<div class="modal-content archive-modal-content">' +
                '<button class="modal-close" onclick="closeModal(\'archiveModal\')"><i class="fas fa-close"></i></button>' +
                '<div class="modal-body">' +
                    '<div id="archiveModalBody"></div>' +
                '</div>' +
                '<div class="archive-modal-footer">' +
                    '<button type="button" class="btn btn-secondary" onclick="closeModal(\'archiveModal\')">' + t('archive.fechar') + '</button>' +
                    '<a type="button" class="btn btn-primary" id="archiveModalDownload" href="#" target="_blank" rel="noopener noreferrer">' +
                        '<i class="fas fa-download"></i> ' + t('archive.irDownload') +
                    '</a>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal('archiveModal');
        });
    }

    document.getElementById('archiveModalBody').innerHTML = buildArchiveWarningHTML(game, false) + '<br>' + buildDisclaimerHTML();
    const dlLink = document.getElementById('archiveModalDownload');
    if (dlLink) {
        dlLink.href = game.link || '#';
        dlLink.onclick = function() {
            closeModal('archiveModal');
            setTimeout(function() {
                const allGames = getAllGames() || [];
                const g = allGames.find(function(x) { return x.id === gameId; });
                if (g) {
                    g.downloads = (g.downloads || 0) + 1;
                    saveGamesData(allGames);
                }
                showToast(t('msg.abrindoDownload'), 'info');
            }, 200);
        };
    }
    openModal('archiveModal');
}

function smartHandleDownload(gameId, href) {
    if (!href || href === '#') {
        showToast(t('msg.linkIndisponivel'), 'error');
        return false;
    }
    if (isArchiveOrgLink(href)) {
        showArchiveModal(gameId);
        return false;
    }
    return true;
}

const COMMENTS_KEY = 'ps4games_comments';

function getAllComments() {
    try {
        const raw = localStorage.getItem(COMMENTS_KEY);
        if (!raw) return {};
        const data = JSON.parse(raw);
        return data && typeof data === 'object' ? data : {};
    } catch (e) {
        return {};
    }
}

function saveAllComments(comments) {
    try {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments || {}));
    } catch (e) {}
}

function getGameComments(gameId) {
    const all = getAllComments();
    const list = all[String(gameId)] || [];
    return Array.isArray(list) ? list : [];
}

function addGameComment(gameId, comment) {
    if (!comment || !comment.nome || !comment.texto) {
        return null;
    }
    const all = getAllComments();
    const key = String(gameId);
    if (!Array.isArray(all[key])) all[key] = [];
    const newComment = {
        id: Date.now() + '_' + Math.floor(Math.random() * 10000),
        nome: String(comment.nome).slice(0, 60),
        texto: String(comment.texto).slice(0, 2000),
        linkQuebrado: !!comment.linkQuebrado,
        data: new Date().toISOString()
    };
    all[key].unshift(newComment);
    saveAllComments(all);
    return newComment;
}

function countBrokenLinks(gameId) {
    return getGameComments(gameId).filter(function(c) { return c.linkQuebrado; }).length;
}

function formatRelativeDate(isoStr) {
    if (!isoStr) return '-';
    try {
        const d = new Date(isoStr);
        const agora = new Date();
        const diff = Math.max(0, Math.floor((agora - d) / 1000));
        if (diff < 60) return t('tempo.agora');
        if (diff < 3600) return Math.floor(diff / 60) + ' ' + t('tempo.min');
        if (diff < 86400) return Math.floor(diff / 3600) + ' ' + t('tempo.h');
        if (diff < 2592000) return Math.floor(diff / 86400) + ' ' + t('tempo.dias');
        const locales = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
        return d.toLocaleDateString(locales[getCurrentLang()] || 'pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
        return '-';
    }
}

function renderCommentsSection(gameId, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !gameId) return;
    const comments = getGameComments(gameId);
    const brokenCount = countBrokenLinks(gameId);

    let headerHTML = '';
    if (brokenCount > 0) {
        headerHTML =
            '<div class="comments-broken-alert">' +
                '<i class="fas fa-triangle-exclamation"></i>' +
                '<span>' + brokenCount + ' ' + t('comments.relatosCount') + '</span>' +
            '</div>';
    }

    let listHTML = '';
    if (comments.length === 0) {
        listHTML =
            '<div class="comments-empty">' +
                '<div class="comments-empty-icon"><i class="fas fa-comments"></i></div>' +
                '<h4>' + t('comments.semTitulo') + '</h4>' +
                '<p>' + t('comments.semDesc') + '</p>' +
            '</div>';
    } else {
        listHTML = '<div class="comments-list">';
        comments.forEach(function(c) {
            listHTML +=
                '<div class="comment-item ' + (c.linkQuebrado ? 'comment-broken' : '') + '">' +
                    '<div class="comment-avatar">' +
                        '<i class="fas fa-user"></i>' +
                    '</div>' +
                    '<div class="comment-content">' +
                        '<div class="comment-header">' +
                            '<span class="comment-name">' + (c.nome || t('comments.anonimo')) + '</span>' +
                            (c.linkQuebrado ? '<span class="comment-broken-tag"><i class="fas fa-link-slash"></i> ' + t('comments.tagQuebrado') + '</span>' : '') +
                            '<span class="comment-date">' + formatRelativeDate(c.data) + '</span>' +
                        '</div>' +
                        '<div class="comment-text">' + escapeHtml(c.texto) + '</div>' +
                    '</div>' +
                '</div>';
        });
        listHTML += '</div>';
    }

    container.innerHTML =
        '<section class="comments-section">' +
            '<h2 class="details-section-title"><i class="fas fa-comments"></i> ' + t('comments.titulo') + ' <span class="comments-count">(' + comments.length + ')</span></h2>' +
            headerHTML +
            '<div class="comment-form-card">' +
                '<h3 class="comment-form-title"><i class="fas fa-pen"></i> ' + t('comments.form.titulo') + '</h3>' +
                '<form id="commentForm" data-game-id="' + gameId + '">' +
                    '<div class="comment-form-grid">' +
                        '<div class="comment-field">' +
                            '<label for="commentNome">' + t('comments.label.nome') + '</label>' +
                            '<input type="text" id="commentNome" name="nome" placeholder="' + t('comments.placeholder.nome') + '" maxlength="60" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="comment-field">' +
                        '<label for="commentTexto">' + t('comments.label.texto') + '</label>' +
                        '<textarea id="commentTexto" name="texto" placeholder="' + t('comments.placeholder.mensagem') + '" maxlength="2000" rows="4" required></textarea>' +
                    '</div>' +
                    '<div class="comment-form-footer">' +
                        '<label class="comment-checkbox">' +
                            '<input type="checkbox" id="commentLinkQuebrado" name="linkQuebrado">' +
                            '<span>' + t('comments.quebrado.label') + '</span>' +
                        '</label>' +
                        '<button type="submit" class="btn btn-primary btn-sm">' +
                            '<i class="fas fa-paper-plane"></i> ' + t('comments.publicar') +
                        '</button>' +
                    '</div>' +
                '</form>' +
            '</div>' +
            '<div class="comments-list-wrapper" id="commentsListContainer">' + listHTML + '</div>' +
        '</section>';

    const form = document.getElementById('commentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeInput = document.getElementById('commentNome');
            const textoInput = document.getElementById('commentTexto');
            const brokenInput = document.getElementById('commentLinkQuebrado');
            const nome = nomeInput ? (nomeInput.value || '').trim() : '';
            const texto = textoInput ? (textoInput.value || '').trim() : '';
            if (!nome || !texto) {
                showToast(t('msg.preenchaNome'), 'warning');
                return;
            }
            const added = addGameComment(gameId, {
                nome: nome,
                texto: texto,
                linkQuebrado: brokenInput ? brokenInput.checked : false
            });
            if (added) {
                if (nomeInput) nomeInput.value = '';
                if (textoInput) textoInput.value = '';
                if (brokenInput) brokenInput.checked = false;
                showToast(added.linkQuebrado ? t('msg.relatoEnviado') : t('msg.comentarioPublicado'), 'success');
                renderCommentsSection(gameId, containerId);
                try {
                    const section = container.querySelector('.comments-section');
                    if (section && 'scrollIntoView' in section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } catch (err) {}
            } else {
                showToast(t('msg.erroComentario'), 'error');
            }
        });
    }
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* =========================================================
   AVISO LEGAL DE DOWNLOAD
   Informa aos usuários sobre a natureza dos links.
   ========================================================= */
function buildDisclaimerHTML() {
    return (
        '<div class="download-disclaimer" role="note" aria-label="' + t('disclaimer.aria') + '">' +
            '<div class="download-disclaimer-icon">⚖️</div>' +
            '<div class="download-disclaimer-content">' +
                '<h4 class="download-disclaimer-title">' + t('disclaimer.titulo') + '</h4>' +
                '<p class="download-disclaimer-text">' +
                    t('disclaimer.texto') +
                '</p>' +
            '</div>' +
        '</div>'
    );
}
