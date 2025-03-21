para iniciar os dois projetos, damos um:

- dentro da raiz do projeto "portfolio-ia" damos um:
"npm init -y"
- e com isso ele cria o package.json e conseguimos rodar apenas um unico comando e inicializar os dois projetos "backend e frontend"

e com isso, dentro do packeage.json que esta na raiz do projeto "postfolio-ia", dentro de "scripts", adicionamos:

		"dev": "npx concurrently \"cd backend && npm run dev:start\" \"cd frontend && npm run dev\""
 - o "concurrently" é um pacote que vai entrar na pasta backend e rodar o comando "npm run dev:start" e o mesmo, de forma paralela, com a pasta "frontend"
