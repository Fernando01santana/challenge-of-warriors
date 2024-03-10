import { BadRequestException } from '@nestjs/common';
import { DateValidationPipe } from './dateValidate.pipe';

describe('DateValidationPipe', () => {
  let pipe: DateValidationPipe;

  beforeEach(() => {
    pipe = new DateValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should transform a valid date', async () => {
      const value = { birthday: '01/01/2022' };

      const result = await pipe.transform(value);

      expect(result).toEqual(value);
    });

    it('should throw BadRequestException for invalid date format', async () => {
      const value = { birthday: 'invalidFormat' };

      try {
        await pipe.transform(value);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Formato de data invalido.');
      }
    });
  });
});
