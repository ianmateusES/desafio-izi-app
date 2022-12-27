import { ISwagger } from '@shared/infra/http/docs/ISwagger';

const userSwagger: ISwagger = {
  tags: [
    {
      name: 'Users',
      description: 'User routes',
    },
  ],

  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create a user',
        description: 'Create a new user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User-body',
              },
            },
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/User-body-FormDate',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User-resp',
                },
              },
            },
          },
        },
      },
    },
    '/sessions': {
      post: {
        tags: ['Users'],
        summary: 'Authenticate user',
        description: 'User authentication',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Logged in user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      $ref: '#/components/schemas/User-resp',
                    },
                    token: {
                      type: 'string',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY4NDQ3MDYsImV4cCI6MTY0Njg0NTYwNiwic3ViIjoiZDdkOGZkOTctZGZmZS00NmExLTgxMzQtOTMyYWQ1Yzk4YTI0In0._GkpY8-CAwoRK29aWhTdb4P5kGxWgKLnPoXZGUIrY-M',
                    },
                    refresh_token: {
                      type: 'string',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlhbm1hdGV1c0VTIiwiaWF0IjoxNjQ2ODQ0NzA2LCJleHAiOjE2NDk0MzY3MDYsInN1YiI6ImQ3ZDhmZDk3LWRmZmUtNDZhMS04MTM0LTkzMmFkNWM5OGEyNCJ9.ncvQwET8jectK2UZal-ZjgqIuWNOkpIcvBvo8-w0UFk',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Incorrect username/password combination',
          },
        },
      },
    },
    '/refresh-token': {
      post: {
        tags: ['Users'],
        summary: 'Refresh token',
        description: 'Token update',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refresh_token: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY4NDQ3MDYsImV4cCI6MTY0Njg0NTYwNiwic3ViIjoiZDdkOGZkOTctZGZmZS00NmExLTgxMzQtOTMyYWQ1Yzk4YTI0In0._GkpY8-CAwoRK29aWhTdb4P5kGxWgKLnPoXZGUIrY-M',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'New updated token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                    },
                    refresh_token: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY4NDQ3MDYsImV4cCI6MTY0Njg0NTYwNiwic3ViIjoiZDdkOGZkOTctZGZmZS00NmExLTgxMzQtOTMyYWQ1Yzk4YTI0In0._GkpY8-CAwoRK29aWhTdb4P5kGxWgKLnPoXZGUIrY-M',
                  refresh_token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlhbm1hdGV1c0VTIiwiaWF0IjoxNjQ2ODQ0NzA2LCJleHAiOjE2NDk0MzY3MDYsInN1YiI6ImQ3ZDhmZDk3LWRmZmUtNDZhMS04MTM0LTkzMmFkNWM5OGEyNCJ9.ncvQwET8jectK2UZal-ZjgqIuWNOkpIcvBvo8-w0UFk',
                },
              },
            },
          },
          400: {
            description: 'Refresh Token does not exists!',
          },
          404: {
            description: 'Refresh token non-existent!',
          },
        },
      },
    },
  },

  components: {
    schemas: {
      'Address-body': {
        required: ['postal_code', 'street', 'number', 'city', 'state'],
        type: 'object',
        properties: {
          postal_code: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          number: {
            type: 'numeric',
          },
          city: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
        },
      },
      'User-body': {
        required: [
          'email',
          'password',
          'password_confirmation',
          'name',
          'birthday',
          'address',
        ],
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          password_confirmation: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          birthday: {
            type: 'string',
          },
          address: {
            $ref: '#/components/schemas/Address-body',
          },
        },
      },
      'User-body-FormDate': {
        required: [
          'email',
          'password',
          'password_confirmation',
          'name',
          'username',
          'birthday',
          'appear',
          'interest_ids',
          'language_ids',
          'main_address',
        ],
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          password_confirmation: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          birthday: {
            type: 'string',
          },
          appear: {
            type: 'string',
          },
          about_me: {
            type: 'string',
          },
          interest_ids: {
            type: 'array',
            items: {
              type: 'number',
            },
            example: [100],
          },
          language_ids: {
            type: 'array',
            items: {
              type: 'number',
            },
            example: [1, 2],
          },
          main_address: {
            $ref: '#/components/schemas/Address-body',
          },
          secondary_address: {
            $ref: '#/components/schemas/Address-body',
          },
        },
      },
      'User-resp': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'ab1dfaa6-9f72-4ab8-b40d-2af70b8c2b10',
          },
          email: {
            type: 'string',
            example: 'jonh@domain.com',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          username: {
            type: 'string',
            example: 'jonhdoe',
          },
          birthday: {
            type: 'string',
            example: '1995-10-10T00:00:00.000Z',
          },
          appear: {
            type: 'string',
            example: 'Mulher',
          },
          about_me: {
            type: 'string',
            example: 'Sou desenvolvedor de sistemas',
          },
          interests: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Interest-resp',
            },
          },
          languages: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Language-resp',
            },
          },
          show_age: {
            type: 'boolean',
            example: true,
          },
          age: {
            type: 'integer',
          },
          avatar: {
            type: 'string',
            example: '651651206515-name-photo.jpeg',
          },
          avatar_url: {
            type: 'string',
            example: 'http://url:80/avatar/651651206515-name-photo.jpeg',
          },
          main_address_id: {
            type: 'string',
            example: '10110df1-8f38-4c46-bcd3-52b3361ecd24',
          },
          main_address: {
            $ref: '#/components/schemas/Address',
          },
          secondary_address_id: {
            type: 'string',
            example: '10110df1-8f38-4c46-bcd3-52b3361ecd24',
          },
          secondary_address: {
            $ref: '#/components/schemas/Address',
          },
          numberFriends: {
            type: 'number',
            example: 0,
          },
        },
      },
    },
  },
};

export { userSwagger };
