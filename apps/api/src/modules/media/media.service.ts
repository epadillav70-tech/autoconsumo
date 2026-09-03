import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findByListingId(listingId: string) {
    return this.prisma.media.findMany({
      where: { listingId },
      orderBy: { order: 'asc' },
    });
  }

  async create(data: Record<string, any>) {
    return this.prisma.media.create({
      data,
    });
  }

  async update(id: string, data: Record<string, any>) {
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }

  async deleteByListingId(listingId: string) {
    return this.prisma.media.deleteMany({
      where: { listingId },
    });
  }
}
