import { ApiProperty } from '@nestjs/swagger';

export class UserVCDto {
  @ApiProperty({ description: 'uuid' })
  readonly uuid: string;

  @ApiProperty({ description: 'User VC' })
  readonly vc: string;
}
