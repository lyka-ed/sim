import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { FeedModule } from './feed/feed.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: 'db/sql',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MenuModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
