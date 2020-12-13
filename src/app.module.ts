import { Module } from '@nestjs/common';
import { SecretsModule } from './secrets/secrets.module';

@Module({
  imports: [SecretsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
