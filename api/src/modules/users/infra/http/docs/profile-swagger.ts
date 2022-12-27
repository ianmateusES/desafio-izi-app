import { ISwagger } from '@shared/infra/http/docs/ISwagger';

const profileSwagger: ISwagger = {
  tags: [
    {
      name: 'Profile',
      description: 'Profile routes',
    },
  ],

  paths: {
    '/profile/me': {
      get: {
        tags: ['Profile'],
        summary: 'Show profile',
        description: 'Show logged in user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Show profile successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User-resp-profile',
                },
              },
            },
          },
          401: {
            description: "'Invalid token!' or 'Token is missing!'",
          },
          404: {
            description: 'User not found!',
          },
        },
      },
      delete: {
        tags: ['Profile'],
        summary: 'Delete profile',
        description: 'Delete logged in user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Delete profile successfully',
          },
          401: {
            description: "'Invalid token!' or 'Token is missing!'",
          },
          404: {
            description: 'User not found!',
          },
        },
      },
      patch: {
        tags: ['Profile'],
        summary: 'Update profile',
        description: 'Update logged in user profile',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User-resp-profile',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update profile successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User-resp',
                },
              },
            },
          },
          400: {
            description:
              "'Email already used!' or 'You meed to inform the old password to set a new password!' or 'Old password does not match!' or 'You need to inform the place_id, city, state, country and language to set a new address!'",
          },
          401: {
            description: "'Invalid token!' or 'Token is missing!'",
          },
          404: {
            description: 'User not found!',
          },
        },
      },
    },
    '/profile/avatar': {
      patch: {
        tags: ['Profile'],
        summary: 'Avatar update',
        description: 'User avatar update logged in',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  avatar: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Updated user avatar',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User-resp-profile',
                },
              },
            },
          },
          401: {
            description: "'Invalid token!' or 'Token is missing!'",
          },
          404: {
            description: 'User not found!',
          },
        },
      },
    },
  },

  components: {
    schemas: {
      'User-update': {
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
          username: {
            type: 'string',
          },
          birthday: {
            type: 'string',
          },
          genre: {
            type: 'string',
          },
          appear: {
            type: 'string',
          },
          about_me: {
            type: 'string',
          },
          interests: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          languages: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          main_address: {
            $ref: '#/components/schemas/Address-body',
          },
          secondary_address: {
            $ref: '#/components/schemas/Address-body',
          },
        },
      },
      'OneSignal-body': {
        type: 'object',
        properties: {
          android_id: {
            type: 'string',
          },
          ios_id: {
            type: 'string',
          },
        },
      },
      'OneSignal-resp': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'ab1dfaa6-9f72-4ab8-b40d-2af70b8c2b10',
          },
          user_id: {
            type: 'string',
            example: '10110df1-8f38-4c46-bcd3-52b3361ecd24',
          },
          android_id: {
            type: 'string',
            example: '64516a1d65a1sf86sf16ds55fd5s4f',
          },
          ios_id: {
            type: 'string',
            example: '54as1d65a1sfd6ds1gsd51f651sakjhd6',
          },
        },
      },
    },
  },
};

export { profileSwagger };
