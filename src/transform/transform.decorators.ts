import { ReflectMetadata } from '@nestjs/common';
import { Transform } from 'class-transformer';

import { TRANSFORM_META_KEY } from './transform.constants';
import { TransformNumberOptions } from './transform.interfaces';

export { Transform };

/**
 * Allow to apply additional tranformation decorators on specified class
 */
export function withTransform(): ClassDecorator {
  return ReflectMetadata(TRANSFORM_META_KEY, true);
}

/**
 * Decorator for Transform pipe. used to transform number before hand
 */
export function TransformNumber(opt?: TransformNumberOptions): any {
  const { defaultValue, max, min } = opt || ({} as TransformNumberOptions);
  return Transform(v => (isNaN(v) ? defaultValue : max && v > max ? max : min && v < min ? min : +v));
}

/**
 * Decorator for Transform pipe. used to transform boolean before hand
 * @example 'true', 'True', '1', 1 => true
 */
export function TransformBoolean(): any {
  return Transform(v => v === 'true' || v === 'True' || v === 1 || v === '1');
}
