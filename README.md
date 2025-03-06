# Kanban-React-Web
Kanban-React-Web é um sistema de gerenciamento de tarefas em estilo Kanban, desenvolvido com React, TypeScript e Vite. A aplicação permite o gerenciamento de projetos, clientes e tarefas de forma intuitiva e eficiente. 

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Vite**: Ferramenta de build moderna e rápida para desenvolvimento em React.
- **MobX Lite**: Gerenciamento de estado reativo e eficiente.
- **Axios**: Cliente HTTP para realizar requisições ao servidor.
- **Semantic UI React**: Conjunto de componentes prontos para a criação de interfaces.
- **React Toastify**: Biblioteca para notificações tipo toast.

## Funcionalidades
- **Cadastro de Projetos**: Crie, edite e delete projetos no sistema.
- **Cadastro de Clientes**: Cadastre, edite e delete clientes no sistema.
- **Associação de Clientes a Projetos**: Cada cliente pode ser associada a um projeto na tela de edição ou criação de projeto.
- **Kanban Board**: Visualize os projetos e suas tarefas em formato de Kanban.
- **Gerenciamento de Tarefas**: Criação, edição, listagem e exclusão de tarefas dentro de cada projeto.
- **Associação de Tarefas a Clientes**: Cada tarefa pode ser associada a um cliente do projeto.

## Instalação e Execução
Siga os passos abaixo para rodar o projeto localmente:

1. **Clone este repositório**:
    ```bash
    git clone https://github.com/Lincoln-Andrade-Silva/Kanban-React-Web.git
    ```

2. **Navegue para o diretório do projeto**:
    ```bash
    cd Kanban-React-Web
    ```

3. **Instale o NPM**:
    ```bash
    npm install
    ```

3. **Execute o projeto**:
    ```bash
    npm run dev
    ```

O servidor de desenvolvimento estará disponível em [http://localhost:5173](http://localhost:5173).

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:

- **src/**: Contém todos os arquivos do código-fonte.
  - **components/**: Componentes reutilizáveis da interface.
  - **store/**: Gerenciamento de estado utilizando MobX Lite.
  - **model/**: Modelos de dados usados no sistema.
  - **layout/**: Estrutura geral do layout da aplicação.
  - **services/**: Serviços para realizar requisições HTTP com Axios.

## Como Usar
1. **Criação de Projetos**: Acesse a página de criação de projetos, preencha os dados e adicione um novo projeto.
2. **Cadastro de Clientes**: Para cada projeto, você pode cadastrar clientes. Isso pode ser feito ao editar um projeto ou diretamente na página de clientes.
3. **Gerenciamento de Tarefas**: Dentro de cada projeto, você pode visualizar o Kanban, adicionar novas tarefas, editar ou deletar tarefas existentes. Cada tarefa pode ser associada a um cliente específico.
4. **Exclusão e Edição**: O sistema permite editar e excluir projetos, clientes e tarefas de forma simples e eficiente.
