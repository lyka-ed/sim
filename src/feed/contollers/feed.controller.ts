import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { UpdateResult } from 'typeorm';
import { CreateFeedDto } from 'src/dto/create-feed.dto';
import { UpdateFeedDto } from 'src/dto/update-feed.dto';
// import { validate } from 'class-validator';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  create(
    @Body(ValidationPipe) createFeedDto: CreateFeedDto,
  ): Observable<FeedPost> {
    return this.feedService.createPost(createFeedDto);
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPost();
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateFeedDto: UpdateFeedDto,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, updateFeedDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.feedService.deletePost(id);
    return;
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<FeedPost | undefined> {
    return this.feedService.findByIdPost(id);
  }
}
