import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(private readonly authService: AuthService) {}

  async findAllNomina() {
    const user = await this.authService.userRepository.find();
    user.forEach((users) => {
      const otherService = users.nomina * 0.0875;
      users.total = users.nomina - otherService;
      console.log(users.sales);
    });
    return user;
  }
}
