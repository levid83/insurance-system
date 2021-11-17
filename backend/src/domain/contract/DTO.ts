export interface CreateContractDTO {
  id?: number;
  premium: number;
  startDate: Date;
  terminationDate?: Date;
}

export interface TerminateContractDTO {
  contractId: number;
  terminationDate: Date;
}
