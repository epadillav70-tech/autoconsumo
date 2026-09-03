import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.reportsService.findAll(+skip, +take);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reportsService.findById(id);
  }

  @Post()
  create(@Body() createReportDto: Record<string, any>) {
    return this.reportsService.create(createReportDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: Record<string, any>) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reportsService.delete(id);
  }
}
