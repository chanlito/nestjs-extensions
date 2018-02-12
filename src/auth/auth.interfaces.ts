import { AuthTypes } from './auth.constants';

export interface AuthOptions {
  type?: AuthTypes;
  roles?: string[];
  resource?: string;
  operation?: string;
}
