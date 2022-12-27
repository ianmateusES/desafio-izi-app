import { ISwagger } from '@shared/infra/http/docs/ISwagger';

const codeSwagger: ISwagger = {
  tags: [
    {
      name: 'Verification code',
      description: 'Verification code routes',
    },
  ],

  paths: {
    '/verification-code': {
      post: {
        tags: ['Verification code'],
        summary: 'Verification code submission',
        description: 'Verification code sent to requested email',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          202: {
            description: 'Confirmed email submission',
          },
          400: {
            description: 'Email already used!',
          },
        },
      },
    },
    '/verification-code/validation': {
      post: {
        tags: ['Verification code'],
        summary: 'Email validation',
        description: 'Email validation with verification code',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: {
                    type: 'string',
                  },
                  code: {
                    type: 'string',
                  },
                },
                example: {
                  email: 'user@domain.com',
                  code: '112233',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Validated email',
          },
          400: {
            description: "'Expired verification code!' or 'Invalid code!'",
          },
          404: {
            description: 'Email without verification code!',
          },
        },
      },
    },
  },

  components: {
    schemas: {},
  },
};

export { codeSwagger };
