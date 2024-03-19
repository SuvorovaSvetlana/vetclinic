import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { UpdateAnimalDto } from 'src/animal/dto/update-animal.dto';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity'
import { OwnerHttpModule } from './owner-http.module';
import { Animal } from 'src/animal/entities/animal.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

 async createOwner(createOwnerDto: CreateOwnerDto): Promise <Owner> {
  const owner = new Owner();
  owner.full_name = createOwnerDto.full_name;
  owner.contacts = createOwnerDto.contacts;
  owner.animals = createOwnerDto.animals;
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise <Owner[]> {
    return await this.ownerRepository.find({
      relations:{
        animals: true
      }
    });
  }

   findOne(id: number): Promise <Owner> {
    return  this.ownerRepository.findOne({
      relations:{
        animals: true
      },
      where: {
        id
      }
    }) ;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise <Owner> {
    const owner = await this.ownerRepository.findOne({
      relations:{
        animals: true
      },
      where: {
        id
      }
    }) 
    const {full_name, contacts, animals} = updateOwnerDto;
    if(full_name){
      owner.full_name = full_name;
    }
    if(contacts){
      owner.contacts = contacts;
    }
    if(animals){
      for (const animal of animals){
        console.log(animal)
      }
    }
    return await this.ownerRepository.save(owner);
  }
   
  async remove(id: number): Promise<void> {
    await this.ownerRepository.delete(id);
  }
}