interface ISwagger {
  openapi?: string;

  info?: object;

  servers?: object[];

  tags: {
    name: string;
    description: string;
  }[];

  paths: object;

  components: {
    securitySchemes?: object;
    schemas: object;
  };
}

export { ISwagger };
