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
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { UpdateResult } from 'typeorm';
import { CreateFeedDto } from 'src/dto/create-feed.dto';
import { UpdateFeedDto } from 'src/dto/update-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

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
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FeedPost>> {
    try {
      const observable = await this.feedService.findByIdPost(id);
      const post = await observable.toPromise();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return observable;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      } else {
        console.error('Error fetching post:', error);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
