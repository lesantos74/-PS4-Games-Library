/* =========================================================
   PS4 Games Library - Sistema de Favoritos
   Utiliza LocalStorage para guardar jogos favoritos
   ========================================================= */

const FAVORITES_KEY = 'ps4games_favorites';

function getFavorites() {
    try {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Erro ao ler favoritos:', e);
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true;
    } catch (e) {
        console.error('Erro ao guardar favoritos:', e);
        showToast('Erro ao guardar favoritos', 'error');
        return false;
    }
}

function isFavorite(gameId) {
    const favorites = getFavorites();
    return favorites.includes(gameId);
}

function toggleFavorite(gameId, event) {
    if (event) event.stopPropagation();
    const favorites = getFavorites();
    const index = favorites.indexOf(gameId);

    if (index > -1) {
        favorites.splice(index, 1);
        saveFavorites(favorites);
        showToast('Removido dos favoritos', 'warning');
        updateFavoriteIcon(gameId, false);
    } else {
        favorites.push(gameId);
        saveFavorites(favorites);
        showToast('Adicionado aos favoritos ♥', 'success');
        updateFavoriteIcon(gameId, true);
    }

    if (typeof renderFavoritesPage === 'function') {
        renderFavoritesPage();
    }
    return false;
}

function updateFavoriteIcon(gameId, isFav) {
    const buttons = document.querySelectorAll('[data-fav-id="' + gameId + '"]');
    buttons.forEach(function(btn) {
        const icon = btn.querySelector('i') || btn;
        if (isFav) {
            btn.classList.add('active');
            if (icon.classList) {
                icon.classList.remove('heart-outline');
                icon.classList.add('heart');
            }
        } else {
            btn.classList.remove('active');
            if (icon.classList) {
                icon.classList.remove('heart');
                icon.classList.add('heart-outline');
            }
        }
    });
}

function updateAllFavoriteButtons(games) {
    games.forEach(function(game) {
        if (isFavorite(game.id)) {
            updateFavoriteIcon(game.id, true);
        }
    });
}

function initFavorites() {
    return true;
}
