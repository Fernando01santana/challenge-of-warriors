import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  async transform(value: any) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(value.birthday)) {
      throw new BadRequestException('Formato de data invalido.');
    }

    return value;
  }
}
