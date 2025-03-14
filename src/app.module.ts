import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { config } from 'src/config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, InterestsModule, ConfigModule.forRoot(), TypeOrmModule.forRoot(config), AuthModule],
})
export class AppModule {}
