import { UnprocessableEntityException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { DTO_META_KEY } from './dto.constants';
import { DtoOptions } from './dto.interfaces';

export class DtoPipe implements PipeTransform<any> {
  constructor(private readonly reflector: Reflector) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    const dtoOptions = this.reflector.get<DtoOptions>(DTO_META_KEY, metatype);
    if (value && dtoOptions) {
      const entity = plainToClass(metatype as any, value);
      const errors = await validate(entity, dtoOptions);
      if (errors.length > 0) {
        throw new UnprocessableEntityException({
          message: 'Validation Failed.',
          errors: errors.map(e => this.mapErrors(e, ''))
        });
      }
      return entity;
    }
    return value;
  }

  private mapErrors(e: ValidationError, name: string) {
    const field = `${name !== '' && name !== e.property ? `${name}.` : ''}${e.property}`;
    return e.constraints
      ? {
          field,
          validation: Object.keys(e.constraints)[0],
          message: e.constraints[Object.keys(e.constraints)[0]].replace(e.property, field)
        }
      : this.mapErrors(e.children[0], field);
  }
}
