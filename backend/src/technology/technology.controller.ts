import { Controller, Get } from "@nestjs/common"
import { Tecnologies } from "@core"
import { TechnologyPrisma } from "./technology.prisma"

@Controller("technologies") // sendo "technologies" a rota que vamos acessar
export class TechnologyController {
	//sendo o repo uma variavel que serve para acessar o que temos lá no 'texhnology.provider.ts'
	constructor(private readonly repo: TechnologyPrisma) {}

	// esse "@Get" irá nos retornar o que está logo abaixo dele, e como não passamos nenhuma rota, ele irá retornar a raiz do nosso projeto em "localhost:3000/technologies"'
	@Get()
	async getAll(): Promise<Tecnologies[]> {
		return this.repo.getAllTechnologies()
	}

	@Get("destaques")
	async getDestaques(): Promise<Tecnologies[]> {
		return this.repo.getAllDestaques()
	}
}
