import { MatTableDataSource } from '@angular/material/table';
import { Product } from './../product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  dataSource: MatTableDataSource<Product>
  products: Product[]
  displayedColumns = ['id', 'nome', 'descricao', 'preco', 'action']
  
  
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {  
    this.productService.read().subscribe(products => {
      this.products = products;

      
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      
    })
  }

  aplicandoFiltro(filtroValor: string) {
    this.dataSource.filter = filtroValor.trim().toLocaleLowerCase();
  }



}
