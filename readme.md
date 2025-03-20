# Documentação de Configuração do Projeto

## Índice
- [Configuração do Pacote Core](#configuração-do-pacote-core)
- [Configuração do Backend com NestJS](#configuração-do-backend-com-nestjs)
- [Conectando Core e Backend](#conectando-core-e-backend)
- [Configuração do Prisma](#configuração-do-prisma)
- [Conexão com Supabase](#conexão-com-supabase)
- [Migrações de Banco de Dados](#migrações-de-banco-de-dados)
- [Gerenciando Alterações no Banco de Dados](#gerenciando-alterações-no-banco-de-dados)
- [Estrutura Final do Projeto](#estrutura-final-do-projeto)


**Nota de segurança**: Não inclua senhas e chaves de API em arquivos que serão versionados. Este exemplo é apenas para documentação.

## Configuração do Pacote Core

Inicialize o arquivo package.json no diretório core:

```bash
npm init -y
```

Este comando cria um arquivo package.json básico que será usado para gerenciar as dependências do módulo compartilhado.

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

O NestJS criará toda a estrutura básica necessária para o backend, incluindo:
- Arquivos de configuração
- Estrutura de diretórios
- Dependências básicas
- Scripts para desenvolvimento e produção

## Conectando Core e Backend

Atualize o arquivo `tsconfig.json` na pasta backend para estabelecer uma conexão com o módulo core:

```json
{
  // outras configurações...
  
  "paths": {
    "@core": ["../core/src"]
  }
}
```

### Notas de Configuração

- A pasta `dist` contém a versão final que será implantada no servidor
- Por padrão, executar `npm run start:dev` gerará erros porque o caminho de importação precisa ser atualizado

### Corrigindo o Arquivo de Entrada

Atualize o arquivo `package.json` no script "start:dev" para usar a opção `--entryFile`:

```json
{
  "scripts": {
    "start:dev": "nest start --watch --entryFile backend/src/main"
  }
}
```

Isso garante que a aplicação seja executada a partir do ponto de entrada correto. O NestJS agora será capaz de encontrar o módulo core compartilhado.

## Configuração do Prisma

1. Instale o Prisma no diretório do backend:

```bash
npm install prisma --save-dev
```

2. Inicialize o Prisma (observe que não estamos usando SQLite, pois nos conectaremos ao Supabase com PostgreSQL):

```bash
npx prisma init
```

Isso cria:
- Arquivo `.env` com uma URL padrão de banco de dados
- Pasta `prisma` com `schema.prisma` para modelagem de dados

O Prisma é um ORM (Object-Relational Mapping) que simplifica a interação com o banco de dados usando TypeScript.

## Conexão com Supabase

1. No painel do projeto do Supabase, vá para **Connect** > **ORMs**
2. Copie as variáveis da string de conexão fornecidas
3. Atualize o arquivo `.env` com seus detalhes de conexão do Supabase
4. Crie um arquivo `.env.sample` sem informações sensíveis para controle de versão

Exemplo de como seu arquivo `.env` deve ficar:

```
DATABASE_URL="postgresql://postgres:[SEU-PASSWORD]@db.[SEU-PROJECT-ID].supabase.co:5432/postgres"
```

## Migrações de Banco de Dados

### Criando Tabelas

1. Defina seus modelos em `schema.prisma`. Exemplo:

```prisma
model Tecnologia {
  id        Int      @id @default(autoincrement())
  nome      String
  descricao String?
  criado_em DateTime @default(now())
}
```

2. Aplique as alterações ao banco de dados:

```bash
npx prisma migrate dev --name criar-tabela-tecnologias
```

Isso irá:
- Criar uma pasta `migrations` no diretório `prisma`
- Gerar um arquivo de migração com carimbo de data/hora contendo comandos SQL
- Aplicar as alterações ao seu banco de dados Supabase

## Gerenciando Alterações no Banco de Dados

Se você precisar corrigir erros em suas migrações:

- Opção 1: Atualize seu schema e crie uma nova migração
- Opção 2: Edite SQL diretamente no editor SQL do Supabase
- Opção 3: Redefina todas as migrações (atenção: limpa todos os dados):

```bash
npx prisma migrate reset
```

### Sincronizando Alterações de Banco de Dados

Se você fizer alterações diretamente no Supabase e precisar atualizar seu schema local:

```bash
npx prisma db pull
```

### Relacionamentos entre Tabelas

Você pode criar relacionamentos entre tabelas:
- Criando uma nova tabela para o relacionamento
- Adicionando referências diretas entre tabelas em seu schema

Exemplo de relacionamento no schema:

```prisma
model Projeto {
  id           Int          @id @default(autoincrement())
  nome         String
  tecnologias  Tecnologia[]
}

model Tecnologia {
  id        Int       @id @default(autoincrement())
  nome      String
  projetos  Projeto[]
}
```

## Estrutura Final do Projeto

Após seguir todos os passos, seu projeto deve ter uma estrutura semelhante a esta:

```
projeto-raiz/
├── core/
│   ├── package.json
│   └── src/
│       └── (arquivos compartilhados)
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   └── main.ts
│   ├── .env
│   ├── .env.sample
│   ├── package.json
│   └── tsconfig.json
└── (outros arquivos do projeto)
```

Esta arquitetura permite compartilhar código entre módulos, gerenciar modelos de dados de forma eficiente e manter uma clara separação de responsabilidades entre componentes.


--------------------

> Caso o arquivo do app.controller.ts não consiga acessar o arquivo .prettierrc na raiz do projeto, de o comando "npx prettier --check " e veja o erro, as vezes pode ser apenas erro do vscode que não conseguiu interpretar o arquivo.

-- COnfigurando Módulos
# NO nest, uma dos seus diferenciais é utilziar o CLI para exevutar ações, dando "nest --help" ele irá nos dar varias opções, e dentro delas, a que mais iremos utilizar é o "nest g" snedo esse "g" de "generate", servindo para criar coisas

- Assim como o angular, o nest ele é modularizado, sendo todo organizado em modulos, e esse modulos serão criados dentro do porjeto como pastas.
  - O intuito desses modulos é para que voce consiga usar um modulo/pasta ou outra de forma mais burocrática, e também para que voce possa ter um controle melhor de como está seu projeto.

  - dando o comando "nest g modeule db" ele cria uma pasta dentro de backend/src/db, e dentro dela ele cria um arquivo chamado db.module.ts, e dentro dele ele cria uma classe chamada DbModule, que é uma classe que vai ser responsável por gerenciar o modulo.
    - e com isso criamos o module de projects e technologie
  
  - começando por technologie, nó vamos criar o "controller" para que a gente possa acessar os dados de "technologies" através dos methods GET, POST, PUT e DELETE da nossa API Rest


-- COnfigurando o Prisma
  -- vamos criar uma classe para que possamos acessar o prisma através desta classe
  - então, dentro do modulo do banco de dados "backend/src/db" vamos implmementar essa classe, para que dentro dessa classe a gente consiga implementar nossa API de "technologies".

  - dando "nest --help" podemos ver varios comando, e dentro deles tem o "controller" que não serve neste caso porque ele não vai fazer parte dessa API, e nem um "service", até poderia ser, mas o service é uma boa prática colcoar ele a cosias mais relacionadas a regras. Mas neste caso vamos criar um "provider", usando o comando "nest g pr prisma.provider --no-spec --flat" dentro de "backend/src/db"
    - o "--no-spec" serve para ele não criar um arquivo de teste para o provider, que não é necessário neste caso.
    - o "--flat" serve para ele não crie uma subpasta, e sim criar um arquivo direto na pasta "db" 

      - e com isso ele cria nosso arquivo provider e já registra ele dentro de "db.module.ts"
    
 - E com isso, a intenção de usar "modulos" é que, conseguimos de forma explicita o que pode ser usado por outros módulos
        ```
          @Module({
            providers: [PrismaProvider],
            exports: [PrismaProvider],
          })
        ```

 - Após isso, dentro do privider, extendemos a classe para PrismaCLient para que possamos acessar o prisma através da classe.

 #Criando um controller denro de 'technology'
 - esse controller é o responsável por receber as requisições do cliente e retornar as respostas. Então, basicamente ele recebe o que o cliente quer e retorna os dados de 'tecnology' 
  - dando o comando "nest g co technology --no-spec --flat" dentro de "backend/src/tecchnology", com isso ele cria um arquivo chamado "technology.controller.ts"
  e dentro dele podemos criar rotas que serão acessadas pelo cliente.
  ```
      @Controller("technologies")
    export class TechnologyController {
      // esse "@Get" irá nos retornar o que está logo abaixo dele, e como não passamos nenhuma rota, ele irá retornar a raiz do nosso projeto em "localhost:3000/technologies"'
      @Get()
      async getAll() {
        return ["Angular", "React", "Vue"]
      }
    }
```

# Criando o provider de "technology
  - esse provider é o responsável por acessar o banco de dados e retornar os dados de 'technologies'
  - dentro de 'technology basta dar o comando "nest g pr technology --no-spec --flat" dentro de "backend/src/technology"
  - O proximo passo é utilizar o "prisma.provider.ts" que esta dentro de "src/db", queé o local que conseguimos acessar os dados do prisma
    - então, para que eu consigo dentro do modulo de "technology" acessar o modulo do "banco de dados", eu preciso, dentro do "technology.module.ts" dizer que eu dependo do "db.module.ts"
    ```js
          @Module({
      controllers: [TechnologyController],
      providers: [TechnologyProvider],
      imports: [DbModule],
    })
    ```
- Mas, eu só consigo acessar o Prisma, porque, dentro do "db.module" ele exporta o "PrismaProvider"

```js
@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
```
- e dentro do provider de Technologies eu faço:

```js
export class TechnologyProvider {
	constructor(private readonly prisma: PrismaProvider) {}

	async getAllTechnologies(): Promise<Tecnologies> {
		return this.prisma.technology.findMany() // só com ess alinha a gente vai obter todas as tecnologias
	}
}
```

    - O "findmany" (encontre muitos) serve para buscar varios dados dentro do banco de dados sem filtro, assim, pegando todos os dados de "technology"


# Criando outra rota dentro de technology
  - ele irá criar uma rota chamada "destaques" dentro de "technologies"

```js

@Get("destaques")
	async getDestaques(): Promise<Tecnologies[]> {
		return this.repo.getAllDestaques()
	}
```

# criando uma nova função dentro de "technology.provider.ts"' que irá retornar apenas os dados que contem o campo "destaque" como true

```js
async getAllDestaques(): Promise<Tecnologies[]> {
		return this.prisma.technology.findMany({
			// assim, podemos filtrar os dados que queremos buscar, nesse caso, os que são destaque
			where: {
				destaque: true,
			},
		})
	}
```

 
# O mesmo vamos aplicar para "Projects", criando um novo controle e um novo provider
- dentro de "backend/src/project" vamos dar o comando "nest g co project --no-spec --flat" e criamos:
```js
import { Controller, Get, Param } from "@nestjs/common"
import { ProjectPrima } from "./project.prima"
import { Project } from "@core"

@Controller("projects")
export class ProjectController {
	constructor(private readonly repo: ProjectPrima) {}

	@Get()
	async getAllProjects(): Promise<Project[]> { // retorna todos os projetos
		return this.repo.getAllProjects()
	}

	@Get(":id")
	async getProjectsById(@Param("id") id: string): Promise<Project | null> { // retorna um projeto específico pelo ID
		return this.repo.getProjectById(Number(id))
	}
}
```

- ja no provider, vamos criar as funções que acessam os dados do banco de dados
```js
@Injectable()
export class ProjectPrima {
	constructor(private readonly prisma: PrismaProvider) {}

	// Irá retornar todos os projetos com seus atributos
	async getAllProjects(): Promise<Project[]> {
		return this.prisma.project.findMany() as any
	}

	// Irá retornar o projeto com o id passado por parâmetro, incluindo apenas as tecnologias
	async getProjectById(id: number): Promise<Project | null> {
		return this.prisma.project.findUnique({ // como queremos retornar apenas um valor, podemos suar o fingUnique
			where: { id },
			include: {
				technologies: true,

				// podendo selecionar quais atributos queremos que sejam retornados
				// select: {
				// 	id: true,
				// 	name: true,
				// 	image: true,
				// 	link: true,
				// },
			},
		}) as any
	}
  ```

  
