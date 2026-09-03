import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async findByListingId(listingId: string, skip = 0, take = 10) {
    return this.prisma.review.findMany({
      where: { listingId },
      skip,
      take,
      include: {
        author: {
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

  async create(data: Record<string, any>) {
    return this.prisma.review.create({
      data,
      include: {
        author: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
