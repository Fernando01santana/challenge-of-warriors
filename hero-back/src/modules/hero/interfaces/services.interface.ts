import { hallheroes, knights } from '@prisma/client';
import { CreateHeroDto, ListKnightsDto } from '../dtos/hero.dto';

export interface HeroServiceInterface {
  create(data: CreateHeroDto): Promise<knights>;
  list(): Promise<ListKnightsDto[]>;
  updateNickname(id: string, nickname: string): Promise<knights>;
  findHeros(filter: string): Promise<hallheroes[]>;
}
