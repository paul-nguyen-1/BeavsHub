import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');
  if (process.env.GOOGLE_API_CREDENTIALS) {
    const credentialsPath = './sheets_credentials.json';
    fs.writeFileSync(credentialsPath, process.env.GOOGLE_API_CREDENTIALS);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', process.env.BEAVS_HUB_BACKEND_ENDPOINT],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
