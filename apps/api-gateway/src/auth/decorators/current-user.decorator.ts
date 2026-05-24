import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'y/events/payloads';

type RequestWithUser = Request & {
  user: JwtPayload;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
