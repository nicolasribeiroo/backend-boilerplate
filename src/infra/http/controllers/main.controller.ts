import { ExampleUseCase } from '@application/use-cases/example-use-case';
import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class MainController {
  constructor(private testCase: ExampleUseCase) {}

  @Get('test')
  async execute(@Query('number') number: number) {
    const data = await this.testCase.handle({ number });

    return {
      data,
    };
  }
}
