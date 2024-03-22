import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFeedDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  body: string;

  createdAt: Date;
}
``;
