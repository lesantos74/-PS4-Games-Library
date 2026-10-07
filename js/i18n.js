// ============================================================
//  i18n - Internacionalizacao (PT-BR, EN-US, ES-ES)
//  PS4 Games Library
// ============================================================

const I18N_LANGS = {
    pt: { nome: 'Português', bandeira: '🇧🇷' },
    en: { nome: 'English',  bandeira: '🇺🇸' },
    es: { nome: 'Español',  bandeira: '🇪🇸' }
};

const I18N_TRANSLATIONS = {

    /* ===================
       PÁGINA: index.html
       =================== */
    pt: {
        // Header
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Sua biblioteca completa de jogos PS4 para download',
        'header.busca.placeholder': 'Pesquisar jogos, categorias, firmware...',
        'header.todasCategorias': 'Todas as Categorias',
        'header.todasCategorias.tooltip': 'Ver catálogo completo',

        // Categorias
        'nav.inicio': 'Início',
        'nav.catalogo': 'Catálogo',
        'nav.favoritos': 'Favoritos',
        'nav.categorias': 'Categorias',

        // Hero / Banner principal
        'hero.badge': '🎮 Biblioteca Atualizada',
        'hero.titulo': 'Milhares de Jogos PS4',
        'hero.subtitulo': 'Homebrews, Aplicações, Mods e os melhores lançamentos. Tudo em um só lugar.',
        'hero.cta.verCatalogo': '📚 Ver Catálogo Completo',
        'hero.cta.verMaisBaixados': '🔥 Mais Baixados',

        // Caixa de Doação
        'donate.titulo': '💙 Ajude a manter o projeto!',
        'donate.texto': 'Se este site está ajudando você, considere uma doação via PIX. Todo valor ajuda a pagar servidores e manter a biblioteca atualizada!',
        'donate.chavePix': 'Chave PIX',
        'donate.qrCodeAlt': 'QR Code PIX',
        'donate.copiarChave': '📋 Copiar Chave PIX',
        'donate.copiado': '✅ Copiado!',

        // Seção: Mais Baixados
        'section.maisBaixados.titulo': '🔥 Mais Baixados',
        'section.maisBaixados.subtitulo': 'Os jogos mais populares da semana',
        'section.maisBaixados.verTodos': 'Ver todos →',

        // Seção: Mais Recentes
        'section.recentes.titulo': '✨ Mais Recentes',
        'section.recentes.subtitulo': 'Lançamentos e atualizações novas na biblioteca',
        'section.recentes.verTodos': 'Ver todos →',

        // Seção: Catálogo Completo
        'section.catalogo.titulo': '📚 Catálogo Completo',
        'section.catalogo.subtitulo': 'Todos os jogos organizados por ordem alfabética',
        'section.catalogo.total': 'Total de jogos',
        'section.catalogo.filtroTodos': 'Todos',

        // Game card
        'game.baixar': '⬇ Baixar',
        'game.detalhes': 'ℹ Detalhes',
        'game.favoritar': '⭐ Favorito',
        'game.desfavoritar': '⭐ Favoritado',
        'game.downloads': 'Downloads',
        'game.semCategoria': 'Sem categoria',

        // Game detalhes
        'detalhes.voltar': '← Voltar ao Catálogo',
        'detalhes.infoBasica': '📋 Informações Básicas',
        'detalhes.categoria': 'Categoria',
        'detalhes.versao': 'Versão',
        'detalhes.tamanho': 'Tamanho',
        'detalhes.data': 'Data de Publicação',
        'detalhes.servidor': 'Servidor',
        'detalhes.downloads': 'Downloads',
        'detalhes.sinopse': '📖 Sinopse',
        'detalhes.requisitos': '⚙ Requisitos / Compatibilidade',
        'detalhes.firmware': 'Firmware Mínimo',
        'detalhes.espaco': 'Espaço em Disco',
        'detalhes.trailer': '🎬 Trailer / Gameplay',
        'detalhes.screenshots': '📸 Screenshots',
        'detalhes.cta.botao': '⬇ Baixar Agora',
        'detalhes.cta.aviso': 'Link direto de download via .pkg compatível com seu PS4',

        // Comentários
        'comments.titulo': '💬 Comentários & Relatos',
        'comments.alertaQuebrado': '🚨 Este jogo tem relatos de LINK QUEBRADO! A equipe já foi avisada.',
        'comments.enviar': '📨 Enviar Comentário',
        'comments.placeholder.nome': 'Seu nome (opcional)',
        'comments.placeholder.mensagem': 'Deixe seu comentário, dúvida ou relato...',
        'comments.radio.comentario': '💭 Comentário',
        'comments.radio.duvida': '❓ Dúvida',
        'comments.radio.quebrado': '⚠️ Link Quebrado',
        'comments.enviarBtn': '📨 Enviar',
        'comments.semComentarios': 'Nenhum comentário ainda. Seja o primeiro! 🎉',
        'comments.relatoQuebrado': '⚠️ Usuário reportou LINK QUEBRADO',
        'comments.duvida': '❓ Dúvida',

        // Footer
        'footer.sobre.titulo': 'Sobre o Projeto',
        'footer.sobre.texto': 'Biblioteca comunitária com jogos, homebrews e aplicações para PS4 com jailbreak. Projeto educacional e sem fins lucrativos.',
        'footer.atalhos.titulo': 'Atalhos Rápidos',
        'footer.categorias.titulo': 'Categorias',
        'footer.sistema.titulo': 'Sistema',
        'footer.direitos': '© 2026 PS4 Games Library. Todos os direitos reservados. Projeto educacional.',

        // Estados / Mensagens gerais
        'estado.vazio': '😕 Nenhum jogo encontrado. Tente outra busca ou categoria.',
        'estado.carregando': '⏳ Carregando biblioteca...',
        'estado.buscaVazia': 'Digite para pesquisar...',
        'estado.resultados': 'resultado(s) encontrado(s)',
    },

    /* ===================
       INGLÊS - EN-US
       =================== */
    en: {
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Your complete PS4 games library for download',
        'header.busca.placeholder': 'Search games, categories, firmware...',
        'header.todasCategorias': 'All Categories',
        'header.todasCategorias.tooltip': 'See full catalog',

        'nav.inicio': 'Home',
        'nav.catalogo': 'Catalog',
        'nav.favoritos': 'Favorites',
        'nav.categorias': 'Categories',

        'hero.badge': '🎮 Updated Library',
        'hero.titulo': 'Thousands of PS4 Games',
        'hero.subtitulo': 'Homebrews, Apps, Mods and the best releases. All in one place.',
        'hero.cta.verCatalogo': '📚 See Full Catalog',
        'hero.cta.verMaisBaixados': '🔥 Top Downloads',

        'donate.titulo': '💙 Help keep the project alive!',
        'donate.texto': 'If this site is helping you, consider a PIX donation (Brazil) or any contribution. Every amount helps pay for servers and keep the library updated!',
        'donate.chavePix': 'PIX Key',
        'donate.qrCodeAlt': 'PIX QR Code',
        'donate.copiarChave': '📋 Copy PIX Key',
        'donate.copiado': '✅ Copied!',

        'section.maisBaixados.titulo': '🔥 Most Downloaded',
        'section.maisBaixados.subtitulo': 'The most popular games of the week',
        'section.maisBaixados.verTodos': 'See all →',

        'section.recentes.titulo': '✨ Recent Releases',
        'section.recentes.subtitulo': 'New releases and fresh updates in the library',
        'section.recentes.verTodos': 'See all →',

        'section.catalogo.titulo': '📚 Complete Catalog',
        'section.catalogo.subtitulo': 'All games sorted alphabetically',
        'section.catalogo.total': 'Total games',
        'section.catalogo.filtroTodos': 'All',

        'game.baixar': '⬇ Download',
        'game.detalhes': 'ℹ Details',
        'game.favoritar': '⭐ Favorite',
        'game.desfavoritar': '⭐ Favorited',
        'game.downloads': 'Downloads',
        'game.semCategoria': 'Uncategorized',

        'detalhes.voltar': '← Back to Catalog',
        'detalhes.infoBasica': '📋 Basic Info',
        'detalhes.categoria': 'Category',
        'detalhes.versao': 'Version',
        'detalhes.tamanho': 'Size',
        'detalhes.data': 'Release Date',
        'detalhes.servidor': 'Server',
        'detalhes.downloads': 'Downloads',
        'detalhes.sinopse': '📖 Synopsis',
        'detalhes.requisitos': '⚙ Requirements / Compatibility',
        'detalhes.firmware': 'Minimum Firmware',
        'detalhes.espaco': 'Disk Space',
        'detalhes.trailer': '🎬 Trailer / Gameplay',
        'detalhes.screenshots': '📸 Screenshots',
        'detalhes.cta.botao': '⬇ Download Now',
        'detalhes.cta.aviso': 'Direct .pkg download link compatible with your PS4',

        'comments.titulo': '💬 Comments & Reports',
        'comments.alertaQuebrado': '🚨 This game has reports of BROKEN LINK! The team has been notified.',
        'comments.enviar': '📨 Send Comment',
        'comments.placeholder.nome': 'Your name (optional)',
        'comments.placeholder.mensagem': 'Leave your comment, question or report...',
        'comments.radio.comentario': '💭 Comment',
        'comments.radio.duvida': '❓ Question',
        'comments.radio.quebrado': '⚠️ Broken Link',
        'comments.enviarBtn': '📨 Send',
        'comments.semComentarios': 'No comments yet. Be the first! 🎉',
        'comments.relatoQuebrado': '⚠️ User reported BROKEN LINK',
        'comments.duvida': '❓ Question',

        'footer.sobre.titulo': 'About the Project',
        'footer.sobre.texto': 'Community library with games, homebrews and apps for jailbroken PS4. Educational and non-profit project.',
        'footer.atalhos.titulo': 'Quick Links',
        'footer.categorias.titulo': 'Categories',
        'footer.sistema.titulo': 'System',
        'footer.direitos': '© 2026 PS4 Games Library. All rights reserved. Educational project.',

        'estado.vazio': '😕 No games found. Try another search or category.',
        'estado.carregando': '⏳ Loading library...',
        'estado.buscaVazia': 'Type to search...',
        'estado.resultados': 'result(s) found',
    },

    /* ===================
       ESPANHOL - ES-ES
       =================== */
    es: {
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Tu biblioteca completa de juegos PS4 para descargar',
        'header.busca.placeholder': 'Buscar juegos, categorías, firmware...',
        'header.todasCategorias': 'Todas las Categorías',
        'header.todasCategorias.tooltip': 'Ver catálogo completo',

        'nav.inicio': 'Inicio',
        'nav.catalogo': 'Catálogo',
        'nav.favoritos': 'Favoritos',
        'nav.categorias': 'Categorías',

        'hero.badge': '🎮 Biblioteca Actualizada',
        'hero.titulo': 'Miles de Juegos de PS4',
        'hero.subtitulo': 'Homebrews, Aplicaciones, Mods y los mejores lanzamientos. Todo en un solo lugar.',
        'hero.cta.verCatalogo': '📚 Ver Catálogo Completo',
        'hero.cta.verMaisBaixados': '🔥 Más Descargados',

        'donate.titulo': '💙 ¡Ayuda a mantener el proyecto!',
        'donate.texto': 'Si este sitio te está ayudando, considera una donación. ¡Cualquier ayuda sirve para pagar servidores y mantener la biblioteca actualizada!',
        'donate.chavePix': 'Clave',
        'donate.qrCodeAlt': 'Código QR',
        'donate.copiarChave': '📋 Copiar Clave',
        'donate.copiado': '✅ ¡Copiado!',

        'section.maisBaixados.titulo': '🔥 Más Descargados',
        'section.maisBaixados.subtitulo': 'Los juegos más populares de la semana',
        'section.maisBaixados.verTodos': 'Ver todos →',

        'section.recentes.titulo': '✨ Más Recientes',
        'section.recentes.subtitulo': 'Lanzamientos y actualizaciones nuevas en la biblioteca',
        'section.recentes.verTodos': 'Ver todos →',

        'section.catalogo.titulo': '📚 Catálogo Completo',
        'section.catalogo.subtitulo': 'Todos los juegos ordenados alfabéticamente',
        'section.catalogo.total': 'Total de juegos',
        'section.catalogo.filtroTodos': 'Todos',

        'game.baixar': '⬇ Descargar',
        'game.detalhes': 'ℹ Detalles',
        'game.favoritar': '⭐ Favorito',
        'game.desfavoritar': '⭐ Favoritado',
        'game.downloads': 'Descargas',
        'game.semCategoria': 'Sin categoría',

        'detalhes.voltar': '← Volver al Catálogo',
        'detalhes.infoBasica': '📋 Información Básica',
        'detalhes.categoria': 'Categoría',
        'detalhes.versao': 'Versión',
        'detalhes.tamanho': 'Tamaño',
        'detalhes.data': 'Fecha de Publicación',
        'detalhes.servidor': 'Servidor',
        'detalhes.downloads': 'Descargas',
        'detalhes.sinopse': '📖 Sinopsis',
        'detalhes.requisitos': '⚙ Requisitos / Compatibilidad',
        'detalhes.firmware': 'Firmware Mínimo',
        'detalhes.espaco': 'Espacio en Disco',
        'detalhes.trailer': '🎬 Tráiler / Gameplay',
        'detalhes.screenshots': '📸 Capturas',
        'detalhes.cta.botao': '⬇ Descargar Ahora',
        'detalhes.cta.aviso': 'Enlace directo de descarga en .pkg compatible con tu PS4',

        'comments.titulo': '💬 Comentarios y Reportes',
        'comments.alertaQuebrado': '🚨 ¡Este juego tiene reportes de ENLACE ROTO! El equipo ya fue avisado.',
        'comments.enviar': '📨 Enviar Comentario',
        'comments.placeholder.nome': 'Tu nombre (opcional)',
        'comments.placeholder.mensagem': 'Deja tu comentario, duda o reporte...',
        'comments.radio.comentario': '💭 Comentario',
        'comments.radio.duvida': '❓ Duda',
        'comments.radio.quebrado': '⚠️ Enlace Roto',
        'comments.enviarBtn': '📨 Enviar',
        'comments.semComentarios': '¡Aún no hay comentarios. Sé el primero! 🎉',
        'comments.relatoQuebrado': '⚠️ Usuario reportó ENLACE ROTO',
        'comments.duvida': '❓ Duda',

        'footer.sobre.titulo': 'Sobre el Proyecto',
        'footer.sobre.texto': 'Biblioteca comunitaria con juegos, homebrews y aplicaciones para PS4 con jailbreak. Proyecto educacional y sin fines de lucro.',
        'footer.atalhos.titulo': 'Accesos Directos',
        'footer.categorias.titulo': 'Categorías',
        'footer.sistema.titulo': 'Sistema',
        'footer.direitos': '© 2026 PS4 Games Library. Todos los derechos reservados. Proyecto educacional.',

        'estado.vazio': '😕 No se encontraron juegos. Prueba con otra búsqueda o categoría.',
        'estado.carregando': '⏳ Cargando biblioteca...',
        'estado.buscaVazia': 'Escribe para buscar...',
        'estado.resultados': 'resultado(s) encontrado(s)',
    }
};

const I18N_STORAGE_KEY = 'ps4games_lang';

function getCurrentLang() {
    var salva = localStorage.getItem(I18N_STORAGE_KEY);
    if (salva && I18N_LANGS[salva]) return salva;
    // Tenta detectar pelo navegador
    var nav = (navigator.language || 'pt').toLowerCase();
    if (nav.indexOf('pt') === 0) return 'pt';
    if (nav.indexOf('es') === 0) return 'es';
    if (nav.indexOf('en') === 0) return 'en';
    return 'pt';
}

function t(chave) {
    var lang = getCurrentLang();
    var dic = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS.pt;
    return dic[chave] || (I18N_TRANSLATIONS.pt[chave] || chave);
}

function setLang(langCode) {
    if (!I18N_LANGS[langCode]) langCode = 'pt';
    localStorage.setItem(I18N_STORAGE_KEY, langCode);
    applyI18n();
}

function applyI18n() {
    var lang = getCurrentLang();
    document.documentElement.setAttribute('lang', lang);

    // Atualiza atributos data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var chave = el.getAttribute('data-i18n');
        var texto = t(chave);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                el.value = texto;
            } else {
                el.setAttribute('placeholder', texto);
            }
        } else {
            el.textContent = texto;
        }
    });

    // Atualiza atributos data-i18n-attr
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el) {
        var raw = el.getAttribute('data-i18n-attr') || '';
        var parts = raw.split(':');
        if (parts.length >= 2) {
            var attr = parts[0].trim();
            var chave = parts.slice(1).join(':').trim();
            el.setAttribute(attr, t(chave));
        }
    });

    // Atualiza seletor visual (se existir)
    document.querySelectorAll('[data-lang-selected]').forEach(function(el) {
        el.textContent = I18N_LANGS[lang].bandeira + ' ' + I18N_LANGS[lang].nome;
    });
}

function renderLangDropdown(prefixoId) {
    var container = document.getElementById(prefixoId);
    if (!container) return;

    var lang = getCurrentLang();
    var html =
        '<div class="lang-dropdown" style="position: relative; display:inline-block;">' +
            '<button type="button" class="lang-trigger btn btn-secondary btn-sm" aria-haspopup="true" aria-expanded="false" style="display:flex; align-items:center; gap:6px;">' +
                '<span data-lang-selected>' + I18N_LANGS[lang].bandeira + ' ' + I18N_LANGS[lang].nome + '</span>' +
                '<i class="fas fa-chevron-down" style="font-size:10px; opacity:0.7;"></i>' +
            '</button>' +
            '<div class="lang-menu" role="menu" style="display:none; position:absolute; right:0; top:calc(100% + 6px); min-width:160px; background:var(--surface); border:1px solid var(--border); border-radius:10px; box-shadow:0 10px 40px rgba(0,0,0,0.5); padding:4px; z-index:9999;">';

    Object.keys(I18N_LANGS).forEach(function(code) {
        var info = I18N_LANGS[code];
        var active = code === lang;
        html +=
            '<button type="button" data-lang="' + code + '" role="menuitem" class="lang-option" ' +
                    'style="width:100%; text-align:left; padding:8px 12px; background:transparent; border:none; border-radius:6px; cursor:pointer; color:' +
                    (active ? 'var(--accent-primary)' : 'var(--text-primary)') +
                    '; display:flex; align-items:center; gap:8px; font-size:13px; font-weight:' +
                    (active ? '700' : '400') + ';">' +
                '<span style="font-size:16px;">' + info.bandeira + '</span>' +
                '<span>' + info.nome + '</span>' +
                (active ? '<i class="fas fa-check" style="margin-left:auto; color:var(--accent-primary);"></i>' : '') +
            '</button>';
    });

    html +=
            '</div>' +
        '</div>';

    container.innerHTML = html;

    // Eventos
    var trigger = container.querySelector('.lang-trigger');
    var menu = container.querySelector('.lang-menu');

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var aberto = menu.style.display === 'block';
        menu.style.display = aberto ? 'none' : 'block';
    });

    document.addEventListener('click', function() {
        menu.style.display = 'none';
    });

    container.querySelectorAll('.lang-option').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var code = btn.getAttribute('data-lang');
            setLang(code);
            menu.style.display = 'none';
            renderLangDropdown(prefixoId);
            // Em páginas com grids, atualiza também os títulos dinâmicos
            if (typeof window.updateDynamicTitles === 'function') {
                window.updateDynamicTitles();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    applyI18n();
});
