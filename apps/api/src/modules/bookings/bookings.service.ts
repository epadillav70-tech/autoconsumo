import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    return this.prisma.booking.findMany({
      skip,
      take,
      include: {
        listing: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        consumer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        listing: true,
        provider: true,
        consumer: true,
        messages: true,
        reviews: true,
        transaction: true,
      },
    });
  }

  async findByProviderId(providerId: string, skip = 0, take = 10) {
    return this.prisma.booking.findMany({
      where: { providerId },
      skip,
      take,
      include: {
        listing: true,
        consumer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByConsumerId(consumerId: string, skip = 0, take = 10) {
    return this.prisma.booking.findMany({
      where: { consumerId },
      skip,
      take,
      include: {
        listing: true,
        provider: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Record<string, any>) {
    return this.prisma.booking.create({
      data,
      include: {
        listing: true,
        provider: true,
        consumer: true,
      },
    });
  }

  async update(id: string, data: Record<string, any>) {
    return this.prisma.booking.update({
      where: { id },
      data,
      include: {
        listing: true,
        provider: true,
        consumer: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
