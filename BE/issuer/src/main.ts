import { NestFactory } from '@nestjs/core';
import { IssuerAppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomExceptionFilter } from './filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(IssuerAppModule);

  app.enableCors({
    origin: ['http://localhost:8081', 'http://holder:8081'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(8082);
}
bootstrap();
