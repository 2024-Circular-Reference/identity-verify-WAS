import { ApiProperty } from '@nestjs/swagger';

export class UserVCDto {
  @ApiProperty({ description: '학번' })
  readonly studentNumber: string;

  @ApiProperty({ description: '비밀번호' })
  readonly studentPassword: string;

  @ApiProperty({ description: 'Holder pub key' })
  readonly HolderPubKey: string;
}
