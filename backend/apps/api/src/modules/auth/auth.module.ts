import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule as CoreAuthModule } from '@app/auth';

@Module({
  imports: [UsersModule, CoreAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
