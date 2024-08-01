import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWTPayload } from '../dto/auth-related.dto';

export const CurrentUser = createParamDecorator(
  (field: keyof JWTPayload, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    return field ? user?.[field] : user;
  },
);
