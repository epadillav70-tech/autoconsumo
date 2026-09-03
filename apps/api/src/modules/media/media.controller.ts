import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('listing/:listingId')
  findByListingId(@Param('listingId') listingId: string) {
    return this.mediaService.findByListingId(listingId);
  }

  @Post()
  create(@Body() createMediaDto: Record<string, any>) {
    return this.mediaService.create(createMediaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: Record<string, any>) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }

  @Delete('listing/:listingId')
  deleteByListingId(@Param('listingId') listingId: string) {
    return this.mediaService.deleteByListingId(listingId);
  }
}
