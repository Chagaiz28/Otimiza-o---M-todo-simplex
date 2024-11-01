# Projeto de Resolução do Método Simplex

Este projeto é uma aplicação web que permite resolver problemas de Programação Linear utilizando o método Simplex. A aplicação conta com um back-end em Python (usando Flask) para processar as operações do Simplex e um front-end em React para a interface de usuário, onde os usuários podem inserir parâmetros e visualizar os resultados.

## Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Exemplo de Uso](#exemplo-de-uso)
- [Possíveis Expansões](#possíveis-expansões)
- [Contribuição](#contribuição)

## Descrição do Projeto

Este projeto permite que o usuário insira uma função objetivo e um conjunto de restrições para resolver problemas de maximização linear através do método Simplex. O back-end em Python utiliza Flask para expor uma API que executa o algoritmo, enquanto o front-end em React oferece uma interface intuitiva para que o usuário possa inserir dados e visualizar os resultados em tempo real.

### Principais Funcionalidades
- **Interface de Usuário (React)**: Permite a inserção da função objetivo e das restrições.
- **API para Processamento (Flask)**: Implementação do algoritmo Simplex em Python, responsável pelo cálculo da solução ótima.
- **Resultados Interativos**: Exibe a solução ótima, valor ótimo da função objetivo e preços sombra na interface do usuário.

## Estrutura de Arquivos

```plaintext
simplex-project/
│
├── backend/                           # Backend do projeto
│   ├── app.py                         # Arquivo principal do Flask para rodar a API
│   ├── simplex.py                     # Implementação do método Simplex em Python
│   ├── requirements.txt               # Dependências do backend
│   └── README.md                      # Documentação do backend
│
├── frontend/                          # Frontend do projeto
│   ├── public/                        # Arquivos públicos do React
│   ├── src/                           # Código-fonte do React
│   │   ├── App.js                     # Componente principal do React
│   │   ├── api/                       # Configuração da comunicação com a API
│   │   └── components/                # Componentes React para entradas e resultados
│   ├── package.json                   # Dependências do frontend
│   └── README.md                      # Documentação do frontend
│
└── README.md                          # Documentação geral do projeto
