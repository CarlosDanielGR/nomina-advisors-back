import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly authService: AuthService,
  ) {}

  private handleErrors(error: any): never {
    console.log(error);
    if (error['code'] === '23505')
      throw new BadRequestException(error['detail']);
    throw new InternalServerErrorException('Check server logs');
  }

  async create(createSaleDto: CreateSaleDto) {
    try {
      const sale = this.saleRepository.create(createSaleDto);
      return await this.saleRepository.save({
        ...sale,
        user: await this.authService.findUser(createSaleDto.userId),
      });
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
