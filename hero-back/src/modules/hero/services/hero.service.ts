import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, hallheroes, knights } from '@prisma/client';
import RedisAppService from '../../../services/redis/redis.service';
import { knightTypes } from '../constants/hero.constants';
import { CreateHeroDto, ListKnightsDto } from '../dtos/hero.dto';
import { HeroServiceInterface } from '../interfaces/services.interface';
import { AgeVerify } from './ageValidate.service';

@Injectable()
export class HeroService implements HeroServiceInterface {
  constructor(
    private readonly prismaService: PrismaClient,
    private readonly ageValidate: AgeVerify,
    private readonly redisAppService: RedisAppService,
  ) {}

  private applyAttributeModifiers(attributes: any): any {
    const modifiedAttributes = { ...attributes };
    const attributesToModify = [
      'charisma',
      'constitution',
      'dexterity',
      'intelligence',
      'strength',
      'wisdom',
    ];

    attributesToModify.forEach((attribute) => {
      modifiedAttributes[attribute] += this.atrributeModify(
        attributes[attribute],
      );
    });

    return modifiedAttributes;
  }

  async create(data: CreateHeroDto): Promise<knights> {
    try {
      const { name, nickname, birthday, weapons, keyAttribute } = data;

      const heroExists = await this.prismaService.knights.findFirst({
        where: { nickname: { equals: nickname } },
      });

      if (heroExists) {
        throw new ConflictException('Knight com esse nickname ja cadastrado');
      }

      const knight = await this.prismaService.knights.create({
        data: {
          name,
          nickname,
          birthday,
          weapons: weapons,
          attributes: this.applyAttributeModifiers(data.attributes),
          keyAttribute,
          type: knightTypes.knight,
        },
      });
      await this.redisAppService.createKey(
        JSON.stringify(knight),
        `knight-${knight.id}`,
      );

      return knight;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erro ao executar operacao.');
    }
  }

  async list(): Promise<ListKnightsDto[]> {
    try {
      const knightsCache = await this.redisAppService.getAll('knight-*');
      if (knightsCache && knightsCache.length) {
        const knightsCacheProcess = knightsCache.map((data) => {
          return JSON.parse(data);
        });
        return this.processKnights(knightsCacheProcess);
      }

      const findAllKnights = await this.prismaService.knights.findMany({
        where: { type: knightTypes.knight },
      });

      if (!findAllKnights.length) {
        throw new NotFoundException('Nenhum heroi encontrado.');
      }

      return this.processKnights(findAllKnights);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao executar operação.');
    }
  }

  async findOne(id: string): Promise<knights> {
    try {
      const knightExists = await this.prismaService.knights.findFirst({
        where: { id: id },
      });

      if (!knightExists) {
        throw new NotFoundException('knights nao encontrado.');
      }
      return knightExists;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao executar operacao.');
    }
  }

  async updateNickname(id: string, nickname: string): Promise<knights> {
    try {
      const knightToUpdate = await this.prismaService.knights.findFirst({
        where: { id: id },
      });

      if (!knightToUpdate) {
        throw new NotFoundException('Knight nao encontrado');
      }

      const knightToUpdated = await this.prismaService.knights.update({
        where: { id: knightToUpdate.id },
        data: { nickname: nickname },
      });

      await this.redisAppService.updateKey(
        `knight-${knightToUpdate.id}`,
        JSON.stringify(knightToUpdated),
      );

      return knightToUpdated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao executar operacao.');
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const knightExists = await this.prismaService.knights.findFirst({
        where: { id: id },
      });

      if (!knightExists) {
        throw new NotFoundException('Knight nao encontrado');
      }

      await this.prismaService.hallheroes.create({
        data: { name: knightExists.name, nickname: knightExists.nickname },
      });

      await this.prismaService.knights.delete({
        where: { id: knightExists.id },
      });

      await this.redisAppService.deletekey(`knight-${id}`);

      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao executar operacao');
    }
  }

  async findHeros(filter: string): Promise<hallheroes[]> {
    try {
      if (filter == knightTypes.hero) {
        return await this.prismaService.hallheroes.findMany();
      }
    } catch (error) {
      throw new BadRequestException('Erro ao executar operacao.');
    }
  }

  atrributeModify(value: number) {
    switch (true) {
      case value >= 0 && value <= 8:
        return -2;
      case value >= 9 && value <= 10:
        return -1;
      case value >= 11 && value <= 12:
        return 0;
      case value >= 13 && value <= 15:
        return 1;
      case value >= 16 && value <= 18:
        return 2;
      case value >= 19 && value <= 20:
        return 3;
      default:
        return 0;
    }
  }

  attackCalculation(element: knights): number {
    let attack = 0;
    const keyAttr = element.attributes[element.keyAttribute];
    const equippedWeapon = element.weapons.find((weapon) => weapon.equipped);
    if (equippedWeapon !== undefined) {
      attack = 10 + keyAttr + equippedWeapon.mod;
    } else {
      attack = 10 + keyAttr + 0;
    }

    return attack;
  }

  processKnights(knights: knights[]): ListKnightsDto[] {
    const knightsProcessed: ListKnightsDto[] = [];
    for (let i = 0; i < knights.length; i++) {
      const element = knights[i];
      const age = this.ageValidate.validate(element.birthday);

      let exp = 0;
      if (age > 7) {
        exp = Math.floor((age - 7) * Math.pow(22, 1.45));
      }

      knightsProcessed.push({
        armas: element.weapons.length,
        atributo: element.keyAttribute,
        experiencia: exp,
        idade: age,
        nickname: element.nickname,
        ataque: this.attackCalculation(element),
        id: element.id,
      });
    }
    return knightsProcessed;
  }
}
