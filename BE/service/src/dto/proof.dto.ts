import { ApiProperty } from '@nestjs/swagger';

export class ProofDto {
  @ApiProperty({ description: 'Holder pub key' })
  readonly HolderPubKey: string;

  @ApiProperty({ description: 'Proof' })
  readonly proof: string;

  @ApiProperty({ description: 'Issuer pub key' })
  readonly IssuerPubKey: string;

  @ApiProperty({ description: 'Major code' })
  readonly majorCode: string;

  @ApiProperty({ description: 'Messagee' })
  readonly message: string;

  @ApiProperty({ description: 'Metadata' })
  readonly metadata: { params: {}, vkey: Uint8Array, strategy: Uint8Array };
}
