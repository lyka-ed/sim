import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './contollers/feed.controller';
import { FeedPostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedModule, FeedPostEntity])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
