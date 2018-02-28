import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_META_KEY } from './auth.constants';
import { AuthOptions } from './auth.interfaces';

@Guard()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authResolver: AuthResolverFunction,
    private readonly reflector: Reflector = new Reflector()
  ) {}

  async canActivate(req, context: ExecutionContext) {
    req.__AUTH_CHECK__ = this.authResolver;
    const authOptions = this.reflector.get<AuthOptions>(AUTH_META_KEY, context.handler);
    if (authOptions) {
      const [x] = await this.authResolver(req, authOptions);
      return x;
    }
    return true;
  }
}

export type AuthResolverFunction = (req: any, authOptions: AuthOptions, required?: boolean) => Promise<[boolean, any]>;
