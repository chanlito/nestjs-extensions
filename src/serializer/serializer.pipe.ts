import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

import { SERIALIZE_META_KEY } from './serializer.constants';

export class SerializerPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const serializable = Reflect.getMetadata(SERIALIZE_META_KEY, metatype);
    if (value && serializable) {
      // TODO: implement
    }
    return value;
  }
}
