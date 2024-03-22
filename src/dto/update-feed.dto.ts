import { CreateFeedDto } from 'src/dto/create-feed.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFeedDto extends PartialType(CreateFeedDto) {}
