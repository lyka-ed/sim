import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  create(@Body() feedPost: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(feedPost);
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPost();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.feedService.deletePost(id);
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<FeedPost | undefined> {
    return this.feedService.findByIdPost(id);
  }
}
