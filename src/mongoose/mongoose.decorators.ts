import { Inject } from '@nestjs/common';
import { Schema } from 'mongoose';

import { getModelToken } from './mongoose.utils';

export const InjectModel = (schema: Schema) => Inject(getModelToken(schema));
