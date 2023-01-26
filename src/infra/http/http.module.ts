import { Module } from '@nestjs/common/decorators';
import { CancelNotification } from '../../app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '../../app/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '../../app/use-cases/get-recipient-notification';
import { ReadNotification } from '../../app/use-cases/read-notification';
import { SendNotification } from '../../app/use-cases/send-notification';
import { UnreadNotification } from '../../app/use-cases/unread-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
