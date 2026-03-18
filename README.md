# Nest Starter

Базовая структура проекта на NestJS с Postgres, Prisma и GraphQL.
NestJS starter with DB, Docker, Prisma, GraphQL, and Prettier. Includes base structure, validation, CORS, and cookie handling.

## Структура проекта

- `main.ts` → Точка входа приложения
- `/core` — Конфиги и сгенерированные файлы (GraphQL, Prisma)
- `prisma/` — схема Prisma
- `graphql/` — схема GraphQL
- `core.module.ts` — главный модуль приложения
- `src/modules/auth/account` — тестовая сущность account
- `shared/` — типы для GraphQL, константы, декораторы, пайпы, middleware, guards, утилиты
- `docker-compose.yml` — контейнеры (Postgres)

## Установка и запуск

1. Клонируем проект:

```bash
git clone <репозиторий>
cd nest-starter
```

2. Создаём .env в корне проекта:

```bash
NODE_ENV = 'development'

APPLICATION_PORT = 4000
APPLICATION_URL = 'http://localhost:4000'
ALLOWED_ORIGIN = 'http://localhost:3000'

GRAPHQL_PREFIX = '/graphql'
COOKIE_SECRET = 'secret'

POSTGRES_USER = 'root'
POSTGRES_PASSWORD = '1234'
POSTGRES_DB = 'nest_starter'
DATABASE_URL = 'postgres://root:1234@localhost:5432/nest_starter'
```

3. Поднимаем контейнеры:

```bash
docker-compose up -d
```

4. Устанавливаем зависимости

```bash
npm i
```

5. Генерируем Prisma Clent (7)

```bash
npx prisma generate
```

6. Пушим схему в БД или мигрируем на новую

```bash
npx prisma db push / npx prisma migrate dev
```

7. Запуск приложения

```bash
npm run start
```

8. Проверка работы

GraphQL playground: http://localhost:4000/graphql
REST API / Swagger (если добавлено): http://localhost:4000/api

9. Установленные пакеты

- NestJS — ядро приложения
- @nestjs/config — работа с .env
- Prisma 7 + adapter-pg — ORM для Postgres
- GraphQL + Apollo — API слой
- class-validator / class-transformer — DTO и валидация
- cookie-parser — работа с куками
- Docker — для базы Postgres

=======================================================================================

## Настройка окружения

1. Настройка форматирования

- npm i @trivago/prettier-plugin-sort-imports -D - для сортировки импортов
  Базово описал .prettier
  в ts.config добавид alias path и jsx

2. docker-compose.yml
   описываю подключение postgres контейнера, volumes, networks

3. .env
   Добавляю postgres values (DB_URL)

4. Структура проекта core.module.ts - главный модуль и три папки:
   /core - для конфигов и generated файлов (graphql, prisma)
   /modules - логика приложения,
   /shared - все остальное (типы, константы, декораторы, пайпы, миддвары, гварды, утилиты)
   main.ts - точка входа

5. Добавляю Nestjs Config

- npm i @nestjs/config - что бы обращаться к .env
  Импортирую ConfigModule в core.module и описываю его тут же ставлю global

6. Добавляю Prisma (nestjs prisma docs)

- npm i prisma
- npm install @prisma/client
- npm i @prisma/adapter-pg
  Prisma service - описываю через адаптер бд (у меня postgres)
  Описываю prisma.config, prisma.schema (moduleFormat = "cjs")! и model
  Описываю сущность prisma в core/prisma

7. Добавляю Graphql (nestjs graphql docs)

- npm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/express5 graphql
  Импортирую GraphqlModule в core.module и описываю его тут же
  Создаю фабрику для него в graphql.config.ts и добавляю в GraphqlModule

8. main.ts

- npm i cookie-parser - парсить куки
- npm i class-validator class-transformer - для работы с DTO

  Описываю cors (app.enableCors({})) - для безопасности и прием запросов
  Добавляю глобальный префикс app.setGlobalPrefix('api')
  Добавляю парсер (app.use(cookieParser(secret))) - для безопасности
  Добавляю глобальный pipe (app.useGlobalPipes()) - new ValidationPipe() - для работы с входными данными из DTO - преобразовывает их в экземпляры классов и приводит типы

9. Базовая настройка окружения, nest-config, postgres, prisma, graphql, cors, cookie сделал
   Тепер добавляю уже бизнес логику и работаю с ней а так базовая универсальная структура на мой взгляд готова
