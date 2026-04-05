export class CreateHubUserDto {
  email!: string;
  password_hash!: string;
  first_name!: string;
  last_name!: string;
  role!: string;
  tenant_id!: string;
}