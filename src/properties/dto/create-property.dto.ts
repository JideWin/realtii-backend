export class CreatePropertyDto {
  title!: string;
  description!: string;
  tenant_id!: string; // Links it to Ekiti, Lagos, etc.
  boundary!: any; // This will hold the GeoJSON Polygon data
}