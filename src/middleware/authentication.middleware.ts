import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Auth Middleware');

    // authenticate the request or do some logic to extract user
    // what we'd get back hypothetically
    const userId = '123';

    // set userId for the entirety of the request
    this.requestService.setUserId(userId);
    next();
  }
}
