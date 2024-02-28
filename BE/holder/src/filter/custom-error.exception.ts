// custom-error.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  constructor(
    private readonly msg: string,
    private readonly statusCode: HttpStatus,
  ) {
    super(msg, statusCode);
  }

  getResponse(): string {
    return this.msg;
  }

  getStatus(): HttpStatus {
    return this.statusCode;
  }
}
