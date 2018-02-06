import { ValidatorOptions } from 'class-validator';

export type DtoOptions = ValidatorOptions & { transform?: boolean };
