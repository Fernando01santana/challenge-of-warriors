import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { hallheroes, knights } from '@prisma/client';
import { CreateHeroDto, ListKnightsDto } from '../dtos/hero.dto';
import { DateValidationPipe } from '../pipes/dateValidate.pipe';
import { HeroService } from '../services/hero.service';

@Controller('knights')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @ApiTags('Knights')
  @Get('/')
  list(): Promise<ListKnightsDto[]> {
    return this.heroService.list();
  }

  @Get('/heroes')
  async findHeroes(@Query('filter') filter: string): Promise<hallheroes[]> {
    const heroes = await this.heroService.findHeros(filter);
    return heroes;
  }

  @Post('/')
  @UsePipes(new DateValidationPipe())
  async create(@Body() data: CreateHeroDto): Promise<knights> {
    return this.heroService.create(data);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<knights> {
    return await this.heroService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.heroService.remove(id);
    return;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body('nickname') nickname: string,
  ): Promise<knights> {
    return await this.heroService.updateNickname(id, nickname);
  }
}
