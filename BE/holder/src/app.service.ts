import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  sayHello(): string {
    return 'Hello? This is Holder Server.';
  }

  async getHelloFromIssuer(): Promise<string> {
    const url = 'http://localhost:8082/hello';
    return this.httpService
      .get(url)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
