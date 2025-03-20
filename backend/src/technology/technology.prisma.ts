import { Tecnologies } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

// responsável por acessar os dados do prisma que assim acessa os dados do banco de dados

@Injectable()
export class TechnologyPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async getAllTechnologies(): Promise<Tecnologies[]> {
		// só com ess alinha a gente vai obter todas as tecnologias
		return this.prisma.technology.findMany()
		// O "findmany" serve para buscar vvarios dados dentro do banco de dados sem filtro, assim, pegando todos os dados de "technology"
	}

	async getAllDestaques(): Promise<Tecnologies[]> {
		return this.prisma.technology.findMany({
			// assim, podemos filtrar os dados que queremos buscar, nesse caso, os que são destaque
			where: {
				destaque: true,
			},
		})
	}
}
