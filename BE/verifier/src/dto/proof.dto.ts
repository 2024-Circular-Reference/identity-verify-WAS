import { ApiProperty } from '@nestjs/swagger';

export class ProofDto {
  @ApiProperty({ description: 'Holder pub key' })
  readonly holderPubKey: string;

  @ApiProperty({ description: 'Proof' })
  readonly proof: string;
}
