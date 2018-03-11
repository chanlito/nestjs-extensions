import { Schema } from 'mongoose';

export function getModelToken(schema: Schema) {
  return `${JSON.stringify(schema)}Model`;
}
