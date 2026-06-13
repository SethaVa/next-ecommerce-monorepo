import { ApiGatewayModule } from './api-gateway.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from 'y/common/filters/http-exception.filter';
import { ResponseInterceptor } from 'y/common/interceptors/response.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(ApiGatewayModule);

    // Global exception filter
    app.useGlobalFilters(new GlobalExceptionFilter());

    // Global response interceptor
    app.useGlobalInterceptors(new ResponseInterceptor());

    // Global JWT guard
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new JwtAuthGuard(reflector));

    await app.listen(process.env.PORT ?? 3000);
    console.log(`API Gateway running on port ${process.env.PORT ?? 3000}`);
  } catch (error) {
    console.log('Failed to start API Gateway:', error);
    process.exit(1);
  }
}
void bootstrap();
