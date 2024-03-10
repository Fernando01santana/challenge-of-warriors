// src/models/hero.model.ts

export interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface HeroModel {
  id: string;
  name: string;
  nickname: string;
  birthday: string;
  weapons: Weapon[];
  attributes: Attributes;
  keyAttribute: string;
}
