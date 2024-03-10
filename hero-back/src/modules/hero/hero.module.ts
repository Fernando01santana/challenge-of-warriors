import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RedisApplicationModule } from 'src/services/redis/redisApp.module';
import { HeroController } from './controllers/hero.controller';
import { AgeVerify } from './services/ageValidate.service';
import { HeroService } from './services/hero.service';

@Module({
  imports: [RedisApplicationModule],
  controllers: [HeroController],
  providers: [HeroService, PrismaClient, AgeVerify],
  exports: [],
})
export class HeroModule {}
