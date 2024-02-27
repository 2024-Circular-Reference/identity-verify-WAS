import { NestFactory } from '@nestjs/core';
import { VerifierAppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(VerifierAppModule);

  app.enableCors({
    origin: ['http://localhost:4000', 'http://service:4000'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(8083);
}
bootstrap();
