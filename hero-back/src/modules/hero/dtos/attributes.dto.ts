import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttributeDto {
  @IsNumber()
  @IsNotEmpty()
  strength: number;

  @IsNumber()
  dexterity: number;

  @IsNumber()
  constitution: number;

  @IsNumber()
  intelligence: number;

  @IsNumber()
  wisdom: number;

  @IsNumber()
  charisma: number;
}
