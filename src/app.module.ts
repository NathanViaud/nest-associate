import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { config } from 'src/config/typeorm.config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    InterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
