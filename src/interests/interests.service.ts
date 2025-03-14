import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InterestsService {
  constructor(@InjectRepository(Interest) private interestsRepository: Repository<Interest>) {}

  create(createInterestDto: CreateInterestDto) {
    const newInterest = this.interestsRepository.create({ ...createInterestDto });
    const savedInterest = this.interestsRepository.save(newInterest);

    return plainToInstance(Interest, savedInterest);
  }

  findAll() {
    const interests = this.interestsRepository.find();
    return plainToInstance(Interest, interests);
  }

  findOne(id: number) {
    const interest = this.interestsRepository.findOne({ where: { id } });
    return plainToInstance(Interest, interest);
  }

  // async update(id: number, updateInterestDto: UpdateInterestDto) {
  //   const interest = await this.interestsRepository.findOne({ where: { id } });
  //   if (interest) {
  //     const updatedInterest = this.interestsRepository.merge(interest, updateInterestDto);

  //   }
  // }

  async remove(id: number) {
    await this.interestsRepository.delete(id);
  }
}
