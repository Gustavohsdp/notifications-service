import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationDto } from './create-notification.dto';
import { PrismaService } from './prisma.service';

@Controller('notification')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const {} = createNotificationDto;

    // await this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content: 'Você tem uma nova solicitação de amizade',
    //     category: 'social',
    //     recipientId: randomUUID(),
    //   },
    // });
  }
}
