import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EnvService],
    }).compile();

    service = module.get<EnvService>(EnvService);
  });

  it('should throw an error if we try to access a value that is not in the environment', () => {
    expect(service).toBeDefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(() => service.get('TEST')).toThrowErrorMatchingInlineSnapshot(
      `"EnvService - tried to access env key TEST but it is not in the environment."`,
    );
  });
});
