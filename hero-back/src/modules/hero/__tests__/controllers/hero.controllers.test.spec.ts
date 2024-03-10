import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { RedisApplicationModule } from '../../../../services/redis/redisApp.module';
import { HeroController } from '../../controllers/hero.controller';
import { AgeVerify } from '../../services/ageValidate.service';
import { HeroService } from '../../services/hero.service';

describe('HeroController', () => {
  let controller: HeroController;
  let heroService: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [HeroService, PrismaClient, AgeVerify],
      imports: [RedisApplicationModule],
    }).compile();

    controller = module.get<HeroController>(HeroController);
    heroService = module.get<HeroService>(HeroService);
  });

  describe('list', () => {
    it('should return a list of knights', async () => {
      const result: any[] = []; // Mock your expected result here
      jest.spyOn(heroService, 'list').mockResolvedValue(result);

      expect(await controller.list()).toBe(result);
    });
  });

  describe('findHeroes', () => {
    it('should return a list of heroes', async () => {
      const filter = 'someFilter';
      const result: any[] = []; // Mock your expected result here
      jest.spyOn(heroService, 'findHeros').mockResolvedValue(result);

      expect(await controller.findHeroes(filter)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new knight', async () => {
      const data: any = {}; // Mock your input data here
      const result: any = {}; // Mock your expected result here
      jest.spyOn(heroService, 'create').mockResolvedValue(result);

      expect(await controller.create(data)).toBe(result);
    });
  });

  // Add tests for other controller methods (findOne, delete, update) following a similar pattern

  afterEach(() => {
    jest.resetAllMocks();
  });
});
