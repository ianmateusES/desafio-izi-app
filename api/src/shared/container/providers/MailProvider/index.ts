import { configMail } from '@config/mail';
import { container } from 'tsyringe';

import { EtherealMailProvider, SESMailProvider } from './implementations';
import { IMailProvider } from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[configMail.driver],
);
