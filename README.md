# Hotel

## *Descrição do Projeto*

Este projeto consiste em um sistema de gerenciamento de hotel desenvolvido para realizar o controle de quartos e reservas.

O sistema permite cadastrar quartos, visualizar os quartos disponíveis, cadastrar reservas vinculadas a um quarto específico, visualizar as reservas existentes e realizar exclusões quando necessário.

As informações são armazenadas em banco de dados MySQL e manipuladas através de uma API REST desenvolvida com Node.js, Express e Prisma.

---

## *Tecnologias Utilizadas*

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* Prisma
* MySQL
* Visual Studio Code (VS Code)

---

## *Infraestrutura Utilizada*

* IDE: Visual Studio Code
* SGBD: MySQL
* Servidor de Aplicação: Node.js

---

## *Funcionalidades*

### *Quartos*

* Cadastro de quartos
* Listagem de quartos
* Exclusão de quartos
* Visualização de reservas do quarto

### *Reservas*

* Cadastro de reservas
* Listagem de reservas
* Exclusão de reservas
* Associação automática ao quarto selecionado

### *Sistema*

* Integração entre Front-end e Back-end
* Persistência de dados em banco MySQL
* Interface responsiva
* Menu lateral de navegação

---

## *Estrutura do Sistema*

### *Menu Lateral*

* Quartos
* Reservas
* Sobre

### *Telas*

#### *Tela Principal*

* Nome do sistema
* Listagem dos quartos cadastrados
* Botão para cadastrar novo quarto
* Botão para visualizar reservas
* Botão para excluir quarto

#### *Tela de Cadastro de Quarto*

* Número do quarto
* Tipo do quarto
* Botão cadastrar

#### *Tela de Reservas*

* Dados do quarto selecionado
* Cadastro de reserva
* Listagem de reservas
* Exclusão de reservas

#### *Tela Sobre*

* Informações do sistema
* Tecnologias utilizadas
* Dados do desenvolvedor

---

## *Rotas da API*

### *Quartos*

* POST `/quartos/cadastrar`
* GET `/quartos/listar`
* GET `/quartos/buscar/:id`
* PUT `/quartos/atualizar/:id`
* DELETE `/quartos/excluir/:id`

### *Reservas*

* POST `/reservas/cadastrar`
* GET `/reservas/listar`
* GET `/reservas/buscar/:id`
* PUT `/reservas/atualizar/:id`
* DELETE `/reservas/excluir/:id`
---

## *Como Executar o Projeto*

### *. Clone o repositório*

git clone

### *. Acesse a pasta do projeto*

cd hotelback

### *. Instale as dependências*

npm install

### *. Configure o arquivo .env*

DATABASE_URL="mysql://usuario:senha@localhost:3306/hotel_db"

PORT_APP=3000

### *. Execute as migrations*

npx prisma migrate dev

### *. Gere o Prisma Client*

npx prisma generate

### *. Inicie o servidor*

nodemon server.js

### *8. Execute o Front-end*

Entre no repositório x e clique no link do site. Ou inicie o arquivo index.html.

---
