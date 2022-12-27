interface ICreateUserDTO {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  avatar: string;
  address_id: string;
}

export { ICreateUserDTO };
