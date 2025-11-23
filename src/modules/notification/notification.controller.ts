import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Get,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,Delete
} from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../user/user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notification',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}



  
}
