import { Module } from "@nestjs/common"
import { ProjectPrima } from "./project.prima"
import { ProjectController } from "./project.controller"
import { DbModule } from "src/db/db.module"

@Module({
	providers: [ProjectPrima],
	controllers: [ProjectController],
	imports: [DbModule],
})
export class ProjectModule {}
