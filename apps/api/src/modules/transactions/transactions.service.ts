import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        booking: {
          select: {
            id: true,
            listing: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        booking: true,
      },
    });
  }

  async findByUserId(userId: string, skip = 0, take = 10) {
    return this.prisma.transaction.findMany({
      where: { userId },
      skip,
      take,
      include: {
        booking: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Record<string, any>) {
    return this.prisma.transaction.create({
      data,
      include: {
        user: true,
        booking: true,
      },
    });
  }

  async update(id: string, data: Record<string, any>) {
    return this.prisma.transaction.update({
      where: { id },
      data,
      include: {
        user: true,
        booking: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
