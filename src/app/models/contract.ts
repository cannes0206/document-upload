import { DocumentFile } from './document-file';

export interface Contract {
  contractId: string;
  contractName: string;
  files?: DocumentFile[];
  effectiveDate?: Date;
  expirationDate?: Date;
}

export interface ContractUpdateRequest {
  contractId: string;
  contractName: string;
  files?: DocumentFile[];
  effectiveDate?: Date;
  expirationDate?: Date;
}
