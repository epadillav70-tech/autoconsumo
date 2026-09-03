import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.listingsService.findAll(+skip, +take);
  }

  @Get('search')
  search(@Query('q') query: string, @Query('skip') skip = 0, @Query('take') take = 10) {
    return this.listingsService.search(query, +skip, +take);
  }

  @Get('provider/:providerId')
  findByProviderId(
    @Param('providerId') providerId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.listingsService.findByProviderId(providerId, +skip, +take);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Post()
  create(@Body() createListingDto: Record<string, any>) {
    return this.listingsService.create(createListingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: Record<string, any>) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.listingsService.delete(id);
  }
}
