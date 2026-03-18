import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class AccountService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return await this.prismaService.user.findMany()
  }
}
