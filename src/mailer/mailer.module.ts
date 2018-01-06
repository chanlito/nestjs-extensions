import { DynamicModule, Global, Module } from '@nestjs/common';

import { MailerConfiguration } from './mailer';
import { createMailerProviders } from './mailer.providers';

@Global()
@Module({})
export class MailerModule {
  static forRoot(config: MailerConfiguration): DynamicModule {
    const providers = createMailerProviders(config);
    return {
      module: MailerModule,
      components: providers,
      exports: providers
    };
  }
}
