import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'holder_vc' })
export class HolderVCEntity {
  @PrimaryColumn()
  did!: string;

  @Column()
  vc!: string;
}
