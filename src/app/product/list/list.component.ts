import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
    this.productService.productGetAllObs.subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit(): void {
    //this.getAll();
    this.productService.getAll();
  }

  getAll() {
    //this.productService.getAll().subscribe(data => {
    //  this.products = data;
    //});
  }

  create() {
    this.productService.setProductForCreate();
  }

  edit(id: number) {
    this.productService.getProductByIdForEdit(id);
  }

  delete(id: number) {
    this.productService.showDeletePopUpById.next(id);
  }
}
