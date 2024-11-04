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
Otimiza-o---M-todo-simplex/
├── backend/                           # Backend do projeto
│   ├── app/                           # Diretório da aplicação Flask
│   │   ├── __init__.py                # Inicialização da aplicação Flask
│   │   ├── simplex.py                 # Implementação do método Simplex em Python
│   │   ├── routes.py                  # Definição das rotas da API
│   ├── requirements.txt               # Dependências do backend
│   ├── run.py                         # Arquivo para rodar a aplicação Flask
│   └── venv/                          # Ambiente virtual do Python
├── frontend/                          # Frontend do projeto
│   ├── public/                        # Arquivos públicos do React
│   ├── src/                           # Código-fonte do React
│   │   ├── components/                # Componentes React para entradas e resultados
│   │   │   ├── SimplexForm.js         # Componente para o formulário de entrada
│   │   │   ├── Results.js             # Componente para exibir os resultados
│   │   ├── App.js                     # Componente principal do React
│   │   ├── index.js                   # Ponto de entrada do React
│   │   ├── styles/                    # Arquivos de estilo
│   │   │   ├── index.css              # Estilos globais
│   ├── package.json                   # Dependências do frontend
└── [README.md]
 ```
### Pré-Requisitos
- Back-end: Python 3.x, Flask, e Flask-CORS
- Front-end: Node.js e npm

### Instalação e execução
#1- Clonar o repositório:
```plaintext
git clone https://github.com/Chagaiz28/Otimiza-o---M-todo-simplex.git
cd Otimiza-o---M-todo-simplex
```
#2 - Configurar o backend
```plaintext
git clone https://github.com/Chagaiz28/Otimiza-o---M-todo-simplex.git
cd Otimiza-o---M-todo-simplex
```
#3 - Crie e ative um ambiente virtual:
No Windows:
```plaintext
python -m venv venv
.\venv\Scripts\activate
```
No macOS/Linux:
```plaintext
python3 -m venv venv
source venv/bin/activate
```
#4 - Instale as dependências
```plaintext
pip install -r requirements.txt
```
#5 - Execute o servidor Flask:
```plaintext
python run.py
```
O servidor Flask estará rodando em http://localhost:5000.

#6 - Configurar frontend:
```plaintext
cd ../frontend
npm install
```
#7 - Execute o Servidor React:
```plaintext
npm start
```
O servidor React estará rodando em http://localhost:3000.
