import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SecretsService } from './secrets.service';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {
  }

  @Get('/:secret')
  get(@Param('secret') secret: string): string {
    const result = this.secretsService.read(secret);
    if (result === undefined) throw new NotFoundException();
    return result;
  }

  @Post('/:secret')
  @HttpCode(HttpStatus.CREATED)
  store(@Param('secret') secret: string, @Body() body: string) {
    let serialized = '';
    try {
      serialized = JSON.stringify(body);
    } catch {
      throw new BadRequestException('JSON expected as a body');
    }
    this.secretsService.upsert(secret, serialized);
  }
}
