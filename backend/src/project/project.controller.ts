import { Controller, Get, Param } from "@nestjs/common"
import { ProjectPrima } from "./project.prima"
import { Project } from "@core"

@Controller("projects")
export class ProjectController {
	constructor(private readonly repo: ProjectPrima) {}

	@Get()
	async getAllProjects(): Promise<Project[]> {
		return this.repo.getAllProjects()
	}

	@Get(":id")
	async getProjectsById(@Param("id") id: string): Promise<Project | null> {
		return this.repo.getProjectById(Number(id))
	}
}
