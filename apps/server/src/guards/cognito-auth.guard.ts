import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '@node-monorepo/types';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CognitoIdentityHandler } from '../providers/aws/cognito.provider';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private cognitoIdentity: CognitoIdentityHandler) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request | AuthenticatedRequest = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;
    if (!authorization) return false;
    const accessToken = authorization.replace(/^(Bearer\s)/, '');
    const cognitoUser = await this.cognitoIdentity.getUserByToken(accessToken);
    if (!cognitoUser) return false;
    (request as AuthenticatedRequest).user = cognitoUser;
    return true;
  }
}
