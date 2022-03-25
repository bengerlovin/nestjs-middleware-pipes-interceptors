import { Injectable, Scope } from '@nestjs/common';

// scope ensures each new request gets a new instance
@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }
}
