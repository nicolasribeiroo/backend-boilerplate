import { ExampleUseCase } from './example-use-case';

describe('Example UseCase', () => {
  it('should be able to run example use case', async () => {
    const exampleUseCase = new ExampleUseCase().handle({
      number: 5,
    });

    expect(exampleUseCase).not.toBeNaN();
    expect(exampleUseCase).toBe(10);
  });
});
