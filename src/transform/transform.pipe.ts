import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';

import { TRANSFORM_META_KEY } from './transform.constants';

@Pipe()
export class TransformPipe implements PipeTransform<any> {
  constructor(private readonly reflector: Reflector) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const withTranform = this.reflector.get(TRANSFORM_META_KEY, metatype);
    if (value && withTranform) return plainToClass(metatype as any, value);
    return value;
  }
}
