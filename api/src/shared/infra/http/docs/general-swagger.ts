import { ISwagger } from './ISwagger';

const optionsSwagger: ISwagger[] = [];

const generalSwagger: ISwagger = {
  openapi: '3.0.0',

  info: {
    title: 'Documentation',
    description: 'This is an API',
    version: '1.0.0',
    license: {
      name: 'ISC',
      url: 'https://spdx.org/licenses/ISC.html',
    },
    contact: {
      email: 'estudo.ianmateus@gmail.com',
      name: 'Ian Mateus',
    },
  },

  servers: [
    {
      url: 'http://localhost:80/',
      description: 'homologate url',
    },
    // {
    //   url: 'http://localhost:3333/',
    //   description: 'test url',
    // },
  ],

  tags: [],

  paths: {},

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      access_token: {
        type: 'apiKey',
        name: 'access-token',
        in: 'header',
      },
    },

    schemas: {
      'Validation-error': {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
          },
          error: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          validation: {
            type: 'object',
          },
        },
      },
    },
  },
};

optionsSwagger.forEach(options => {
  generalSwagger.tags = {
    ...generalSwagger.tags,
    ...options.tags,
  };
  generalSwagger.paths = {
    ...generalSwagger.paths,
    ...options.paths,
  };
  generalSwagger.components.schemas = {
    ...generalSwagger.components.schemas,
    ...options.components.schemas,
  };
});

export { generalSwagger };
