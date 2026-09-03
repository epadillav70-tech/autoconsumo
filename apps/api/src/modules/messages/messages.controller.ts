import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('conversation/:userId1/:userId2')
  findConversation(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
    @Query('skip') skip = 0,
    @Query('take') take = 50,
  ) {
    return this.messagesService.findConversation(userId1, userId2, +skip, +take);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.messagesService.findByUserId(userId, +skip, +take);
  }

  @Post()
  create(@Body() createMessageDto: Record<string, any>) {
    return this.messagesService.create(createMessageDto);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }
}
