import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map, tap } from 'rxjs';
import { GetAllProducts } from '../../../../models/interfaces/products/response/get-all-products';
import { ProductDataTransferService } from '../../../../services/products/product-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit {
  public productList$ = this.productService.products$.pipe(
    tap({
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500
        })
      }
    })
  );

  constructor(
    private productService: ProductDataTransferService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }
}
