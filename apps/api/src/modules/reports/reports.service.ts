import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    return this.prisma.report.findMany({
      skip,
      take,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reportedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.report.findUnique({
      where: { id },
      include: {
        creator: true,
        reportedUser: true,
      },
    });
  }

  async create(data: Record<string, any>) {
    return this.prisma.report.create({
      data,
      include: {
        creator: true,
        reportedUser: true,
      },
    });
  }

  async update(id: string, data: Record<string, any>) {
    return this.prisma.report.update({
      where: { id },
      data,
      include: {
        creator: true,
        reportedUser: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.report.delete({
      where: { id },
    });
  }
}
