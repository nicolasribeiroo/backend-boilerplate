import { ExampleUseCase } from '@application/use-cases/example-use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { MainController } from './controllers/main.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MainController],
  providers: [ExampleUseCase],
})
export class HttpModule {}
