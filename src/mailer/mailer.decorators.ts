import { Inject } from '@nestjs/common';

import { MailerToken } from './mailer.constants';

export const InjectMailer = () => Inject(MailerToken);
