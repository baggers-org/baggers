import { env } from '@baggers/api-env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockEnvService {
  get(path: keyof typeof env) {
    return {}[path];
  }
}
