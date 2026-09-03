import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async findConversation(userId1: string, userId2: string, skip = 0, take = 50) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId1,
            recipientId: userId2,
          },
          {
            senderId: userId2,
            recipientId: userId1,
          },
        ],
      },
      skip,
      take,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findByUserId(userId: string, skip = 0, take = 20) {
    return this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
      skip,
      take,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        recipient: {
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
    return this.prisma.message.create({
      data,
      include: {
        sender: true,
        recipient: true,
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.message.update({
      where: { id },
      data: {
        status: 'READ',
        readAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
