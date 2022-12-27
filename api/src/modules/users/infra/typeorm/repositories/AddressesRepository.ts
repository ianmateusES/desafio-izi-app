import { Repository } from 'typeorm';

import { dataSourcePostgres } from '@shared/infra/typeorm';

import { ICreateAddressDTO } from '../../../dtos';
import { IAddressesRepository } from '../../../repositories';
import { Address } from '../entities';

class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = dataSourcePostgres.getRepository(Address);
  }

  public async findById(id: string): Promise<Address> {
    const address = await this.repository.findOneBy({ id });

    return address;
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.repository.create(data);

    await this.repository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const newAddress = await this.repository.save(address);

    return newAddress;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { AddressesRepository };
