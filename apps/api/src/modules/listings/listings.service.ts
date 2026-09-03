import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    return this.prisma.listing.findMany({
      skip,
      take,
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            averageRating: true,
          },
        },
        media: {
          take: 1,
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.listing.findUnique({
      where: { id },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            averageRating: true,
            totalReviews: true,
            responseTime: true,
          },
        },
        media: {
          orderBy: { order: 'asc' },
        },
        reviews: {
          take: 5,
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
        },
      },
    });
  }

  async findByProviderId(providerId: string, skip = 0, take = 10) {
    return this.prisma.listing.findMany({
      where: { providerId },
      skip,
      take,
      include: {
        category: true,
        media: {
          take: 1,
        },
      },
    });
  }

  async create(providerId: string, data: Record<string, any>) {
    const payload = { ...data, providerId };
    return this.prisma.listing.create({
      data: payload,
      include: {
        category: true,
        provider: true,
      },
    });
  }

  async update(id: string, requesterId: string, data: Record<string, any>) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.providerId !== requesterId) {
      throw new ForbiddenException('Not allowed to update this listing');
    }

    return this.prisma.listing.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async delete(id: string, requesterId: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.providerId !== requesterId) {
      throw new ForbiddenException('Not allowed to delete this listing');
    }
    return this.prisma.listing.delete({ where: { id } });
  }

  async search(query: string, skip = 0, take = 10) {
    return this.prisma.listing.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        status: 'ACTIVE',
      },
      skip,
      take,
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            averageRating: true,
          },
        },
        media: {
          take: 1,
        },
      },
    });
  }
}
