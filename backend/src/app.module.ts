import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { ProjectModule } from './project/project.module';
import { TechnologieModule } from './technologie/technologie.module';

@Module({
  imports: [DbModule, ProjectModule, TechnologieModule],
  controllers: [AppController],
})
export class AppModule {}
