import { UnprocessableEntityException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { DTO_META_KEY } from './dto.constants';
import { DtoOptions } from './dto.interfaces';

export class DtoPipe implements PipeTransform<any> {
  constructor(private readonly reflector: Reflector) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const dtoOptions = this.reflector.get<DtoOptions>(DTO_META_KEY, metatype);
    if (value && dtoOptions) {
      const entity = plainToClass(metatype as any, value);
      const errors = await validate(entity, dtoOptions);
      if (errors.length > 0) {
        throw new UnprocessableEntityException({
          message: 'Validation Failed.',
          errors
        });
      }
      return entity;
    }
    return value;
  }
}
