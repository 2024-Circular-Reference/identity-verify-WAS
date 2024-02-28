import { ApiProperty } from '@nestjs/swagger';

export class UserVCDto {
  @ApiProperty({ description: '학번' })
  readonly stNum: string;

  @ApiProperty({ description: '비밀번호' })
  readonly stPwd: string;

  @ApiProperty({ description: 'Holder pub key' })
  readonly holderPubKey: string;
}
