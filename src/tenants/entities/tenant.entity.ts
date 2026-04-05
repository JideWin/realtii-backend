import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // <-- Added !

  @Column({ length: 100 })
  state_name!: string; // <-- Added !

  @Column({ length: 10, unique: true })
  tenant_code!: string; // <-- Added !

  @Column({ default: true })
  is_active!: boolean; // <-- Added !

  @CreateDateColumn()
  created_at!: Date; // <-- Added !
}