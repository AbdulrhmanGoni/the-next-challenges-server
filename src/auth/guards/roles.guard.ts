import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles, RolesType } from '../../constants/users-roles';

export const Public = Reflector.createDecorator<boolean>();

@Injectable()
export class OnlyUsersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    return canActivate.bind(this)(context, roles.USER);
  }
}

@Injectable()
export class OnlyAdminsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    return canActivate(context, roles.USER);
  }
}

function canActivate(context: ExecutionContext, role: RolesType): boolean {
  const isPublic = this.reflector.get(Public, context.getHandler());
  if (isPublic) {
    return true;
  }

  const { req } = context.switchToHttp().getNext();
  if (role === req?.user?.role) {
    return true;
  } else {
    throw new UnauthorizedException(
      'You are not authorized to access this route',
    );
  }
}
