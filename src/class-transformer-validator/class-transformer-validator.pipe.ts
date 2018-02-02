import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { transformAndValidate } from 'class-transformer-validator';
import fastJson from 'fast-json-stringify';

export class ClassTransformerValidatorPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const entity = await transformAndValidate(metatype, fastJson(value), { validator: { whitelist: true } });
    console.log(entity);
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type) && !!metatype;
  }
}
