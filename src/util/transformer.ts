import { Transform } from 'class-transformer';
import { isNullOrUndefined } from 'util';

export function ToNumber(options?: ToNumberOptions): Function {
  return Transform((value: any) => {
    const v = +value;
    const { default: dv, max, min }: ToNumberOptions = {
      default: 0,
      max: 20,
      min: 0,
      ...options
    };
    if (isNaN(v)) {
      return dv;
    } else if (!isNullOrUndefined(max) && max < v) {
      return max;
    } else if (!isNullOrUndefined(min) && min > v) {
      return min;
    } else {
      return v;
    }
  });
}

export function ToBoolean(): Function {
  return Transform((value: any) => value === 'true' || value === true || value === 1 || value === '1');
}

export interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}
