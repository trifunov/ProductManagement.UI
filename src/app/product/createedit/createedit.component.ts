import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-createedit',
  templateUrl: './createedit.component.html',
  styleUrls: ['./createedit.component.css']
})
export class CreateeditComponent implements OnInit {

  showCreateEditPopUpById: number;
  successfulSave: boolean;

  warehouseId: number = 0;
  description: string = "";
  price: number = 0;

  constructor(private productService: ProductService) {
    this.productService.showCreateEditPopUpById.subscribe(data => {
      this.showCreateEditPopUpById = data;
    });

    this.productService.productToEditObs.subscribe(data => {
      this.warehouseId = data.warehouseId;
      this.description = data.description;
      this.price = data.price;
    });
  }

  ngOnInit(): void {
    this.successfulSave = false;
  }

  proceed(toSave: boolean) {
    if (toSave === true) {
      var product = new Product();
      product.id = this.showCreateEditPopUpById;
      product.warehouseId = this.warehouseId;
      product.description = this.description;
      product.price = this.price;

      if (this.showCreateEditPopUpById == 0) {
        this.productService.create(product).subscribe(data => {
          //this.successfulSave = true;
          this.productService.getAll();
        });
      }
      else {
        this.productService.edit(product).subscribe(data => {
          //this.successfulSave = true;
          this.productService.getAll();
        });
      }
    }

    this.productService.showCreateEditPopUpById.next(-1);
  }
}
