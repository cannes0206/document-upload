import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Contract, ContractUpdateRequest } from '../models/contract';
import { DocumentFile } from '../models/document-file';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contracts: BehaviorSubject<Contract[]> = new BehaviorSubject<[]>([]);

  private mockContracts: Contract[] = [
    {
      contractId: '1001',
      contractName: 'NDA Agreement',
      files: [],
      effectiveDate: new Date(2021, 10, 20),
      expirationDate: new Date(2021, 10, 20)
    },
    {
      contractId: '1002',
      contractName: 'Service Agreement',
      files: [],
      effectiveDate: new Date(2021, 12, 23),
      expirationDate: new Date(2023, 3, 23)
    },
    {
      contractId: '1003',
      contractName: 'Compliance Document',
      files: [],
      effectiveDate: new Date(2020, 12, 20),
      expirationDate: new Date(2021, 12, 20)
    },
    {
      contractId: '1004',
      contractName: 'Courier Letter',
      files: [],
      effectiveDate: null,
      expirationDate: null
    }
  ];

  constructor() { }

  uploadDocuments(contractId: string, documents: DocumentFile[]): Observable<Contract> {
    const contractToUpdate = this.mockContracts.filter(c => c.contractId === contractId)[0];

    return of({ ...contractToUpdate, ...documents});
  }

  getContracts(): void {
    this.contracts.next(this.mockContracts);
  }

  subscribeContractsList(): Observable<Contract[]> {
    return this.contracts.asObservable();
  }

  updateContract(contractToUpdate: ContractUpdateRequest): Observable<string> {
    const toUpdateIndex = this.mockContracts.findIndex(p => p.contractId === contractToUpdate.contractId);
    this.mockContracts[toUpdateIndex] = { ...this.mockContracts[toUpdateIndex], ...contractToUpdate};
    this.getContracts();

    return of('Updated Contract');
  }

  deleteContract(contractId): void {
    const contractIndex = this.mockContracts.findIndex(c => c.contractId === contractId);

    this.mockContracts.splice(contractIndex, 1);

    this.getContracts();
  }
}
