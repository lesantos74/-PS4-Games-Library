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
       PORTUGUÊS - PT-BR
       =================== */
    pt: {
        // Header
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Sua biblioteca completa de jogos PS4 para download',
        'header.busca.placeholder': 'Pesquisar jogos, categorias, firmware...',
        'header.busca.placeholderFav': 'Pesquisar nos favoritos...',
        'header.todasCategorias': 'Todas as Categorias',
        'header.todasCategorias.tooltip': 'Ver catálogo completo',

        // Navegação
        'nav.inicio': 'Início',
        'nav.jogos': 'Jogos',
        'nav.catalogo': 'Catálogo',
        'nav.favoritos': 'Favoritos',
        'nav.categorias': 'Categorias',
        'nav.maisBaixados': 'Mais Baixados',
        'nav.recentes': 'Recentes',

        // Hero / Banner principal
        'hero.badge': '🎮 Biblioteca Atualizada',
        'hero.titulo': 'Milhares de Jogos PS4',
        'hero.subtitulo': 'Homebrews, Aplicações, Mods e os melhores lançamentos. Tudo em um só lugar.',
        'hero.cta.verCatalogo': '📚 Ver Catálogo Completo',
        'hero.cta.verMaisBaixados': '🔥 Mais Baixados',

        // Caixa de Doação
        'donate.titulo': 'Ajude-nos a melhorar cada vez mais!',
        'donate.subtitulo': 'As doações são investidas diretamente em:',
        'donate.item.melhorias': 'Melhorias no site',
        'donate.item.recursos': 'Novos recursos',
        'donate.item.hospedagem': 'Hospedagem e manutenção',
        'donate.item.atualizacoes': 'Atualizações constantes',
        'donate.footerTexto': 'Escaneie o QR Code e contribua para o futuro deste projeto. Obrigado pelo seu apoio! 🎮❤️',
        'donate.pix.badge': 'PIX',
        'donate.pix.caption': 'Aponte a câmera do celular',
        'donate.paypal.badge': 'PayPal',
        'donate.paypal.caption': 'Escaneie para doar via PayPal',

        // Seções
        'section.categorias.titulo': 'Categorias',
        'section.categorias.verTodas': 'Ver todas',
        'section.maisBaixados.titulo': 'Mais Baixados',
        'section.maisBaixados.subtitulo': 'Os jogos mais populares da semana',
        'section.maisBaixados.verTodos': 'Ver todos',
        'section.recentes.titulo': 'Recentes',
        'section.recentes.subtitulo': 'Lançamentos e atualizações novas na biblioteca',
        'section.recentes.verTodos': 'Ver todos',
        'section.catalogo.titulo': 'Catálogo Completo',
        'section.catalogo.subtitulo': 'Todos os jogos organizados por ordem alfabética',
        'section.catalogo.total': 'Total de jogos',
        'section.catalogo.filtroTodos': 'Todos',

        // Contagem do catálogo
        'catalogo.jogosTotal': 'jogos no total',
        'catalogo.jogos': 'jogos',
        'catalogo.de': 'de',
        'catalogo.em': 'em',
        'catalogo.pesquisa': 'pesquisa',

        // Cartão de jogo
        'game.baixar': 'Baixar',
        'game.detalhes': 'Detalhes',
        'game.favoritar': 'Favorito',
        'game.desfavoritar': 'Favoritado',
        'game.downloads': 'Downloads',
        'game.semCategoria': 'Sem categoria',
        'game.semNome': 'Sem nome',
        'game.geral': 'Geral',
        'game.todos': 'Todos',
        'game.meta.tamanho': 'Tamanho',
        'game.meta.data': 'Data',
        'game.item': 'item',
        'game.itens': 'itens',

        // Banner carousel
        'banner.baixar': 'Baixar',
        'banner.verDetalhes': 'Ver Detalhes',
        'banner.semDescricao': 'Sem descrição',

        // Página: Categorias
        'categorias.titulo': 'Categorias',
        'categorias.subtitulo': 'Explore a nossa biblioteca organizada por categorias. Encontre o tipo de conteúdo perfeito para si.',
        'categorias.limparFiltro': 'Limpar filtro',
        'categorias.selecionada': 'Categoria:',

        // Página: Favoritos
        'favoritos.titulo': 'Meus Favoritos',
        'favoritos.subtitulo': 'Os seus jogos preferidos guardados num só lugar.',
        'favoritos.subtituloVazio': 'Ainda não tem favoritos. Comece por adicionar jogos aos seus favoritos!',
        'favoritos.semTitulo': 'Sem favoritos ainda',
        'favoritos.semDesc': 'Clique no coração nos cartões de jogos para os guardar aqui.',
        'favoritos.explorar': 'Explorar Catálogo',
        'favoritos.limparTodos': 'Limpar todos',
        'favoritos.contagem': 'jogo(s) favorito(s)',
        'favoritos.confirmarLimpar': 'Tem a certeza que deseja remover TODOS os favoritos?',
        'favoritos.removidos': 'Todos os favoritos foram removidos',

        // Página: Detalhes
        'detalhes.baixarServidor': 'Baixar (Servidor 1)',
        'detalhes.adicionarFavorito': 'Adicionar Favorito',
        'detalhes.removerFavorito': 'Remover Favorito',
        'detalhes.verCategoria': 'Ver Categoria',
        'detalhes.semDescricao': 'Sem descrição disponível.',
        'detalhes.requisitos': 'Requisitos',
        'detalhes.espacoDisco': 'Espaço em Disco',
        'detalhes.firmware': 'Firmware',
        'detalhes.servidor': 'Servidor',
        'detalhes.servidor1': 'Servidor 1',
        'detalhes.categoria': 'Categoria',
        'detalhes.versao': 'Versão',
        'detalhes.tamanho': 'Tamanho',
        'detalhes.lancamento': 'Lançamento',
        'detalhes.downloads': 'Downloads',
        'detalhes.galeria': 'Galeria',
        'detalhes.naoEncontrado': 'Jogo não encontrado',
        'detalhes.naoEncontradoDesc': 'O jogo que procura não existe ou foi removido.',
        'detalhes.voltarInicio': 'Voltar ao Início',

        // Comentários
        'comments.titulo': '💬 Comentários & Relatos',
        'comments.form.titulo': 'Deixe o seu comentário',
        'comments.label.nome': 'Seu nome',
        'comments.label.texto': 'Seu comentário',
        'comments.placeholder.nome': 'Como quer ser chamado?',
        'comments.placeholder.mensagem': 'Conte-nos o que achou do jogo, ou relate um problema com o download...',
        'comments.quebrado.label': 'Link de download não está a funcionar',
        'comments.publicar': 'Publicar Comentário',
        'comments.relatosCount': 'relato(s) de link quebrado neste jogo.',
        'comments.semTitulo': 'Sem comentários ainda',
        'comments.semDesc': 'Seja o primeiro a deixar a sua opinião sobre este jogo. Se o link de download não estiver a funcionar, marque a opção abaixo para avisar outros usuários.',
        'comments.anonimo': 'Anônimo',
        'comments.tagQuebrado': 'Link Quebrado',
        'comments.alertaQuebrado': '🚨 Este jogo tem relatos de LINK QUEBRADO! A equipe já foi avisada.',
        'comments.enviar': '📨 Enviar Comentário',
        'comments.enviarBtn': '📨 Enviar',
        'comments.semComentarios': 'Nenhum comentário ainda. Seja o primeiro! 🎉',

        // Footer
        'footer.sobre.titulo': 'Sobre o Projeto',
        'footer.sobre.texto': 'A sua biblioteca completa de jogos, aplicações, demos e homebrew autorizados para PlayStation 4. Conteúdos atualizados regularmente.',
        'footer.brand.texto': 'Biblioteca completa de jogos e conteúdos para PlayStation 4.',
        'footer.atalhos.titulo': 'Navegação',
        'footer.categorias.titulo': 'Categorias',
        'footer.topCategorias.titulo': 'Top Categorias',
        'footer.sistema.titulo': 'Sistema',
        'footer.direitos': '© 2026 PS4 Games Library. Todos os direitos reservados. Projeto educacional.',

        // Mensagens / Toast
        'msg.downloadIniciado': 'Download iniciado...',
        'msg.linkIndisponivel': 'Link de download não disponível',
        'msg.abrindoDownload': 'Abrindo página oficial de download...',
        'msg.preenchaNome': 'Preencha o nome e o comentário',
        'msg.relatoEnviado': 'Relato enviado! Obrigado pelo aviso.',
        'msg.comentarioPublicado': 'Comentário publicado com sucesso!',
        'msg.erroComentario': 'Erro ao publicar comentário',
        'msg.erroGuardarFavoritos': 'Erro ao guardar favoritos',
        'msg.removidoFavoritos': 'Removido dos favoritos',
        'msg.adicionadoFavoritos': 'Adicionado aos favoritos ♥',

        // Estados / Mensagens gerais
        'estado.vazio.titulo': 'Nenhum jogo encontrado',
        'estado.vazio.desc': 'Tente ajustar os filtros ou pesquisar outro termo.',
        'estado.vazio': '😕 Nenhum jogo encontrado. Tente outra busca ou categoria.',
        'estado.carregando': '⏳ Carregando biblioteca...',
        'estado.buscaVazia': 'Digite para pesquisar...',
        'estado.resultados': 'resultado(s) encontrado(s)',

        // Aviso legal / Disclaimer
        'disclaimer.titulo': 'Aviso Legal',
        'disclaimer.aria': 'Aviso legal de download',
        'disclaimer.texto': 'Os links de download disponibilizados nesta página são <strong>encontrados livremente na internet</strong>. Este site <strong>não hospeda nenhum arquivo</strong> em seus servidores — apenas indexa e compartilha endereços públicos. Todo o conteúdo aqui apresentado tem como único propósito <strong>fins educacionais e de estudo</strong>. Lembre-se: a <strong>pirataria é crime</strong>. Se gostar de um jogo, considere adquiri-lo oficialmente para apoiar os desenvolvedores.',

        // Archive.org
        'archive.aria': 'Informação de download no Archive.org',
        'archive.titulo': 'Este ficheiro está hospedado no Archive.org',
        'archive.texto': 'O jogo <strong>{jogo}</strong> está guardado em servidores do Internet Archive — uma biblioteca digital sem fins lucrativos. Para garantir a sua segurança, a autenticação é feita sempre no site oficial deles.',
        'archive.step1': 'Ao clicar em Baixar, abrirá a página oficial do arquivo no seu navegador.',
        'archive.step2': 'Se aparecer pedido de login, crie uma conta gratuita no Archive.org em 30 segundos (é opcional para muitos ficheiros).',
        'archive.step3': 'Se já tiver login feito no Archive.org noutra aba, o download inicia automaticamente.',
        'archive.nota': '💡 Conta gratuita dá acesso a downloads mais rápidos e ilimitados. Os seus dados permanecem sempre no site oficial do Archive.org — nunca pedimos a sua senha aqui.',
        'archive.fechar': 'Fechar',
        'archive.irDownload': 'Ir para Download no Archive.org',

        // Preview / Trailer
        'trailer.titulo': 'Preview & Trailer',
        'trailer.galeria': 'Galeria de imagens',
        'trailer.downloads': 'downloads',
        'trailer.abrirYouTube': 'Abrir no YouTube',
        'trailer.procurarTrailer': 'Procurar Trailer',
        'trailer.downloadVideo': 'Baixar Vídeo',
        'trailer.abrirTrailer': 'Abrir Trailer',
        'trailer.youtubeBloqueado': 'YouTube bloqueado? Use botões abaixo',
        'trailer.verTelaCheia': 'Ver em Tela Cheia',
        'trailer.anterior': 'Anterior',
        'trailer.pausar': 'Pausar',
        'trailer.seguinte': 'Seguinte',
        'msg.youtubeBloqueado': 'YouTube bloqueado nesta rede. Use os botões para abrir externamente.',

        // Tempo relativo
        'tempo.agora': 'agora mesmo',
        'tempo.min': 'min atrás',
        'tempo.h': 'h atrás',
        'tempo.dias': 'dias atrás',
    },

    /* ===================
       INGLÊS - EN-US
       =================== */
    en: {
        // Header
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Your complete PS4 games library for download',
        'header.busca.placeholder': 'Search games, categories, firmware...',
        'header.busca.placeholderFav': 'Search favorites...',
        'header.todasCategorias': 'All Categories',
        'header.todasCategorias.tooltip': 'See full catalog',

        // Navigation
        'nav.inicio': 'Home',
        'nav.jogos': 'Games',
        'nav.catalogo': 'Catalog',
        'nav.favoritos': 'Favorites',
        'nav.categorias': 'Categories',
        'nav.maisBaixados': 'Top Downloads',
        'nav.recentes': 'Recent',

        // Hero
        'hero.badge': '🎮 Updated Library',
        'hero.titulo': 'Thousands of PS4 Games',
        'hero.subtitulo': 'Homebrews, Apps, Mods and the best releases. All in one place.',
        'hero.cta.verCatalogo': '📚 See Full Catalog',
        'hero.cta.verMaisBaixados': '🔥 Top Downloads',

        // Donation
        'donate.titulo': 'Help us keep improving!',
        'donate.subtitulo': 'Donations are invested directly in:',
        'donate.item.melhorias': 'Website improvements',
        'donate.item.recursos': 'New features',
        'donate.item.hospedagem': 'Hosting and maintenance',
        'donate.item.atualizacoes': 'Constant updates',
        'donate.footerTexto': 'Scan the QR Code and contribute to the future of this project. Thank you for your support! 🎮❤️',
        'donate.pix.badge': 'PIX',
        'donate.pix.caption': 'Point your phone camera',
        'donate.paypal.badge': 'PayPal',
        'donate.paypal.caption': 'Scan to donate via PayPal',

        // Sections
        'section.categorias.titulo': 'Categories',
        'section.categorias.verTodas': 'See all',
        'section.maisBaixados.titulo': 'Most Downloaded',
        'section.maisBaixados.subtitulo': 'The most popular games of the week',
        'section.maisBaixados.verTodos': 'See all',
        'section.recentes.titulo': 'Recent',
        'section.recentes.subtitulo': 'New releases and fresh updates in the library',
        'section.recentes.verTodos': 'See all',
        'section.catalogo.titulo': 'Complete Catalog',
        'section.catalogo.subtitulo': 'All games sorted alphabetically',
        'section.catalogo.total': 'Total games',
        'section.catalogo.filtroTodos': 'All',

        // Catalog count
        'catalogo.jogosTotal': 'games in total',
        'catalogo.jogos': 'games',
        'catalogo.de': 'of',
        'catalogo.em': 'in',
        'catalogo.pesquisa': 'search',

        // Game card
        'game.baixar': 'Download',
        'game.detalhes': 'Details',
        'game.favoritar': 'Favorite',
        'game.desfavoritar': 'Favorited',
        'game.downloads': 'Downloads',
        'game.semCategoria': 'Uncategorized',
        'game.semNome': 'Untitled',
        'game.geral': 'General',
        'game.todos': 'All',
        'game.meta.tamanho': 'Size',
        'game.meta.data': 'Date',
        'game.item': 'item',
        'game.itens': 'items',

        // Banner carousel
        'banner.baixar': 'Download',
        'banner.verDetalhes': 'View Details',
        'banner.semDescricao': 'No description',

        // Page: Categories
        'categorias.titulo': 'Categories',
        'categorias.subtitulo': 'Explore our library organized by categories. Find the perfect type of content for you.',
        'categorias.limparFiltro': 'Clear filter',
        'categorias.selecionada': 'Category:',

        // Page: Favorites
        'favoritos.titulo': 'My Favorites',
        'favoritos.subtitulo': 'Your favorite games saved in one place.',
        'favoritos.subtituloVazio': "You don't have favorites yet. Start adding games to your favorites!",
        'favoritos.semTitulo': 'No favorites yet',
        'favoritos.semDesc': 'Click the heart on game cards to save them here.',
        'favoritos.explorar': 'Explore Catalog',
        'favoritos.limparTodos': 'Clear all',
        'favoritos.contagem': 'favorite game(s)',
        'favoritos.confirmarLimpar': 'Are you sure you want to remove ALL favorites?',
        'favoritos.removidos': 'All favorites have been removed',

        // Page: Details
        'detalhes.baixarServidor': 'Download (Server 1)',
        'detalhes.adicionarFavorito': 'Add Favorite',
        'detalhes.removerFavorito': 'Remove Favorite',
        'detalhes.verCategoria': 'View Category',
        'detalhes.semDescricao': 'No description available.',
        'detalhes.requisitos': 'Requirements',
        'detalhes.espacoDisco': 'Disk Space',
        'detalhes.firmware': 'Firmware',
        'detalhes.servidor': 'Server',
        'detalhes.servidor1': 'Server 1',
        'detalhes.categoria': 'Category',
        'detalhes.versao': 'Version',
        'detalhes.tamanho': 'Size',
        'detalhes.lancamento': 'Release',
        'detalhes.downloads': 'Downloads',
        'detalhes.galeria': 'Gallery',
        'detalhes.naoEncontrado': 'Game not found',
        'detalhes.naoEncontradoDesc': "The game you're looking for doesn't exist or was removed.",
        'detalhes.voltarInicio': 'Back to Home',

        // Comments
        'comments.titulo': '💬 Comments & Reports',
        'comments.form.titulo': 'Leave your comment',
        'comments.label.nome': 'Your name',
        'comments.label.texto': 'Your comment',
        'comments.placeholder.nome': 'What should we call you?',
        'comments.placeholder.mensagem': 'Tell us what you thought of the game, or report a problem with the download...',
        'comments.quebrado.label': 'Download link is not working',
        'comments.publicar': 'Publish Comment',
        'comments.relatosCount': 'report(s) of broken link in this game.',
        'comments.semTitulo': 'No comments yet',
        'comments.semDesc': 'Be the first to share your opinion about this game. If the download link is not working, check the option below to warn other users.',
        'comments.anonimo': 'Anonymous',
        'comments.tagQuebrado': 'Broken Link',
        'comments.alertaQuebrado': '🚨 This game has reports of BROKEN LINK! The team has been notified.',
        'comments.enviar': '📨 Send Comment',
        'comments.enviarBtn': '📨 Send',
        'comments.semComentarios': 'No comments yet. Be the first! 🎉',

        // Footer
        'footer.sobre.titulo': 'About the Project',
        'footer.sobre.texto': 'Your complete library of games, apps, demos and authorized homebrew for PlayStation 4. Content updated regularly.',
        'footer.brand.texto': 'Complete library of games and content for PlayStation 4.',
        'footer.atalhos.titulo': 'Navigation',
        'footer.categorias.titulo': 'Categories',
        'footer.topCategorias.titulo': 'Top Categories',
        'footer.sistema.titulo': 'System',
        'footer.direitos': '© 2026 PS4 Games Library. All rights reserved. Educational project.',

        // Messages / Toast
        'msg.downloadIniciado': 'Download started...',
        'msg.linkIndisponivel': 'Download link not available',
        'msg.abrindoDownload': 'Opening official download page...',
        'msg.preenchaNome': 'Please fill in your name and comment',
        'msg.relatoEnviado': 'Report sent! Thanks for the heads-up.',
        'msg.comentarioPublicado': 'Comment published successfully!',
        'msg.erroComentario': 'Error publishing comment',
        'msg.erroGuardarFavoritos': 'Error saving favorites',
        'msg.removidoFavoritos': 'Removed from favorites',
        'msg.adicionadoFavoritos': 'Added to favorites ♥',

        // States
        'estado.vazio.titulo': 'No games found',
        'estado.vazio.desc': 'Try adjusting the filters or searching for another term.',
        'estado.vazio': '😕 No games found. Try another search or category.',
        'estado.carregando': '⏳ Loading library...',
        'estado.buscaVazia': 'Type to search...',
        'estado.resultados': 'result(s) found',

        // Legal notice / Disclaimer
        'disclaimer.titulo': 'Legal Notice',
        'disclaimer.aria': 'Download legal notice',
        'disclaimer.texto': 'The download links provided on this page are <strong>freely found on the internet</strong>. This site <strong>does not host any file</strong> on its servers — it only indexes and shares public addresses. All content presented here is for <strong>educational and study purposes only</strong>. Remember: <strong>piracy is a crime</strong>. If you enjoy a game, consider buying it officially to support the developers.',

        // Archive.org
        'archive.aria': 'Archive.org download information',
        'archive.titulo': 'This file is hosted on Archive.org',
        'archive.texto': 'The game <strong>{jogo}</strong> is stored on Internet Archive servers — a non-profit digital library. To ensure your safety, authentication is always done on their official site.',
        'archive.step1': 'When you click Download, the official file page will open in your browser.',
        'archive.step2': 'If a login prompt appears, create a free Archive.org account in 30 seconds (optional for many files).',
        'archive.step3': 'If you are already logged into Archive.org in another tab, the download starts automatically.',
        'archive.nota': '💡 A free account gives access to faster and unlimited downloads. Your data always stays on the official Archive.org site — we never ask for your password here.',
        'archive.fechar': 'Close',
        'archive.irDownload': 'Go to Download on Archive.org',

        // Preview / Trailer
        'trailer.titulo': 'Preview & Trailer',
        'trailer.galeria': 'Image gallery',
        'trailer.downloads': 'downloads',
        'trailer.abrirYouTube': 'Open on YouTube',
        'trailer.procurarTrailer': 'Search Trailer',
        'trailer.downloadVideo': 'Download Video',
        'trailer.abrirTrailer': 'Open Trailer',
        'trailer.youtubeBloqueado': 'YouTube blocked? Use the buttons below',
        'trailer.verTelaCheia': 'View Fullscreen',
        'trailer.anterior': 'Previous',
        'trailer.pausar': 'Pause',
        'trailer.seguinte': 'Next',
        'msg.youtubeBloqueado': 'YouTube blocked on this network. Use the buttons to open externally.',

        // Relative time
        'tempo.agora': 'just now',
        'tempo.min': 'min ago',
        'tempo.h': 'h ago',
        'tempo.dias': 'days ago',
    },

    /* ===================
       ESPANHOL - ES-ES
       =================== */
    es: {
        // Header
        'header.titulo': 'PS4 Games Library',
        'header.subtitulo': 'Tu biblioteca completa de juegos PS4 para descargar',
        'header.busca.placeholder': 'Buscar juegos, categorías, firmware...',
        'header.busca.placeholderFav': 'Buscar en favoritos...',
        'header.todasCategorias': 'Todas las Categorías',
        'header.todasCategorias.tooltip': 'Ver catálogo completo',

        // Navegación
        'nav.inicio': 'Inicio',
        'nav.jogos': 'Juegos',
        'nav.catalogo': 'Catálogo',
        'nav.favoritos': 'Favoritos',
        'nav.categorias': 'Categorías',
        'nav.maisBaixados': 'Más Descargados',
        'nav.recentes': 'Recientes',

        // Hero
        'hero.badge': '🎮 Biblioteca Actualizada',
        'hero.titulo': 'Miles de Juegos de PS4',
        'hero.subtitulo': 'Homebrews, Aplicaciones, Mods y los mejores lanzamientos. Todo en un solo lugar.',
        'hero.cta.verCatalogo': '📚 Ver Catálogo Completo',
        'hero.cta.verMaisBaixados': '🔥 Más Descargados',

        // Donación
        'donate.titulo': '¡Ayúdanos a mejorar cada vez más!',
        'donate.subtitulo': 'Las donaciones se invierten directamente en:',
        'donate.item.melhorias': 'Mejoras en el sitio',
        'donate.item.recursos': 'Nuevos recursos',
        'donate.item.hospedagem': 'Hosting y mantenimiento',
        'donate.item.atualizacoes': 'Actualizaciones constantes',
        'donate.footerTexto': 'Escanea el Código QR y contribuye al futuro de este proyecto. ¡Gracias por tu apoyo! 🎮❤️',
        'donate.pix.badge': 'PIX',
        'donate.pix.caption': 'Apunta la cámara del móvil',
        'donate.paypal.badge': 'PayPal',
        'donate.paypal.caption': 'Escanea para donar vía PayPal',

        // Secciones
        'section.categorias.titulo': 'Categorías',
        'section.categorias.verTodas': 'Ver todas',
        'section.maisBaixados.titulo': 'Más Descargados',
        'section.maisBaixados.subtitulo': 'Los juegos más populares de la semana',
        'section.maisBaixados.verTodos': 'Ver todos',
        'section.recentes.titulo': 'Recientes',
        'section.recentes.subtitulo': 'Lanzamientos y actualizaciones nuevas en la biblioteca',
        'section.recentes.verTodos': 'Ver todos',
        'section.catalogo.titulo': 'Catálogo Completo',
        'section.catalogo.subtitulo': 'Todos los juegos ordenados alfabéticamente',
        'section.catalogo.total': 'Total de juegos',
        'section.catalogo.filtroTodos': 'Todos',

        // Contador del catálogo
        'catalogo.jogosTotal': 'juegos en total',
        'catalogo.jogos': 'juegos',
        'catalogo.de': 'de',
        'catalogo.em': 'en',
        'catalogo.pesquisa': 'búsqueda',

        // Tarjeta de juego
        'game.baixar': 'Descargar',
        'game.detalhes': 'Detalles',
        'game.favoritar': 'Favorito',
        'game.desfavoritar': 'Favorito',
        'game.downloads': 'Descargas',
        'game.semCategoria': 'Sin categoría',
        'game.semNome': 'Sin nombre',
        'game.geral': 'General',
        'game.todos': 'Todos',
        'game.meta.tamanho': 'Tamaño',
        'game.meta.data': 'Fecha',
        'game.item': 'elemento',
        'game.itens': 'elementos',

        // Banner carousel
        'banner.baixar': 'Descargar',
        'banner.verDetalhes': 'Ver Detalles',
        'banner.semDescricao': 'Sin descripción',

        // Página: Categorías
        'categorias.titulo': 'Categorías',
        'categorias.subtitulo': 'Explora nuestra biblioteca organizada por categorías. Encuentra el tipo de contenido perfecto para ti.',
        'categorias.limparFiltro': 'Limpiar filtro',
        'categorias.selecionada': 'Categoría:',

        // Página: Favoritos
        'favoritos.titulo': 'Mis Favoritos',
        'favoritos.subtitulo': 'Tus juegos favoritos guardados en un solo lugar.',
        'favoritos.subtituloVazio': '¡Aún no tienes favoritos. Empieza a añadir juegos a tus favoritos!',
        'favoritos.semTitulo': 'Aún no hay favoritos',
        'favoritos.semDesc': 'Haz clic en el corazón de las tarjetas de juegos para guardarlos aquí.',
        'favoritos.explorar': 'Explorar Catálogo',
        'favoritos.limparTodos': 'Limpiar todos',
        'favoritos.contagem': 'juego(s) favorito(s)',
        'favoritos.confirmarLimpar': '¿Seguro que deseas eliminar TODOS los favoritos?',
        'favoritos.removidos': 'Todos los favoritos han sido eliminados',

        // Página: Detalles
        'detalhes.baixarServidor': 'Descargar (Servidor 1)',
        'detalhes.adicionarFavorito': 'Añadir Favorito',
        'detalhes.removerFavorito': 'Quitar Favorito',
        'detalhes.verCategoria': 'Ver Categoría',
        'detalhes.semDescricao': 'Sin descripción disponible.',
        'detalhes.requisitos': 'Requisitos',
        'detalhes.espacoDisco': 'Espacio en Disco',
        'detalhes.firmware': 'Firmware',
        'detalhes.servidor': 'Servidor',
        'detalhes.servidor1': 'Servidor 1',
        'detalhes.categoria': 'Categoría',
        'detalhes.versao': 'Versión',
        'detalhes.tamanho': 'Tamaño',
        'detalhes.lancamento': 'Lanzamiento',
        'detalhes.downloads': 'Descargas',
        'detalhes.galeria': 'Galería',
        'detalhes.naoEncontrado': 'Juego no encontrado',
        'detalhes.naoEncontradoDesc': 'El juego que buscas no existe o fue eliminado.',
        'detalhes.voltarInicio': 'Volver al Inicio',

        // Comentarios
        'comments.titulo': '💬 Comentarios y Reportes',
        'comments.form.titulo': 'Deja tu comentario',
        'comments.label.nome': 'Tu nombre',
        'comments.label.texto': 'Tu comentario',
        'comments.placeholder.nome': '¿Cómo quieres que te llamemos?',
        'comments.placeholder.mensagem': 'Cuéntanos qué te pareció el juego, o reporta un problema con la descarga...',
        'comments.quebrado.label': 'El enlace de descarga no funciona',
        'comments.publicar': 'Publicar Comentario',
        'comments.relatosCount': 'reporte(s) de enlace roto en este juego.',
        'comments.semTitulo': 'Aún no hay comentarios',
        'comments.semDesc': 'Sé el primero en dejar tu opinión sobre este juego. Si el enlace de descarga no funciona, marca la opción de abajo para avisar a otros usuarios.',
        'comments.anonimo': 'Anónimo',
        'comments.tagQuebrado': 'Enlace Roto',
        'comments.alertaQuebrado': '🚨 ¡Este juego tiene reportes de ENLACE ROTO! El equipo ya fue avisado.',
        'comments.enviar': '📨 Enviar Comentario',
        'comments.enviarBtn': '📨 Enviar',
        'comments.semComentarios': '¡Aún no hay comentarios. Sé el primero! 🎉',

        // Footer
        'footer.sobre.titulo': 'Sobre el Proyecto',
        'footer.sobre.texto': 'Tu biblioteca completa de juegos, aplicaciones, demos y homebrew autorizados para PlayStation 4. Contenido actualizado regularmente.',
        'footer.brand.texto': 'Biblioteca completa de juegos y contenidos para PlayStation 4.',
        'footer.atalhos.titulo': 'Navegación',
        'footer.categorias.titulo': 'Categorías',
        'footer.topCategorias.titulo': 'Top Categorías',
        'footer.sistema.titulo': 'Sistema',
        'footer.direitos': '© 2026 PS4 Games Library. Todos los derechos reservados. Proyecto educacional.',

        // Mensajes / Toast
        'msg.downloadIniciado': 'Descarga iniciada...',
        'msg.linkIndisponivel': 'Enlace de descarga no disponible',
        'msg.abrindoDownload': 'Abriendo la página oficial de descarga...',
        'msg.preenchaNome': 'Completa tu nombre y comentario',
        'msg.relatoEnviado': '¡Reporte enviado! Gracias por el aviso.',
        'msg.comentarioPublicado': '¡Comentario publicado con éxito!',
        'msg.erroComentario': 'Error al publicar el comentario',
        'msg.erroGuardarFavoritos': 'Error al guardar favoritos',
        'msg.removidoFavoritos': 'Eliminado de favoritos',
        'msg.adicionadoFavoritos': 'Añadido a favoritos ♥',

        // Estados
        'estado.vazio.titulo': 'No se encontraron juegos',
        'estado.vazio.desc': 'Intenta ajustar los filtros o buscar otro término.',
        'estado.vazio': '😕 No se encontraron juegos. Prueba con otra búsqueda o categoría.',
        'estado.carregando': '⏳ Cargando biblioteca...',
        'estado.buscaVazia': 'Escribe para buscar...',
        'estado.resultados': 'resultado(s) encontrado(s)',

        // Aviso legal / Disclaimer
        'disclaimer.titulo': 'Aviso Legal',
        'disclaimer.aria': 'Aviso legal de descarga',
        'disclaimer.texto': 'Los enlaces de descarga disponibles en esta página son <strong>encontrados libremente en internet</strong>. Este sitio <strong>no aloja ningún archivo</strong> en sus servidores — solo indexa y comparte direcciones públicas. Todo el contenido aquí presentado tiene como único propósito <strong>fines educativos y de estudio</strong>. Recuerda: la <strong>piratería es un delito</strong>. Si te gusta un juego, considera comprarlo oficialmente para apoyar a los desarrolladores.',

        // Archive.org
        'archive.aria': 'Información de descarga en Archive.org',
        'archive.titulo': 'Este archivo está alojado en Archive.org',
        'archive.texto': 'El juego <strong>{jogo}</strong> está guardado en servidores de Internet Archive — una biblioteca digital sin ánimo de lucro. Para garantizar tu seguridad, la autenticación se realiza siempre en su sitio oficial.',
        'archive.step1': 'Al hacer clic en Descargar, se abrirá la página oficial del archivo en tu navegador.',
        'archive.step2': 'Si aparece una solicitud de inicio de sesión, crea una cuenta gratuita en Archive.org en 30 segundos (es opcional para muchos archivos).',
        'archive.step3': 'Si ya has iniciado sesión en Archive.org en otra pestaña, la descarga comienza automáticamente.',
        'archive.nota': '💡 Una cuenta gratuita da acceso a descargas más rápidas e ilimitadas. Tus datos permanecen siempre en el sitio oficial de Archive.org — nunca pedimos tu contraseña aquí.',
        'archive.fechar': 'Cerrar',
        'archive.irDownload': 'Ir a Descargar en Archive.org',

        // Preview / Trailer
        'trailer.titulo': 'Vista Previa y Tráiler',
        'trailer.galeria': 'Galería de imágenes',
        'trailer.downloads': 'descargas',
        'trailer.abrirYouTube': 'Abrir en YouTube',
        'trailer.procurarTrailer': 'Buscar Tráiler',
        'trailer.downloadVideo': 'Descargar Vídeo',
        'trailer.abrirTrailer': 'Abrir Tráiler',
        'trailer.youtubeBloqueado': '¿YouTube bloqueado? Usa los botones de abajo',
        'trailer.verTelaCheia': 'Ver en Pantalla Completa',
        'trailer.anterior': 'Anterior',
        'trailer.pausar': 'Pausar',
        'trailer.seguinte': 'Siguiente',
        'msg.youtubeBloqueado': 'YouTube bloqueado en esta red. Usa los botones para abrir externamente.',

        // Tiempo relativo
        'tempo.agora': 'ahora mismo',
        'tempo.min': 'min atrás',
        'tempo.h': 'h atrás',
        'tempo.dias': 'días atrás',
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
    if (typeof window.updateDynamicTitles === 'function') {
        window.updateDynamicTitles();
    }
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
            '<div class="lang-menu" role="menu" style="display:none; position:absolute; right:0; top:calc(100% + 6px); min-width:160px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:10px; box-shadow:0 10px 40px rgba(0,0,0,0.5); padding:4px; z-index:9999;">';

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
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    applyI18n();
});
