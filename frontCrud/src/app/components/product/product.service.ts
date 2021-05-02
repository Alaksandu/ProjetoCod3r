import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snack : MatSnackBar, private clienteHttp: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snack.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product>{
    return this.clienteHttp.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  
  read(): Observable<Product[]> {
    return this.clienteHttp.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.clienteHttp.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.clienteHttp.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.clienteHttp.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um Erro', true)
    return EMPTY
  }


}
