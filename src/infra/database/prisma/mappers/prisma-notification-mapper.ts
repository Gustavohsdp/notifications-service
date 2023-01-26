import { Notification as RawNotification } from '@prisma/client';
import { Content } from '../../../../app/entities/content';
import { Notification } from '../../../../app/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    const {
      id,
      category,
      canceledAt,
      content,
      createdAt,
      readAt,
      recipientId,
    } = raw;

    return new Notification(
      {
        category,
        canceledAt,
        content: new Content(content),
        createdAt,
        readAt,
        recipientId,
      },
      id,
    );
  }
}
