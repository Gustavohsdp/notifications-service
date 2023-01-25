import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { SendNotification } from './../../../app/use-cases/send-notification';

@Controller('notification')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const { category, content, recipientId } = createNotificationDto;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
