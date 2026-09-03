import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.bookingsService.findAll(+skip, +take);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Get('provider/:providerId')
  findByProviderId(
    @Param('providerId') providerId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.bookingsService.findByProviderId(providerId, +skip, +take);
  }

  @Get('consumer/:consumerId')
  findByConsumerId(
    @Param('consumerId') consumerId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.bookingsService.findByConsumerId(consumerId, +skip, +take);
  }

  @Post()
  create(@Body() createBookingDto: Record<string, any>) {
    return this.bookingsService.create(createBookingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: Record<string, any>) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
