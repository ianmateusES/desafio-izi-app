import { ICreateAddressDTO } from '../dtos';
import { Address } from '../infra/typeorm/entities';

interface IAddressesRepository {
  findById(id: string): Promise<Address>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
}

export { IAddressesRepository };
