import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() userAuthDto: LoginUserDto) {
    return this.authService.login(userAuthDto);
  }

  @Get('profile')
  findUser(@Query() params: { id: string }) {
    const { id } = params;
    return this.authService.findUser(id);
  }

  @Patch('profile')
  updateUser(
    @Query() params: { id: string },
    @Body() updateAuthDto: UpdateUserDto,
  ) {
    const { id } = params;
    return this.authService.updateUser(id, updateAuthDto);
  }

  @Delete('profile')
  removeDataUser(@Query() params: { id: string }) {
    const { id } = params;
    return this.authService.removeDataUser(id);
  }
}
