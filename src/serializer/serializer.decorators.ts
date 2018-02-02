import { SERIALIZE_META_KEY, SERIALIZE_PROP_META_KEY } from './serializer.constants';

export function Serialize(): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(SERIALIZE_META_KEY, true, target);
  };
}

export function SerializeProp(options?: SerializePropOptions): PropertyDecorator {
  return (target: any, key: string) => {
    const sps = Reflect.getMetadata(SERIALIZE_PROP_META_KEY, target) || {};
    const newSps = { ...sps, [key]: options ? { as: options.as } : null };
    Reflect.defineMetadata(SERIALIZE_PROP_META_KEY, newSps, target);
  };
}

export function SerializeType(fn: () => Function) {
  return (target: any, key: string) => {
    const sps = Reflect.getMetadata(SERIALIZE_PROP_META_KEY, target) || {};
    const newSps = { ...sps, [key]: fn ? { type: fn } : null };
    Reflect.defineMetadata(SERIALIZE_PROP_META_KEY, newSps, target);
  };
}

export interface SerializePropOptions {
  as?: 'string' | 'number' | 'boolean' | 'moment' | Function;
}
