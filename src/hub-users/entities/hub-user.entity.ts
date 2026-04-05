import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('hub_users')
export class HubUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ length: 50 })
  first_name!: string;

  @Column({ length: 50 })
  last_name!: string;

  @Column({ length: 20 })
  role!: string; // e.g., 'ESTATE SURVEYOR' or 'HUB_MANAGER'

  // The crucial link to the State (Tenant)
  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}