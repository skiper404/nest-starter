import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { CoreModule } from './core/core.module'

async function bootstrap() {
  const app = await NestFactory.create(CoreModule)

  const config = app.get(ConfigService)

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  app.setGlobalPrefix('api')

  app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')))

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
}

void bootstrap()
