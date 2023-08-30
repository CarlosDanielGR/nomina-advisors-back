import { Injectable } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { CommissionService } from 'src/commission/commission.service';

const TARGETS = {
  1: 5000000,
  2: 10000000,
  3: 15000000,
};

@Injectable()
export class AdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly commissionService: CommissionService,
  ) {}

  async findAllNomina() {
    const user: (User & {
      profit?: number;
      health?: number;
      occupational?: number;
      boarding?: number;
    })[] = await this.authService.userRepository.find({
      relations: ['sales'],
    });
    const commission = await this.commissionService.findAll();

    user.forEach((users) => {
      users.health = users.nomina * 0.04;
      users.occupational = users.nomina * 0.0074;
      users.boarding = users.nomina * 0.04;
      const otherService = users.nomina * 0.0875;
      const nomina = users.nomina - otherService;
      const sales = users.sales
        .map((sale) => sale.price)
        .reduce((sum, num) => {
          return +sum + +num;
        }, 0);
      const profit = commission.map((comm) => comm.profit);
      users.total = nomina;

      const experience = +users.experience;
      if (!profit.length) return;
      if (sales >= (40 / 100) * TARGETS[experience] + TARGETS[experience]) {
        users.total += (profit[experience - 1] / 100) * TARGETS[experience];
        users.profit = (profit[experience - 1] / 100) * TARGETS[experience];
      } else if (
        sales >=
        (20 / 100) * TARGETS[experience] + TARGETS[experience]
      ) {
        users.total += (profit[experience - 1] / 100) * TARGETS[experience];
        users.profit = (profit[experience - 1] / 100) * TARGETS[experience];
      } else if (sales >= TARGETS[experience]) {
        users.total += (profit[experience - 1] / 100) * TARGETS[experience];
        users.profit = (profit[experience - 1] / 100) * TARGETS[experience];
      }
    });
    return user;
  }
}
