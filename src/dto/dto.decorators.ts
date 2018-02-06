import { ReflectMetadata } from '@nestjs/common';

import { DTO_META_KEY } from './dto.constants';
import { DtoOptions } from './dto.interfaces';

export function Dto(options?: DtoOptions) {
  const defaults: DtoOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
    ...options
  };
  return ReflectMetadata(DTO_META_KEY, defaults);
}
