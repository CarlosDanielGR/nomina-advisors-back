import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commission } from './entities/commission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private readonly commissionRepository: Repository<Commission>,
  ) {}

  private handleErrors(error: any): never {
    console.log(error);
    if (error['code'] === '23505')
      throw new BadRequestException(error['detail']);
    throw new InternalServerErrorException('Check server logs');
  }

  async create(createCommissionDto: CreateCommissionDto[]) {
    try {
      const commission = this.commissionRepository.create([
        ...createCommissionDto,
      ]);
      return await this.commissionRepository.save(commission);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.commissionRepository.find();
  }

  async update(updateCommissionDto: UpdateCommissionDto[]) {
    const updatePromise = [];
    updateCommissionDto.forEach(async (commission) => {
      const commissionData = await this.commissionRepository.findOneBy({
        target: commission.target,
        experience: commission.experience,
      });
      updatePromise.push(
        this.commissionRepository.save({ ...commissionData, ...commission }),
      );
    });
    await Promise.all(updatePromise);
    return {
      message: 'Update completed',
    };
  }

  async remove() {
    const commission = await this.commissionRepository.find();
    const removePromise = [];
    commission.forEach((target) => {
      removePromise.push(this.commissionRepository.remove(target));
    });
    await Promise.all(removePromise);
    return {
      message: 'Remove completed',
    };
  }
}
