import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SignUploadDto } from './dtos/sign-upload.dto';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('listing/:listingId')
  findByListingId(@Param('listingId') listingId: string) {
    return this.mediaService.findByListingId(listingId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER','ADMIN')
  @Post('sign')
  async sign(@Body() dto: SignUploadDto) {
    return this.mediaService.generatePresignedPutUrl(dto.listingId, dto.filename, dto.contentType);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER','ADMIN')
  @Post()
  create(@Body() createMediaDto: Record<string, any>) {
    return this.mediaService.create(createMediaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER','ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: Record<string, any>) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER','ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER','ADMIN')
  @Delete('listing/:listingId')
  deleteByListingId(@Param('listingId') listingId: string) {
    return this.mediaService.deleteByListingId(listingId);
  }
}
