import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from 'src/request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private requestService: RequestService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // log some information about request
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || 'no user agent';
    const { ip, method, path: url } = request;

    this.logger.log(
      `Method: ${method}, user-agent: ${userAgent}, ip: ${ip}, handler: ${context.getHandler()}`,
    );

    this.logger.debug('userId', this.requestService.getUserId());

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        let timeOfRequest = Date.now() - now;
        this.logger.log(
          `Request finished with ${statusCode} and took: ${timeOfRequest} ms`,
        );
      }),
    );
  }
}
