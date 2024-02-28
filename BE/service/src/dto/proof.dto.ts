import { ApiProperty } from '@nestjs/swagger';

export class ProofDto {
  @ApiProperty({ description: 'Holder pub key' })
  readonly HolderPubKey: string;

  @ApiProperty({ description: 'Proof' })
  readonly proof: string;
}
