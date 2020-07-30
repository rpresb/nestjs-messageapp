import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async createMessage(newMessage: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.nick = newMessage.nick;
    message.message = newMessage.message;

    return await this.messageRepository.save(message);
  }

  async updateMessage(
    id: number,
    updatedMessage: CreateMessageDto,
  ): Promise<Message> {
    const message = await this.messageRepository.findOne(id);
    message.nick = updatedMessage.nick;
    message.message = updatedMessage.message;

    return await this.messageRepository.save(message);
  }

  async deleteMessage(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
