import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateFeedDto } from 'src/dto/create-feed.dto';
import { UpdateFeedDto } from 'src/dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(createFeedDto: CreateFeedDto): Observable<CreateFeedDto> {
    return from(this.feedPostRepository.save(createFeedDto));
  }

  findAllPost(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  updatePost(
    id: number,
    updateFeedDto: UpdateFeedDto,
  ): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, updateFeedDto));
  }

  deletePost(id: number): Observable<DeleteResult> {
    const res = from(this.feedPostRepository.delete(id));
    console.log(res);
    return res;
  }

  // findByIdPost(id: number): Observable<FeedPost | undefined> {
  //   const post = this.feedPostRepository.findOne({ where: { id } });
  //   if (!post) throw new NotFoundException('Post not found');
  //   return post;
  // }
  async findByIdPost(id: number): Promise<Observable<FeedPost | undefined>> {
    try {
      const post = await this.feedPostRepository.findOne({ where: { id } });
      return Promise.resolve(of(post)); // Wrap the Observable in a Promise
    } catch (error) {
      return Promise.resolve(of(undefined)); // Catch errors and return Promise of undefined Observable
    }
  }
}
