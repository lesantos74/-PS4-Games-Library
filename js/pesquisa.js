/* =========================================================
   PS4 Games Library - Sistema de Pesquisa
   Filtro instantâneo por nome e categoria (JS puro)
   ========================================================= */

let currentSearchTerm = '';
let searchDebounceTimer = null;

function searchGames(games, term) {
    if (!term || term.trim() === '') return games;
    const searchTerm = term.toLowerCase().trim();
    return games.filter(function(game) {
        const name = (game.nome || '').toLowerCase();
        const category = (game.categoria || '').toLowerCase();
        const version = (game.versao || '').toLowerCase();
        const sinopse = (game.sinopse || '').toLowerCase();
        return name.indexOf(searchTerm) > -1 ||
               category.indexOf(searchTerm) > -1 ||
               version.indexOf(searchTerm) > -1 ||
               sinopse.indexOf(searchTerm) > -1;
    });
}

function debounceSearch(callback, delay) {
    if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
    }
    searchDebounceTimer = setTimeout(callback, delay || 200);
}

function onSearchInput() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    currentSearchTerm = input.value;
    debounceSearch(function() {
        if (typeof applyGlobalFilter === 'function') {
            applyGlobalFilter();
        }
    }, 200);
}

function getCurrentSearchTerm() {
    return currentSearchTerm;
}

function initSearch() {
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', onSearchInput);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                input.value = '';
                currentSearchTerm = '';
                if (typeof applyGlobalFilter === 'function') {
                    applyGlobalFilter();
                }
            }
        });
    }
}
