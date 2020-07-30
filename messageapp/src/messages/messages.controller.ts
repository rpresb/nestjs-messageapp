import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';
import { Response, response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    try {
      const message = await this.messageService.createMessage(createMessageDto);
      res.status(HttpStatus.CREATED).json(message);
    } catch {
      res.status(HttpStatus.FORBIDDEN).json({
        message: 'Error creating message',
      });
    }
  }

  @Get()
  async getAll(@Res() res) {
    try {
      const messages = await this.messageService.getAll();
      res.status(HttpStatus.OK).json(messages);
    } catch {
      res.status(HttpStatus.FORBIDDEN).json({
        message: 'Error getting messages',
      });
    }
  }

  @Put(':id')
  async update(
    @Body() updateMessageDto: CreateMessageDto,
    @Res() res,
    @Param('id') id,
  ) {
    try {
      const message = await this.messageService.updateMessage(
        id,
        updateMessageDto,
      );
      res.status(HttpStatus.OK).json(message);
    } catch {
      res.status(HttpStatus.FORBIDDEN).json({
        message: 'Error updating message',
      });
    }
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id) {
    try {
      await this.messageService.deleteMessage(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.FORBIDDEN).json({
        message: 'Error deleting message',
      });
    }
  }
}
