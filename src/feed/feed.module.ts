import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FeedModule])]
  providers: [FeedService]
})
export class FeedModule {}
