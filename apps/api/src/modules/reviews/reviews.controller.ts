import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('listing/:listingId')
  findByListingId(
    @Param('listingId') listingId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.reviewsService.findByListingId(listingId, +skip, +take);
  }

  @Post()
  create(@Body() createReviewDto: Record<string, any>) {
    return this.reviewsService.create(createReviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
