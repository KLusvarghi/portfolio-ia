/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Project } from "@core"
import { Injectable } from "@nestjs/common"
import { PrismaProvider } from "src/db/prisma.provider"

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
}
