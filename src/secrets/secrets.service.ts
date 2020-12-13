import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SecretsService {
  upsert(secret: string, value: string) {
    return fs.writeFileSync(`./data/${secret}`, value);
  }

  read(secret: string): string | undefined {
    try {
      return fs.readFileSync(`./data/${secret}`).toString('utf-8');
    } catch (e) {
      if (e.code === 'ENOENT') return undefined;
      else throw e;
    }
  }
}
