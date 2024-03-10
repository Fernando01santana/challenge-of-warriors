// src/dtos/create-hero.dto.ts

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Attributes, Weapon } from '../models/hero.model';
import { AttributeDto } from './attributes.dto';
import { WeaponDto } from './weapon.dto';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeaponDto)
  weapons: Weapon[];

  @ValidateNested()
  @Type(() => AttributeDto)
  attributes: Attributes;

  @IsString()
  @IsNotEmpty()
  keyAttribute: string;
}

export class ListKnightsDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsInt()
  @Min(0)
  idade: number;

  @IsInt()
  @Min(0)
  armas: number;

  @IsString()
  @IsNotEmpty()
  atributo: string;

  @IsInt()
  @Min(0)
  ataque: number;

  @IsInt()
  @Min(0)
  experiencia: number;

  @IsString()
  id;
}
