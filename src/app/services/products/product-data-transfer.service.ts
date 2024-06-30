import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, take, tap } from 'rxjs';
import { GetAllProducts } from '../../models/interfaces/products/response/get-all-products';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataTransferService {

  private productsSubject: BehaviorSubject<GetAllProducts[]> = new BehaviorSubject<GetAllProducts[]>([]);
  public products$: Observable<GetAllProducts[]> = this.productsSubject.asObservable().pipe(
    map((data) => data.filter(prod => prod.amount > 0))
  );

  constructor(
    private productService: ProductsService
  )
  {
    this.initState();
  }

  initState() {
    this.productService.getAllProducts().pipe(
      take(1),
      tap({
        next: (response) => this.setProducts(response)
      })
    ).subscribe();
  }

  setProducts(products: GetAllProducts[]) {
    if(products.length > 0) {
      this.productsSubject.next(products);
    }
  }
}
