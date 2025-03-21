# Documentação de Configuração do Projeto

Este documento descreve o processo de configuração de um projeto modular usando NestJS, Prisma e Supabase. A arquitetura é baseada em módulos compartilhados, permitindo uma clara separação de responsabilidades.

## Sumário
- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Pacote Core](#configuração-do-pacote-core)
- [Configuração do Backend com NestJS](#configuração-do-backend-com-nestjs)
- [Conectando Core e Backend](#conectando-core-e-backend)
- [Configuração do Prisma](#configuração-do-prisma)
- [Conexão com Supabase](#conexão-com-supabase)
- [Migrações de Banco de Dados](#migrações-de-banco-de-dados)
- [Gerenciando Alterações no Banco de Dados](#gerenciando-alterações-no-banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Implementação dos Módulos](#implementação-dos-módulos)
  - [Configuração do Módulo de Banco de Dados](#configuração-do-módulo-de-banco-de-dados)
  - [Módulo de Tecnologias](#módulo-de-tecnologias)
  - [Módulo de Projetos](#módulo-de-projetos)
- [Solução de Problemas Comuns](#solução-de-problemas-comuns)

## Visão Geral da Arquitetura

O projeto é estruturado com base em uma arquitetura modular:

- **Core**: Biblioteca compartilhada que contém interfaces, tipos e funções comuns
- **Backend**: Aplicação NestJS que implementa a API REST
- **Módulos NestJS**: Unidades independentes para gestão de dados (DB, Tecnologias, Projetos, etc.)
- **Prisma**: ORM para interação com banco de dados PostgreSQL via Supabase

Esta arquitetura facilita a manutenção, o teste e o escalonamento da aplicação.

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Conta no Supabase com um projeto criado
- Conhecimento básico de TypeScript e NestJS

## Configuração do Pacote Core

O pacote Core contém código compartilhado entre diferentes partes da aplicação.

1. Inicialize o arquivo package.json no diretório core:

```bash
mkdir -p core/src
cd core
npm init -y
```

2. Configure o TypeScript no Core (opcional, mas recomendado):

```bash
npm install typescript @types/node --save-dev
npx tsc --init
```

O pacote Core pode conter:
- Interfaces compartilhadas
- DTOs (Data Transfer Objects)
- Funções utilitárias
- Constantes e enumerações

## Configuração do Backend com NestJS

1. Instale o CLI do NestJS globalmente:

```bash
npm i -g @nestjs/cli
```

2. Verifique os comandos disponíveis do NestJS:

```bash
nest --help
```

3. Crie uma nova aplicação NestJS:

```bash
nest new backend
```

O NestJS criará uma estrutura completa, incluindo:
- Configurações iniciais
- Estrutura de diretórios
- Módulo raiz (AppModule)
- Controlador e serviço de exemplo
- Scripts npm para desenvolvimento e produção

## Conectando Core e Backend

Para que o backend possa acessar o código do Core:

1. Atualize o arquivo `tsconfig.json` na pasta backend:

```json
{
  "compilerOptions": {
    // outras configurações...
    "paths": {
      "@core": ["../core/src"],
      "@core/*": ["../core/src/*"]
    }
  }
}
```

2. Atualize o arquivo `package.json` no backend para usar o caminho correto:

```json
{
  "scripts": {
    "start:dev": "nest start --watch --entryFile backend/src/main"
  }
}
```

> **Importante**: A pasta `dist` contém a versão compilada do projeto e não deve ser editada diretamente.

## Configuração do Prisma

O Prisma é um ORM moderno para Node.js e TypeScript que facilita o acesso ao banco de dados.

1. Instale o Prisma no diretório do backend:

```bash
cd backend
npm install @prisma/client
npm install prisma --save-dev
```

2. Inicialize o Prisma para configurar um arquivo de esquema vazio:

```bash
npx prisma init
```

Isso criará:
- Arquivo `.env` com uma URL de banco de dados padrão
- Pasta `prisma` com `schema.prisma` para modelagem de dados

## Conexão com Supabase

O Supabase fornece um backend PostgreSQL totalmente gerenciado.

1. Acesse o painel do seu projeto Supabase:
   - Navegue para **Project Settings** > **Database** > **Connection string**
   - Selecione a opção **URI**

2. Copie a string de conexão e atualize seu arquivo `.env`:

```
DATABASE_URL="postgresql://postgres:[SEU-PASSWORD]@db.[SEU-PROJECT-ID].supabase.co:5432/postgres"
```

3. Crie um arquivo `.env.sample` sem informações sensíveis:

```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres"
```

> **⚠️ Nota de segurança**: Nunca inclua senhas reais e chaves de API em arquivos versionados. Adicione `.env` ao seu `.gitignore`.

## Migrações de Banco de Dados

### Definindo Modelos

1. Defina seus modelos em `schema.prisma`. Exemplo:

```prisma
model Tecnologia {
  id          Int       @id @default(autoincrement())
  nome        String
  descricao   String?
  destaque    Boolean   @default(false)
  criado_em   DateTime  @default(now())
  projetos    Projeto[]
}

model Projeto {
  id           Int          @id @default(autoincrement())
  nome         String
  descricao    String?
  imagem       String?
  link         String?
  criado_em    DateTime     @default(now())
  tecnologias  Tecnologia[]
}
```

2. Gere os tipos TypeScript para seus modelos (opcional):

```bash
npx prisma generate
```

### Criando Tabelas

1. Crie uma migração inicial:

```bash
npx prisma migrate dev --name criar_tabelas_iniciais
```

Este comando:
- Cria uma pasta `migrations` no diretório `prisma`
- Gera um arquivo SQL de migração com timestamp
- Executa a migração no banco de dados Supabase
- Gera cliente Prisma atualizado

## Gerenciando Alterações no Banco de Dados

### Alterações Planejadas

Quando você precisa modificar seu esquema de banco de dados:

1. Modifique os modelos no arquivo `schema.prisma`
2. Execute uma nova migração:

```bash
npx prisma migrate dev --name descricao_da_alteracao
```

### Lidando com Erros de Migração

Se você encontrar problemas com migrações:

- **Opção 1**: Corrija o esquema e crie uma nova migração
- **Opção 2**: Edite o banco de dados diretamente via Console SQL do Supabase
- **Opção 3**: Redefina completamente o banco de dados (⚠️ remove todos os dados):

```bash
npx prisma migrate reset
```

### Sincronizando Esquema com Banco de Dados

Se as alterações foram feitas diretamente no banco de dados:

```bash
npx prisma db pull
```

## Estrutura do Projeto

Após configurar todos os componentes, seu projeto deve ter a seguinte estrutura:

```
projeto-raiz/
├── core/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts               # Exportações principais
│       ├── interfaces/            # Interfaces compartilhadas
│       └── utils/                 # Funções utilitárias
│
├── backend/
│   ├── dist/                      # Código compilado
│   ├── node_modules/
│   ├── prisma/
│   │   ├── migrations/            # Migrações de banco de dados
│   │   └── schema.prisma          # Definição do esquema
│   │
│   ├── src/
│   │   ├── main.ts                # Ponto de entrada
│   │   ├── app.module.ts          # Módulo principal
│   │   ├── db/                    # Módulo de banco de dados
│   │   │   ├── db.module.ts
│   │   │   └── prisma.provider.ts
│   │   │
│   │   ├── technology/            # Módulo de tecnologias
│   │   │   ├── technology.module.ts
│   │   │   ├── technology.controller.ts
│   │   │   └── technology.provider.ts
│   │   │
│   │   └── project/               # Módulo de projetos
│   │       ├── project.module.ts
│   │       ├── project.controller.ts
│   │       └── project.provider.ts
│   │
│   ├── .env                       # Variáveis de ambiente (não versionado)
│   ├── .env.sample                # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                      # Este documento
```

## Implementação dos Módulos

### Configuração do Módulo de Banco de Dados

O módulo DB serve como uma camada de abstração para acesso ao banco de dados:

1. Crie o módulo DB:

```bash
cd backend
nest g module db
```

2. Crie o provider Prisma:

```bash
nest g provider db/prisma --no-spec --flat
```

3. Implemente o `prisma.provider.ts`:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

4. Configure o `db.module.ts` para exportar o provider:

```typescript
import { Module } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider], // Importante para permitir acesso de outros módulos
})
export class DbModule {}
```

### Módulo de Tecnologias

1. Crie o módulo e seus componentes:

```bash
nest g module technology
nest g controller technology --no-spec --flat
nest g provider technology --no-spec --flat
```

2. Implemente o controlador `technology.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { TechnologyProvider } from './technology.provider';
import { Tecnologia } from '@prisma/client';

@Controller('technologies')
export class TechnologyController {
  constructor(private readonly repo: TechnologyProvider) {}

  @Get()
  async getAll(): Promise<Tecnologia[]> {
    return this.repo.getAllTechnologies();
  }

  @Get('destaques')
  async getDestaques(): Promise<Tecnologia[]> {
    return this.repo.getAllDestaques();
  }
}
```

3. Implemente o provider `technology.provider.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Tecnologia } from '@prisma/client';

@Injectable()
export class TechnologyProvider {
  constructor(private readonly prisma: PrismaProvider) {}

  async getAllTechnologies(): Promise<Tecnologia[]> {
    return this.prisma.tecnologia.findMany();
  }

  async getAllDestaques(): Promise<Tecnologia[]> {
    return this.prisma.tecnologia.findMany({
      where: {
        destaque: true,
      },
    });
  }
}
```

4. Configure o módulo para importar o DbModule:

```typescript
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TechnologyController } from './technology.controller';
import { TechnologyProvider } from './technology.provider';

@Module({
  imports: [DbModule],
  controllers: [TechnologyController],
  providers: [TechnologyProvider],
})
export class TechnologyModule {}
```

### Módulo de Projetos

1. Crie o módulo e seus componentes:

```bash
nest g module project
nest g controller project --no-spec --flat
nest g provider project --no-spec --flat
```

2. Implemente o controlador `project.controller.ts`:

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ProjectProvider } from './project.provider';
import { Projeto } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly repo: ProjectProvider) {}

  @Get()
  async getAllProjects(): Promise<Projeto[]> {
    return this.repo.getAllProjects();
  }

  @Get(':id')
  async getProjectsById(@Param('id') id: string): Promise<Projeto | null> {
    return this.repo.getProjectById(Number(id));
  }
}
```

3. Implemente o provider `project.provider.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Projeto } from '@prisma/client';

@Injectable()
export class ProjectProvider {
  constructor(private readonly prisma: PrismaProvider) {}

  async getAllProjects(): Promise<Projeto[]> {
    return this.prisma.projeto.findMany();
  }

  async getProjectById(id: number): Promise<Projeto | null> {
    return this.prisma.projeto.findUnique({
      where: { id },
      include: {
        tecnologias: true,
      },
    });
  }
}
```

4. Configure o módulo para importar o DbModule:

```typescript
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ProjectController } from './project.controller';
import { ProjectProvider } from './project.provider';

@Module({
  imports: [DbModule],
  controllers: [ProjectController],
  providers: [ProjectProvider],
})
export class ProjectModule {}
```

## Solução de Problemas Comuns

### Problemas de Formatação com Prettier

Se o VS Code apresentar erros relacionados ao Prettier:

```bash
npx prettier --check . 
```

Este comando verificará se há erros de formatação. Às vezes, o problema pode ser apenas uma falha na interpretação do arquivo pelo VS Code.

### Problemas com Importações de Módulos

Se encontrar erros de importação entre módulos:

1. Verifique se o caminho em `tsconfig.json` está correto
2. Confirme se o módulo está exportando os componentes necessários
3. Reinicie o servidor de desenvolvimento

### Problemas com o Prisma

1. Para atualizar o cliente Prisma após alterações no schema:

```bash
npx prisma generate
```

2. Para visualizar seu banco de dados através da interface do Prisma:

```bash
npx prisma studio
```

## Próximos Passos

- Implementar autenticação e autorização
- Adicionar validação de entrada com class-validator
- Configurar testes automatizados
- Implementar documentação da API com Swagger

---

Para mais informações, consulte a documentação oficial:
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/)
- [Supabase](https://supabase.com/docs)




grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;
grant all on technologies to anon;
grant all on technologies to authenticated;
