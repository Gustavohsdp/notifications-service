import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetRecipientNotifications } from '../../../app/use-cases/get-recipient-notification';
import { ReadNotification } from '../../../app/use-cases/read-notification';
import { UnreadNotification } from '../../../app/use-cases/unread-notification';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from './../../../app/use-cases/cancel-notification';
import { CountRecipientNotifications } from './../../../app/use-cases/count-recipient-notification';
import { SendNotification } from './../../../app/use-cases/send-notification';

@Controller('notification')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const { category, content, recipientId } = createNotificationDto;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
}
