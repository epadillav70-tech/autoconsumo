import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.transactionsService.findAll(+skip, +take);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(
    @Param('userId') userId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.transactionsService.findByUserId(userId, +skip, +take);
  }

  @Post()
  create(@Body() createTransactionDto: Record<string, any>) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: Record<string, any>) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
