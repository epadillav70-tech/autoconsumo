import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

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

  // Generate presigned PUT URL for direct upload to S3
  async generatePresignedPutUrl(listingId: string, filename: string, contentType: string) {
    try {
      const bucket = this.config.get<string>('AWS_S3_BUCKET') || '';
      const region = this.config.get<string>('AWS_S3_REGION') || 'us-east-1';
      const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID') || '';
      const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY') || '';

      const s3 = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
      const key = `listings/${listingId}/${uuidv4()}_${filename}`;
      const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
      const url = await getSignedUrl(s3, command, { expiresIn: 900 }); // 15 minutes
      return { uploadUrl: url, key };
    } catch (err) {
      throw new InternalServerErrorException('Failed to generate signed URL');
    }
  }
}
