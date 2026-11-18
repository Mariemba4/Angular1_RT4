import { Service } from '@angular/core';

@Service()
export class LoggerService {
  log(message: unknown) {
    console.log({ message });
  }
}
