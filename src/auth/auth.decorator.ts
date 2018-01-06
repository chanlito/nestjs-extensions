import { createRouteParamDecorator, ReflectMetadata } from '@nestjs/common';

import { AUTH_META_KEY } from './auth.constants';

export function Auth(...roles: string[]): MethodDecorator {
  return ReflectMetadata(AUTH_META_KEY, roles);
}

export const AuthUser: any = createRouteParamDecorator(async (args: { required: boolean }, req) => {
  if (!req.user) {
    const [, u] = await req.__AUTH_CHECK__(req, [], args ? args.required : true);
    return u;
  }
  return req.user;
});
