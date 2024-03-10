import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeaponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  mod: number;

  @IsString()
  @IsNotEmpty()
  attr: string;

  @IsBoolean()
  equipped: boolean;
}
