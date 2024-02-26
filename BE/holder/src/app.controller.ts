import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  getHello(): string {
    return this.appService.sayHello();
  }

  @Get('/to-issuer')
  async getHelloFromIssuer(): Promise<string> {
    return 'From Issuer: ' + (await this.appService.getHelloFromIssuer());
  }
}
