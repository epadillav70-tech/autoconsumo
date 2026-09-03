import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateListingDto } from './dtos/create-listing.dto';
import { UpdateListingDto } from './dtos/update-listing.dto';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  @Post()
  create(@Body() createListingDto: CreateListingDto, @Req() req: any) {
    return this.listingsService.create(req.user.id, createListingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto, @Req() req: any) {
    return this.listingsService.update(id, req.user.id, updateListingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.listingsService.delete(id, req.user.id);
  }
}
