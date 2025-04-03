# Genius Game - React Native

Este projeto é uma implementação do clássico jogo Genius em React Native. O jogo testa a memória do jogador, apresentando uma sequência de cores que deve ser repetida na ordem correta.

## Funcionalidades

-   **Sequência de Cores:** O jogo gera sequências de cores crescentes.
-   **Níveis de Dificuldade:** Três níveis de dificuldade (fácil, médio e difícil) que afetam a velocidade da sequência e o número de cores.
-   **Interface Interativa:** Botões coloridos para interação do jogador.
-   **Feedback Visual:** As cores piscam para indicar a sequência.
-   **Controle de Jogo:** Botão para iniciar o jogo e seleção de dificuldade.
-   **Game Over:** Alerta quando o jogador erra a sequência.
-   **Sequência Reversa:** No modo difícil, a sequência deve ser repetida em ordem inversa.

## Como Executar

1.  **Pré-requisitos:**
    -   Node.js e npm (ou yarn) instalados.
    -   Expo CLI instalado (`npm install -g expo-cli`).
    -   Um emulador de Android/iOS ou um dispositivo físico com o aplicativo Expo Go instalado.

2.  **Instalação:**
    -   Clone este repositório.
    -   Navegue até o diretório do projeto no terminal.
    -   Execute `npm install` ou `yarn install` para instalar as dependências.

3.  **Execução:**
    -   Execute `expo start` para iniciar o servidor de desenvolvimento.
    -   Use o aplicativo Expo Go no seu dispositivo móvel para escanear o código QR exibido no terminal, ou execute em emulador.

## Estrutura do Código

-   `App.js`: Contém a lógica principal do jogo e a interface do usuário.
-   `styles`: Contém os estilos para os componentes da interface do usuário.
-   `colors`: Array que armazena as cores do jogo.
-   `sequence`: Estado que armazena a sequência de cores gerada pelo jogo.
-   `playerSequence`: Estado que armazena a sequência de cores inserida pelo jogador.
-   `isPlaying`: Estado que indica se o jogo está em andamento.
-   `isShowingSequence`: Estado que indica se a sequência está sendo exibida.
-   `level`: Estado que armazena o nível atual do jogo.
-   `difficulty`: Estado que armazena a dificuldade atual do jogo.
-   `flashingColor`: estado que armazena a cor que esta piscando no momento.
-   `getSettings()`: Função que retorna as configurações do jogo com base na dificuldade selecionada.
-   `startGame()`: Função que inicia um novo jogo.
-   `addToSequence()`: Função que adiciona uma nova cor à sequência.
-   `showSequence()`: Função que exibe a sequência de cores para o jogador.
-   `handlePress()`: Função que lida com o clique do jogador nos botões de cor.
-   `changeDifficulty()`: Função que altera a dificuldade do jogo.

## Estilos

Os estilos são definidos usando `StyleSheet.create` do React Native. As cores dos botões são definidas dinamicamente com base no array de cores.

## Dependências

-   `react`: Biblioteca principal do React.
-   `react-native`: Biblioteca para desenvolvimento de aplicativos móveis com React.

## Melhorias Futuras

-   Adicionar sons para cada cor.
-   Implementar um sistema de pontuação.
-   Melhorar a interface do usuário com animações.
-   Adicionar mais níveis de dificuldade.
-   Persistência de dados para salvar pontuações e níveis.
