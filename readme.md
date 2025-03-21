# Projeto Portfolio-IA

## Visão Geral
Este projeto consiste em dois componentes principais: um frontend em Next.js e um backend em NestJS. O projeto está configurado para permitir o desenvolvimento simultâneo de ambos os componentes usando o concurrently.

## Estrutura do Projeto
```
portfolio-ia/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       └── (paginas)/
│   └── package.json
├── backend/
│   ├── src/
│   └── package.json
└── package.json (raiz)
```

## Tecnologias

### Frontend
- **Next.js (v15.2.3)**: Framework React para aplicações renderizadas no servidor com roteamento e capacidades de API incorporadas
- **React (v19.0.0)**: Biblioteca JavaScript para construção de interfaces de usuário
- **React DOM (v19.0.0)**: Pacote React para métodos específicos do DOM
- **Classnames (v2.5.1)**: Utilitário para unir condicionalmente classes, útil com Tailwind CSS

#### Recursos do Frontend:
- Renderização do lado do servidor (SSR)
- Geração de site estático (SSG)
- Roteamento baseado em arquivos
- Rotas de API
- Suporte a TypeScript
- Integração com Tailwind CSS

### Backend
- **NestJS (v11.0.1)**: Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis
- **Prisma (v6.5.0)**: ORM de nova geração para Node.js e TypeScript
- **@prisma/client (v6.5.0)**: Cliente gerado automaticamente para acesso ao banco de dados com segurança de tipos
- **Reflect-metadata (v0.2.2)**: Necessário para a injeção de dependência do NestJS
- **RxJS (v7.8.1)**: Biblioteca de Extensões Reativas para JavaScript, usada pelo NestJS para programação reativa

#### Recursos do Backend:
- Arquitetura MVC
- Injeção de Dependência
- Estrutura de aplicação modular
- Suporte a TypeScript
- Integração com banco de dados através do Prisma ORM
- Desenvolvimento de API RESTful

## Começando

### Instalação

1. Inicialize o projeto raiz:
```bash
npm init -y
```

2. Instale o concurrently para executar múltiplos comandos:
```bash
npm install concurrently --save-dev
```

3. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

4. Instale as dependências do backend:
```bash
cd backend
npm install
```

### Executando o Projeto

O projeto utiliza scripts npm configurados no package.json da raiz para executar tanto o frontend quanto o backend simultaneamente:

```json
"scripts": {
  "dev": "npx concurrently \"cd backend && npm run dev:start\" \"cd frontend && npm run dev\"",
  "front": "npx concurrently \"cd frontend && npm run dev\"",
  "back": "npx concurrently \"cd backend && npm run start:dev\""
}
```

Para iniciar ambos os serviços simultaneamente:
```bash
npm run dev
```

Para iniciar apenas o frontend:
```bash
npm run front
```

Para iniciar apenas o backend:
```bash
npm run back
```

## Desenvolvimento

### Desenvolvimento do Frontend
O frontend é construído com Next.js e segue a estrutura do App Router. Os componentes estão organizados em:
- Componentes compartilhados
- Componentes específicos de página
- Roteamento dinâmico para projetos usando o parâmetro [id]

### Desenvolvimento do Backend
O backend é construído com NestJS e usa Prisma como ORM para operações de banco de dados:
- Controladores lidam com requisições HTTP
- Serviços contêm a lógica de negócios
- Módulos organizam componentes relacionados
- Prisma fornece acesso ao banco de dados através de um cliente com segurança de tipos

## Banco de Dados
O projeto utiliza o Prisma ORM para operações de banco de dados:
- Defina seu esquema de banco de dados em `backend/prisma/schema.prisma`
- Execute migrações com `npx prisma migrate dev`
- Gere o cliente Prisma com `npx prisma generate`

## Implantação
Instruções para implantar a aplicação serão adicionadas em atualizações futuras.
