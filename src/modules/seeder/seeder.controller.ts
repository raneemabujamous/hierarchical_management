import { Controller, Post, Query } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seeder: SeederService) {}

  @Post()
  async seed(@Query('scale') scale?: string) {
    const scaleFactor = parseFloat(scale) || parseFloat(process.env.SEED_SCALE) || 1;
    await this.seeder.seed(scaleFactor);
    return { message: `Database seeded with scale ${scaleFactor}` };
  }
}
