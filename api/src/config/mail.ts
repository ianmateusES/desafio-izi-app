interface IMailConfig {
  driver: 'ethereal' | 'ses';

  config: {
    aws: {
      region: string;
    };
  };

  defaults: {
    from: {
      email: string;
      password?: string;
      name: string;
    };
  };
}

const configMail = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  config: {
    aws: {
      region: process.env.AWS_REGION_MAIL,
    },
  },

  defaults: {
    from: {
      email: process.env.GMAIL_EMAIL || 'equipe@gmail.com.br',
      password: process.env.GMAIL_PASSWORD || 'default',
      name: 'Email test',
    },
  },
} as IMailConfig;

export { configMail };
