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

  findOne(id: number) {
    return `This action returns a #${id} commission`;
  }

  update(id: number, updateCommissionDto: UpdateCommissionDto) {
    return `This action updates a #${id} commission`;
  }

  async remove(targets: number[]) {
    const removePromise = [];
    targets.forEach(async (target) => {
      const commission = await this.commissionRepository.findBy({
        target: target,
      });
      removePromise.push(this.commissionRepository.remove(commission));
    });
    await Promise.all(removePromise);
    return {
      message: 'Remove completed',
    };
  }
}
