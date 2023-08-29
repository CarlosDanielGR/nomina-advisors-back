import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(private readonly authService: AuthService) {}

  async findAllNomina() {
    const user = await this.authService.userRepository.find({
      relations: ['sales'],
    });
    user.forEach((users) => {
      const otherService = users.nomina * 0.0875;
      const nomina = users.nomina - otherService;
      users.total =
        users.sales
          .map((sale) => sale.price)
          .reduce((sum, num) => {
            return +sum + +num;
          }, 0) + nomina;
    });
    return user;
  }
}
