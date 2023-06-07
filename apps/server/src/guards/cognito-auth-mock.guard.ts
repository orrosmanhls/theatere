import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '@node-monorepo/types';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersFactory } from '../app/users/tests/users.factory';

@Injectable()
export class CognitoAuthGuardMock implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request | AuthenticatedRequest = context.switchToHttp().getRequest();
    const role = request.cookies.role;
    (request as AuthenticatedRequest).user = UsersFactory.build({ role });
    return true;
  }
}
