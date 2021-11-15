export interface EventStoreDTO {
  id?: number;
  name: string;
  entityId: number;
  event: object;
}
