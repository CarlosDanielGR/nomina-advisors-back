import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
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

  // private getJwt(payload: JwtPayload) {
  //   return this.jwtService.sign(payload);
  // }

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userData } = createAuthDto;
      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });
      await this.userRepository.save(user);
      return {
        token: user.id,
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
        id: true,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');
    return {
      token: user.id,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateUser(id: string, updateAuthDto: UpdateUserDto) {
    const preUser = await this.findUser(id);
    if (!preUser)
      throw new NotFoundException(`Product with id:${id} not found`);
    console.log(id, updateAuthDto);

    try {
      const user = await this.userRepository.save({
        ...preUser,
        ...updateAuthDto,
      });
      return user;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async removeDataUser(id: string) {
    const user = await this.findUser(id);
    user.phone = '';
    return await this.userRepository.save(user);
  }
}
