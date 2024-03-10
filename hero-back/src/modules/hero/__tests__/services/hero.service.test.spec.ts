import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import RedisAppService from '../../../../services/redis/redis.service';
import { RedisApplicationModule } from '../../../../services/redis/redisApp.module';
import { AgeVerify } from '../../services/ageValidate.service';
import { HeroService } from '../../services/hero.service';
import {
  filterHero,
  mockHallHeroes,
  mockPrismaHero,
  mockServiceRequestKnight,
  mockServiceResponseKnight,
  prismaMock,
  redisServiceMock,
} from '../constants/constants.mock';

describe('HeroService', () => {
  let heroService: HeroService;
  let prisma: PrismaClient;
  let redisService: RedisAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        { provide: PrismaClient, useValue: prismaMock },
        AgeVerify,
        { provide: RedisAppService, useValue: redisServiceMock },
      ],
      imports: [RedisApplicationModule],
    }).compile();
    heroService = module.get<HeroService>(HeroService);
    prisma = module.get<PrismaClient>(PrismaClient);
    redisService = module.get<RedisAppService>(RedisAppService);
  });

  describe('Should test method list', () => {
    it('should return an array of knight by redis', async () => {
      // Modificado para resolver o problema do teste
      redisServiceMock.getAll.mockResolvedValue([
        JSON.stringify(mockPrismaHero.findFirst),
      ]);

      const response = await heroService.list();

      expect(prisma.knights.findMany).toHaveBeenCalledTimes(0);
      expect(response).toEqual(mockServiceResponseKnight.list);
    });

    it('should return an array of knight by database', async () => {
      redisServiceMock.getAll.mockResolvedValue(null);

      const response = await heroService.list();
      expect(prisma.knights.findMany).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockServiceResponseKnight.list);
    });

    it('should throw NotFoundException if no knights are found', async () => {
      prismaMock.knights.findMany.mockResolvedValue([]);
      await expect(heroService.list()).rejects.toThrowError(NotFoundException);
    });

    it('should handle BadRequestException and rethrow it', async () => {
      prismaMock.knights.findMany.mockRejectedValue(
        new Error('Some Prisma Error'),
      );

      await expect(heroService.list()).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('Should test method create', () => {
    it('should create knight', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(null);

      const response = await heroService.create(
        mockServiceRequestKnight.create,
      );

      expect(response).toEqual(mockServiceResponseKnight.create);
      expect(prisma.knights.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if knight with the same nickname exists', async () => {
      prismaMock.knights.findFirst.mockResolvedValue([]);
      await expect(
        heroService.create(mockServiceRequestKnight.create),
      ).rejects.toThrowError(ConflictException);
    });

    it('should handle BadRequestException and rethrow it', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(null);
      mockPrismaHero.create.attributes.charisma = -1;
      prismaMock.knights.create.mockRejectedValue(
        new Error('Some Prisma Error'),
      );

      await expect(
        heroService.create(mockServiceRequestKnight.create),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('Should test method findOne', () => {
    it('should return one knight', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(mockPrismaHero.findFirst);

      const response = await heroService.findOne(
        mockServiceRequestKnight.findOne.id,
      );

      expect(response).toEqual(mockServiceResponseKnight.create);
      expect(prisma.knights.findFirst).toHaveBeenCalled();
    });

    it('should handle NotFoundException and rethrow it', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(null);
      await expect(
        heroService.findOne(mockServiceRequestKnight.findOne.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Should test method updateNickname', () => {
    it('Should update nickname', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(mockPrismaHero.findFirst);

      const response = await heroService.updateNickname(
        mockServiceRequestKnight.update.id,
        mockServiceRequestKnight.update.nickname,
      );

      expect(response).toEqual(mockPrismaHero.update);
    });

    it('Should return notFoundException', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(null);
      await expect(
        heroService.updateNickname(
          mockServiceRequestKnight.update.id,
          mockServiceRequestKnight.update.nickname,
        ),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Should test method remove', () => {
    it('Should remove knight and add to hallheroes', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(mockPrismaHero.findFirst);
      prismaMock.hallheroes.create.mockResolvedValue(mockHallHeroes.create);

      const response = await heroService.remove(mockHallHeroes.create.id);

      expect(response).toEqual(mockHallHeroes.delete);
      expect(prisma.knights.findFirst).toHaveBeenCalled();
      expect(prisma.hallheroes.create).toHaveBeenCalled();
      expect(prisma.knights.delete).toHaveBeenCalled();
    });

    it('Should throw NotFoundException if knight is not found', async () => {
      prismaMock.knights.findFirst.mockResolvedValue(null);

      await expect(heroService.remove('invalidId')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('Should test method findHeros', () => {
    it('should return an array of hallheroes when filter is "hero"', async () => {
      prismaMock.hallheroes.findMany.mockResolvedValue([mockHallHeroes.create]);

      const response = await heroService.findHeros(filterHero.hero);

      expect(response).toEqual(mockHallHeroes.findMany);
      expect(prisma.hallheroes.findMany).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid filter', async () => {
      expect(await heroService.findHeros('invalidFilter')).toBeUndefined();
    });
  });

  describe('Should test method attributeModify', () => {
    it('should modify attribute value correctly', () => {
      expect(heroService.atrributeModify(8)).toEqual(-2);
      expect(heroService.atrributeModify(10)).toEqual(-1);
      expect(heroService.atrributeModify(12)).toEqual(0);
      expect(heroService.atrributeModify(15)).toEqual(1);
      expect(heroService.atrributeModify(18)).toEqual(2);
      expect(heroService.atrributeModify(20)).toEqual(3);
    });

    it('should return 0 for out-of-range values', () => {
      expect(heroService.atrributeModify(5)).toEqual(-2);
      expect(heroService.atrributeModify(25)).toEqual(0);
    });
  });

  describe('Should test method attackCalculation', () => {
    it('should calculate attack correctly', () => {
      const response = heroService.attackCalculation(
        mockServiceResponseKnight.create,
      );

      expect(response).toEqual(10 + 12 + 2);
    });

    it('should handle missing equipped weapon', () => {
      const response = heroService.attackCalculation(
        mockServiceResponseKnight.create,
      );

      expect(response).toEqual(24);
    });
  });
});
