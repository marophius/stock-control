import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment/environment';
import { Observable, map } from 'rxjs';
import { GetAllProducts } from '../../models/interfaces/products/response/get-all-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = environment.API_URL;
  private JWT_Token: string = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${this.JWT_Token}`
    })
  }
  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getAllProducts(): Observable<GetAllProducts[]> {
    return this.http.get<GetAllProducts[]>(`${this.apiUrl}/products`, this.httpOptions)
      .pipe(
        map((product) => product.filter(data => data.amount > 0))
      );
  }
}
