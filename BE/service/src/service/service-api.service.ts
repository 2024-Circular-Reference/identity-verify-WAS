import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceAPIService {
  async serveNearCredit(): Promise<any> {
    const response = await this.getCreditToNear();
    return response;
  }

  async getCreditToNear(): Promise<any> {
    // TODO: Some block chain code snippet
    return 'some credit';
  }
}
