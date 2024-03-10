export const filterHero = {
  hero: 'hero',
};
export const mockPrismaHero = {
  findMany: [
    {
      attributes: {
        strength: 9,
        dexterity: 6,
        constitution: 5,
        intelligence: 3,
        wisdom: 8,
        charisma: 4,
      },
      weapons: [
        {
          name: 'Sword',
          mod: 5,
          attr: 'strength',
          equipped: true,
        },
        {
          name: 'Bow',
          mod: 3,
          attr: 'dexterity',
          equipped: false,
        },
      ],
      id: '65eae731462d1fe899aa2fc2',
      name: 'Superhero',
      nickname: 'Super',
      birthday: '17/06/2001',
      keyAttribute: 'strength',
      type: 'knight',
    },
  ],
  findFirst: {
    attributes: {
      strength: 9,
      dexterity: 6,
      constitution: 5,
      intelligence: 3,
      wisdom: 8,
      charisma: 4,
    },
    weapons: [
      {
        name: 'Sword',
        mod: 5,
        attr: 'strength',
        equipped: true,
      },
      {
        name: 'Bow',
        mod: 3,
        attr: 'dexterity',
        equipped: false,
      },
    ],
    id: '65eae731462d1fe899aa2fc2',
    name: 'Superhero',
    nickname: 'Super',
    birthday: '17/06/2001',
    keyAttribute: 'strength',
    type: 'knight',
  },
  create: {
    attributes: {
      strength: 9,
      dexterity: 6,
      constitution: 5,
      intelligence: 3,
      wisdom: 8,
      charisma: 4,
    },
    weapons: [
      {
        name: 'Sword',
        mod: 5,
        attr: 'strength',
        equipped: true,
      },
      {
        name: 'Bow',
        mod: 3,
        attr: 'dexterity',
        equipped: false,
      },
    ],
    id: '65eae731462d1fe899aa2fc2',
    name: 'Superhero',
    nickname: 'Super',
    birthday: '17/06/2001',
    keyAttribute: 'strength',
    type: 'knight',
  },
  update: {
    attributes: {
      strength: 9,
      dexterity: 6,
      constitution: 5,
      intelligence: 3,
      wisdom: 8,
      charisma: 4,
    },
    weapons: [
      {
        name: 'Sword',
        mod: 5,
        attr: 'strength',
        equipped: true,
      },
      {
        name: 'Bow',
        mod: 3,
        attr: 'dexterity',
        equipped: false,
      },
    ],
    id: '65eae731462d1fe899aa2fc2',
    name: 'Superhero',
    nickname: 'Super-test',
    birthday: '17/06/2001',
    keyAttribute: 'strength',
    type: 'knight',
  },
};

export const mockHallHeroes = {
  create: {
    id: '65ea61f511934bc70bd0a711',
    name: 'Super-test',
    nickname: 'TheBestHero',
  },
  findMany: [
    {
      id: '65ea61f511934bc70bd0a711',
      name: 'Super-test',
      nickname: 'TheBestHero',
    },
  ],
  delete: undefined,
};
export const mockServiceResponseKnight = {
  list: [
    {
      armas: 2,
      atributo: 'strength',
      experiencia: 1326,
      idade: 22,
      ataque: 24,
      id: '65eae731462d1fe899aa2fc2',
      nickname: 'Super',
    },
  ],
  create: {
    attributes: {
      strength: 9,
      dexterity: 6,
      constitution: 5,
      intelligence: 3,
      wisdom: 8,
      charisma: 4,
    },
    weapons: [
      {
        name: 'Sword',
        mod: 5,
        attr: 'strength',
        equipped: true,
      },
      {
        name: 'Bow',
        mod: 3,
        attr: 'dexterity',
        equipped: false,
      },
    ],
    id: '65eae731462d1fe899aa2fc2',
    name: 'Superhero',
    nickname: 'Super',
    birthday: '17/06/2001',
    keyAttribute: 'strength',
    type: 'knight',
  },
};
export const mockServiceRequestKnight = {
  create: {
    attributes: {
      strength: 8,
      dexterity: 4,
      constitution: 3,
      intelligence: 1,
      wisdom: 6,
      charisma: 2,
    },
    weapons: [
      {
        name: 'Sword',
        mod: 5,
        attr: 'strength',
        equipped: true,
      },
      {
        name: 'Bow',
        mod: 3,
        attr: 'dexterity',
        equipped: false,
      },
    ],
    name: 'Superhero',
    nickname: 'Super',
    birthday: '17/06/2001',
    keyAttribute: 'strength',
    type: 'knight',
  },
  findOne: {
    id: '65eae731462d1fe899aa2fc2',
  },
  update: {
    id: '65eae731462d1fe899aa2fc2',
    nickname: 'Super-test',
  },
};

export const prismaMock = {
  knights: {
    findMany: jest.fn().mockResolvedValue(mockPrismaHero.findMany),
    findFirst: jest.fn().mockResolvedValue(mockPrismaHero.findFirst),
    create: jest.fn().mockResolvedValue(mockPrismaHero.create),
    update: jest.fn().mockResolvedValue(mockPrismaHero.update),
    delete: jest.fn().mockResolvedValue(mockHallHeroes.create),
  },
  hallheroes: {
    create: jest.fn().mockResolvedValue(mockHallHeroes.create),
    findMany: jest.fn().mockResolvedValue(mockHallHeroes.findMany),
  },
};

export const mockRedisService = {
  getAll: [
    '{"attributes": {"strength": 9,"dexterity": 6,"constitution": 5,"intelligence": 3,"wisdom": 8,"charisma": 4},"weapons": [{"name": "Espada","mod": 5,"attr": "dexterity","equipped": false},{"name": "Espada","mod": 5,"attr": "dexterity","equipped": true}],"id": "65eae731462d1fe899aa2fc2","nome": "Superhero","nickname": "super","birthday": "17/06/2001","keyAttribute": "strength","type": "knight"}',
  ],
  createKey: undefined,
  deletekey: true,
  updateKey: undefined,
};
export const redisServiceMock = {
  getAll: jest.fn().mockResolvedValue(mockRedisService.getAll),
  createKey: jest.fn().mockResolvedValue(mockRedisService.createKey),
  deletekey: jest.fn().mockResolvedValue(mockRedisService.deletekey),
  updateKey: jest.fn().mockResolvedValue(mockRedisService.updateKey),
};
