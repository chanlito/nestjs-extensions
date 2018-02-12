import { createRouteParamDecorator, ReflectMetadata } from '@nestjs/common';

import { AUTH_META_KEY, AuthTypes } from './auth.constants';
import { AuthOptions } from './auth.interfaces';

export function Auth(options?: AuthOptions): MethodDecorator {
  const defaults: AuthOptions = { type: AuthTypes.App, roles: [], ...options };
  return ReflectMetadata(AUTH_META_KEY, defaults);
}

export const AuthUser: any = createRouteParamDecorator(async (args: { required: boolean }, req) => {
  if (!req.user) {
    const [, u] = await req.__AUTH_CHECK__(req, [], args ? args.required : true);
    return u;
  }
  return req.user;
});
