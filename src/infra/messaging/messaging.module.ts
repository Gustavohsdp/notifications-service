import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
