import { Mailer, MailerConfiguration } from './mailer';
import { MailerToken } from './mailer.constants';

export function createMailerProviders(config: MailerConfiguration) {
  const mailerProvider = {
    provide: MailerToken,
    useFactory: () => new Mailer(config)
  };

  return [mailerProvider];
}
