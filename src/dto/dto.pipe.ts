import { UnprocessableEntityException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

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
          errors: errors.map(x => this.mapError(x, ''))
        });
      }
      return entity;
    }
    return value;
  }

  private mapError(err: ValidationError, name: string) {
    const field = `${name}${name ? '.' : ''}${err.property}`;
    if (err.constraints) {
      return {
        field,
        validation: Object.keys(err.constraints)[0],
        message: err.constraints[Object.keys(err.constraints)[0]]
      };
    } else return this.mapError(err.children[0], field);
  }
}
