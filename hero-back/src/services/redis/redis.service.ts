import { InjectRedis } from '@nestjs-modules/ioredis';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export default class RedisAppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async createKey(data: any, key: string): Promise<any> {
    try {
      this.redis.set(key, data);
    } catch (error) {
      throw new BadRequestException('Erro ao criar chave no redis');
    }
  }

  async deletekey(key: string): Promise<boolean> {
    try {
      await this.redis.del(key);
      return;
    } catch (error) {
      throw new BadRequestException('Erro ao criar chave no redis');
    }
  }

  async getAll(key: string): Promise<string[]> {
    try {
      const customerKeys = await this.redis.keys(key);
      if (!customerKeys.length) {
        return;
      }
      const data = await this.redis.mget(...customerKeys);
      return data;
    } catch (error) {
      throw new BadRequestException('Erro ao criar chave no redis');
    }
  }

  async updateKey(key: string, newData: any): Promise<void> {
    try {
      await this.redis.set(key, newData);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar chave no redis');
    }
  }
}
