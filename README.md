# NestJS Extensions

[WIP] A bunch of useful and opinionated filters, modules, pipes... to use with Nest framework. 😻

## Setup

```bash
npm install nestjs-extensions@latest
```

## Usage

* `ApplicationExceptionFilter` is a nestjs filter use to catch all exceptions & errors in the application.

  ```ts
  import { ApplicationExceptionFilter } from 'nestjs-extensions';
  // ... other imports

  const app = await NestFactory.create();

  app.useGlobalFilters(new ApplicationExceptionFilter());
  ```

* `DtoPipe` & `Dto` is used for validation. Internally it uses `class-transformer` & `class-validator`.

  * *Step 1* - use the pipe, it requires a nestjs `Reflector`.

  ```ts
  import { DtoPipe } from 'nestjs-extensions';
  // ... other imports

  const app = await NestFactory.create();

  app.useGlobalPipes(new DtoPipe(new Reflector()));
  ```

  * *Step 2* - create a file called `create-post.dto.ts`

  ```ts
  import { Transform } from 'class-transformer';
  import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
  import { Dto } from 'nestjs-extensions';

  @Dto()
  export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @Transform(x => +x)
    count!: number;
  }
  ```

  * *Step 3* - use it inside your controller

  ```ts
  // ...
  @Controller('posts')
  export class PostsController {
    @Post()
    async createPost(@Body() { title, description, count }: CreatePostDto) {
      return { title, description, count };
    }
  }
  ```
