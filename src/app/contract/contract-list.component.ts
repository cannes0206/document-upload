import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  public contract$: Observable<Contract[]>;
  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.contractService.getContracts();
    this.contract$ = this.contractService.subscribeContractsList();
  }

  deleteContract(contractId): void {
    this.contractService.deleteContract(contractId);
  }

  updateContract(contract: Contract): void {
    this.contractService.updateContract(contract);
  }

}
