# ================================================================
#  SCRIPT DEPLOY AUTOMATICO - SINCRONIZAR CATALOGO NO GITHUB
#  Como usar:
#  PASSO 1 (ESCOLHA UMA OPCAO):
#    - Opcao A: Abra "sincronizar-jogos.html" (se ja tem jogos no navegador)
#    - Opcao B: Abra "importar-txt.html"   (se tem seus jogos salvos em .TXT)
#    Clique no botao para BAIXAR o arquivo "jogos.json".
#    (O download vai automaticamente para a pasta Downloads)
#
#  PASSO 2: Clique 2x neste arquivo (deploy-catalogo.ps1)
#           Ou clique com botao direito > Executar com PowerShell
#
#  O script copia o JSON para data/jogos.json e faz git push automaticamente.
# ================================================================

$ErrorActionPreference = "Stop"
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DEPLOY AUTOMATICO - SINCRONIZAR CATALOGO" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$projeto = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataFolder = Join-Path $projeto "data"
$destino = Join-Path $dataFolder "jogos.json"
$downloads = Join-Path $env:USERPROFILE "Downloads"

if (-not (Test-Path $dataFolder)) {
    Write-Host "[ERRO] Pasta data/ nao encontrada em: $dataFolder" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[1/5] Procurando jogos.json na pasta Downloads..." -ForegroundColor Yellow
$arquivos = Get-ChildItem -Path $downloads -Filter "jogos*.json" -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending

if (-not $arquivos -or $arquivos.Count -eq 0) {
    Write-Host ""
    Write-Host "[ERRO] Nenhum arquivo jogos*.json foi encontrado em Downloads." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Antes de rodar este script, VOCE PRECISA ESCOLHER UMA OPCAO:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  OPCAO A - Se ja tem jogos salvos no seu navegador:" -ForegroundColor White
    Write-Host "    1. Abrir sincronizar-jogos.html no seu navegador" -ForegroundColor White
    Write-Host "    2. Clicar no botao VERDE > Baixar jogos.json" -ForegroundColor White
    Write-Host ""
    Write-Host "  OPCAO B - Se criou um arquivo .TXT com os seus jogos:" -ForegroundColor White
    Write-Host "    1. Abrir importar-txt.html no seu navegador" -ForegroundColor White
    Write-Host "    2. Colar o conteudo do TXT no campo indicado" -ForegroundColor White
    Write-Host "    3. Clicar em 'CONVERTER TXT -> JOGOS' e depois em 'SALVAR NO CATALOGO'" -ForegroundColor White
    Write-Host ""
    Write-Host "  Depois de baixar o jogos.json, rode este script NOVAMENTE." -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

$maisRecente = $arquivos[0]
Write-Host "      Arquivo mais novo encontrado:" -ForegroundColor Gray
Write-Host "      Nome    : $($maisRecente.Name)" -ForegroundColor Gray
Write-Host "      Tamanho : $([math]::Round($maisRecente.Length / 1KB, 2)) KB" -ForegroundColor Gray
Write-Host "      Data    : $($maisRecente.LastWriteTime)" -ForegroundColor Gray
Write-Host ""

try {
    $conteudo = Get-Content -Path $maisRecente.FullName -Raw -Encoding UTF8
    $json = $conteudo | ConvertFrom-Json -ErrorAction Stop
    $qtd = ($json | Measure-Object).Count
    if ($qtd -eq 0) { throw "Arquivo vazio (0 jogos)" }
    Write-Host "[2/5] Arquivo VALIDO! Contem $qtd jogo(s)." -ForegroundColor Green
    foreach ($g in ($json | Select-Object -First 5)) {
        Write-Host "        - $($g.nome) [$($g.categoria)]" -ForegroundColor Gray
    }
    if ($qtd -gt 5) {
        Write-Host "        ... e mais $($qtd - 5) jogo(s)." -ForegroundColor Gray
    }
    Write-Host ""
} catch {
    Write-Host "[ERRO] O arquivo baixado NAO e valido: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[3/5] Copiando para a pasta data/ do projeto..." -ForegroundColor Yellow
Copy-Item -Path $maisRecente.FullName -Destination $destino -Force
Write-Host "      OK -> $destino" -ForegroundColor Green
Write-Host ""

Write-Host "[4/5] Verificando Git..." -ForegroundColor Yellow
Set-Location $projeto
$temGit = Test-Path (Join-Path $projeto ".git")
if (-not $temGit) {
    Write-Host "[AVISO] Pasta .git nao encontrada. Pulando Git." -ForegroundColor DarkYellow
    Write-Host ""
    Write-Host "SUCESSO! O arquivo data/jogos.json foi atualizado na sua pasta." -ForegroundColor Green
    Write-Host "Agora va no GitHub Desktop e faca Commit & Push manualmente." -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 0
}

try {
    $status = git status --porcelain 2>&1
    if ([string]::IsNullOrWhiteSpace($status)) {
        Write-Host "      Nenhuma alteracao para commitar (ja esta atualizado?)" -ForegroundColor DarkYellow
        Write-Host ""
        Write-Host "Concluido sem alteracoes pendentes." -ForegroundColor Green
        Read-Host "Pressione Enter para sair"
        exit 0
    }

    git add data/jogos.json
    Write-Host "      git add data/jogos.json  [OK]" -ForegroundColor Green
    $msg = "Sincroniza catalogo com $qtd jogo(s) - $(Get-Date -Format 'dd/MM/yyyy HH:mm')"
    git commit -m $msg | Out-Null
    Write-Host "      git commit  [OK] -> $msg" -ForegroundColor Green

    Write-Host ""
    Write-Host "[5/5] Fazendo git push..." -ForegroundColor Yellow
    $resultado = git push 2>&1
    Write-Host "      $resultado" -ForegroundColor Gray
} catch {
    Write-Host "[ERRO] Falha no Git: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Tente fazer manualmente com:" -ForegroundColor Yellow
    Write-Host "   git add data/jogos.json ; git commit -m 'catalogo novo' ; git push" -ForegroundColor White
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   SUCESSO! Tudo feito." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  - $qtd jogo(s) copiados para data/jogos.json" -ForegroundColor White
Write-Host "  - Commit enviado para o GitHub" -ForegroundColor White
Write-Host ""
Write-Host "  Aguarde 1-2 minutos e acesse:" -ForegroundColor Cyan
Write-Host "  https://lesantos74.github.io/-PS4-Games-Library/" -ForegroundColor White
Write-Host ""
Write-Host "  Para testar como visitante NOVO, abra no MODO ANONIMO." -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
