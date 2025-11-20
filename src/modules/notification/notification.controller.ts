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


  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createOne(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createNotificationDto: CreateNotificationDto,
    
  // ): Promise<Notification> {
  //   return this.notificationService.create(createNotificationDto);
  // }

  // @Post('add-user')
  // @HttpCode(HttpStatus.CREATED)
  // createNotificationUser(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createUserNotificationDto: CreateUserNotificationDto,
    
  // ): Promise<NotificationUser> {
  //   return this.notificationService.createUserNotification(createUserNotificationDto);
  // }

  // @Patch()
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Body() updateNotificationDto: any,
  //   @AuthUser() jwtPayload: JwtPayloadType
  // ): Promise<Notification | null> {
  //   return this.notificationService.updateNotification(
  //     jwtPayload.user_id,
  //    updateNotificationDto
  //   );
  // }


  // @Delete(':notification_id')
  // @ApiParam({
  //   name: 'notification_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(
  //   @Param('notification_id') notification_id: Notification['notification_id'],
  //   @AuthUser() jwtPayload: JwtPayloadType

  // ): Promise<void> {
  //   return this.notificationService.delete(notification_id,jwtPayload.user_id,);
  // }



  // @Get(':organization_id')
  // @ApiParam({
  //   name: 'organization_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.OK)
  // async getAllProj(
  //   @Param('organization_id') organization_id: Notification['organization_id'],

  // ): Promise<Notification[]> {
  //   let data = await this.notificationService.getAllProj(organization_id);
  //   return data;
  // }


  // @Get('insight/:organization_id')
  // @ApiParam({
  //   name: 'organization_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.OK)
  // async getInsigit(
  //   @Param('organization_id') organization_id: Notification['organization_id'],

  // ): Promise<Notification[]> {
  //   let data = await this.notificationService.getInsigit(organization_id);
  //   return data;
  // }
}
