import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    nome: '',
    descricao: '',
    preco: null
  }

  constructor(private productService: ProductService, 
    private router: Router, 
    private routerActived: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.routerActived.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(){
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Produto Deletado!")
      this.router.navigate(['/products']);
    });
  }

  cancel(): void{
    this.router.navigate(['/products']);
  }

}

