import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private handleErrors(error: any): never {
    console.log(error);
    if (error['code'] === '23505')
      throw new BadRequestException(error['detail']);
    throw new InternalServerErrorException('Check server logs');
  }

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userData } = createAuthDto;
      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });
      await this.userRepository.save(user);
      return {
        token: 'sdf5545dfd454',
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(userAuthDto: LoginUserDto) {
    const { email, password } = userAuthDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');
    return {
      token: 'sdfsd55454',
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
